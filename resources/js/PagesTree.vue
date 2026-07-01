<template>
    <Panel class="statamic-cp-tree" aria-label="Seitenbaum">
        <PanelHeader class="statamic-cp-tree__header">
            <div class="statamic-cp-tree__header-main">
                <Button
                    v-if="!hideRootUrl"
                    class="statamic-cp-tree__root-url"
                    :href="rootUrl"
                    target="_blank"
                    icon="web"
                    :text="rootUrlLabel"
                />
                <Input
                    class="statamic-cp-tree__search"
                    v-model="searchQuery"
                    icon-prepend="magnifying-glass"
                    placeholder="Suchen"
                    clearable
                    :append="searchAppendText"
                />
            </div>
            <div class="statamic-cp-tree__tools">
                <Button v-if="dirty" size="sm" text="Verwerfen" @click="discard" />
                <Button
                    v-if="dirty"
                    size="sm"
                    variant="primary"
                    :loading="saving"
                    :disabled="saving"
                    :text="saving ? 'Speichere...' : 'Änderungen speichern'"
                    @click="save"
                />
                <Button size="sm" icon="tree-collapse" text="Alle schließen" @click="collapseAll" />
                <Button size="sm" icon="tree-expand" text="Alle öffnen" @click="expandAll" />
            </div>
        </PanelHeader>

        <div v-if="filterPath.length" class="statamic-cp-tree__filter-breadcrumb">
            <div class="statamic-cp-tree__filter-path">
                <Icon name="filter" class="statamic-cp-tree__filter-icon" aria-hidden="true" />
                <button
                    type="button"
                    class="statamic-cp-tree__filter-link"
                    @click="clearNodeFilter"
                >
                    Alle Seiten
                </button>
                <Icon name="chevron-right" class="statamic-cp-tree__filter-separator" aria-hidden="true" />
                <template v-for="(crumb, index) in filterPath" :key="crumb.node.id">
                    <button
                        type="button"
                        class="statamic-cp-tree__filter-link"
                        :class="{ 'is-current': index === filterPath.length - 1 }"
                        @click="setFilterNode(crumb.node)"
                    >
                        {{ nodeLabel(crumb.node) }}
                    </button>
                    <Icon
                        v-if="index < filterPath.length - 1"
                        name="chevron-right"
                        class="statamic-cp-tree__filter-separator"
                        aria-hidden="true"
                    />
                </template>
            </div>
            <Button
                class="statamic-cp-tree__filter-clear"
                size="xs"
                variant="ghost"
                icon="x"
                icon-only
                aria-label="Filter zurücksetzen"
                @click="clearNodeFilter"
            />
        </div>

        <div v-if="loading" class="statamic-cp-tree__state">Lade Seitenbaum...</div>
        <div v-else-if="error" class="statamic-cp-tree__state statamic-cp-tree__state--error">{{ error }}</div>
        <div v-else-if="isSearching && !displayPages.length" class="statamic-cp-tree__state">Keine Treffer.</div>
        <ul v-else class="statamic-cp-tree__list" role="tree">
            <TreeNode
                v-for="node in displayPages"
                :key="node.id"
                :node="node"
                :depth="1"
                :max-depth="maxDepth"
                :blueprints="blueprints"
                :create-url="createUrl"
                :open-ids="treeOpenIds"
                :editable="treeEditable && !isSearching"
                :entries-action-url="entriesActionUrl"
                :expects-root="expectsRoot"
                :root-id="rootId"
                :dragging-id="draggingId"
                :cut-node-id="cutNodeId"
                :filter-node-id="filterNodeId"
                :drop-target="dropTarget"
                :allowed-paste-position="allowedPastePosition"
                @toggle="toggle"
                @duplicate-node="duplicateNode"
                @delete-node="deleteNode"
                @copy-node-url="copyNodeUrl"
                @cut-node="cutNode"
                @paste-node="pasteNode"
                @filter-node="toggleFilterNode"
                @drag-start="startDrag"
                @drag-over="dragOver"
                @drag-end="finishDrag"
                @drop-node="dropNode"
                @drop-clear="clearDropTarget"
            />
        </ul>
    </Panel>

    <ConfirmationModal
        :open="Boolean(nodePendingDelete)"
        title="Seite löschen"
        :body-text="deleteConfirmationText"
        button-text="Löschen"
        danger
        @confirm="confirmDeleteNode"
        @cancel="nodePendingDelete = null"
    />
</template>

<script>
import {
    Badge,
    Button,
    ConfirmationModal,
    Context,
    ContextItem,
    ContextLabel,
    ContextMenu,
    ContextSeparator,
    DragHandle,
    Dropdown,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
    DropdownSeparator,
    Icon,
    Input,
    Panel,
    PanelHeader,
    StatusIndicator,
} from '@statamic/cms/ui';
import { router } from '@statamic/cms/inertia';

const STORAGE_KEY_PREFIX = 'statamic.cp_tree.open_ids';
const PAGES_CACHE_KEY_PREFIX = 'statamic.cp_tree.pages';
const FILTER_KEY_PREFIX = 'statamic.cp_tree.filter_id';
const PAGES_CACHE_MAX_AGE_MS = 10 * 60 * 1000;

const DropdownPageActionMenu = {
    name: 'DropdownPageActionMenu',

    components: {
        DropdownItem,
        DropdownLabel,
        DropdownMenu,
        DropdownSeparator,
    },

    props: {
        node: { type: Object, required: true },
        childCreateItems: { type: Array, required: true },
        canDuplicate: { type: Boolean, required: true },
        canDelete: { type: Boolean, required: true },
        canCut: { type: Boolean, required: true },
        isCut: { type: Boolean, required: true },
        isFiltered: { type: Boolean, required: true },
        pasteActions: { type: Array, required: true },
        visitUrl: { type: String, default: null },
    },

    emits: ['duplicate', 'delete', 'copy-url', 'cut', 'paste', 'filter'],

    template: `
        <DropdownMenu>
            <DropdownItem text="Bearbeiten" icon="edit" :href="node.edit_url" />
            <DropdownItem
                v-if="canDuplicate"
                text="Duplizieren"
                icon="duplicate"
                @click="$emit('duplicate')"
            />

            <DropdownSeparator />
            <DropdownItem
                :text="isFiltered ? 'Filteransicht aufheben' : 'Filteransicht'"
                icon="filter"
                @click="$emit('filter')"
            />

            <DropdownSeparator v-if="canCut || isCut || pasteActions.length" />
            <DropdownItem
                v-if="isCut"
                text="Ausschneiden aufheben"
                icon="fullscreen-close"
                @click="$emit('cut')"
            />
            <DropdownItem
                v-else-if="canCut"
                text="Ausschneiden"
                icon="edit-scissors-cut"
                @click="$emit('cut')"
            />
            <DropdownLabel v-if="pasteActions.length" text="Einfügen" />
            <DropdownItem
                v-for="action in pasteActions"
                :key="action.position"
                :text="action.text"
                :icon="action.icon"
                @click="$emit('paste', action.position)"
            />

            <DropdownSeparator v-if="childCreateItems.length" />
            <DropdownLabel v-if="childCreateItems.length > 1" text="Neuer Untereintrag" />
            <DropdownItem
                v-for="item in childCreateItems"
                :key="item.handle"
                :text="item.text"
                :icon="item.icon"
                :href="item.href"
            />

            <DropdownSeparator v-if="visitUrl" />
            <DropdownItem v-if="visitUrl" text="Ansehen" icon="external-link" :href="visitUrl" target="_blank" />
            <DropdownItem v-if="visitUrl" text="URL kopieren" icon="clipboard" @click="$emit('copy-url')" />

            <DropdownSeparator v-if="canDelete" />
            <DropdownItem
                v-if="canDelete"
                text="Löschen"
                icon="trash"
                variant="destructive"
                @click="$emit('delete')"
            />
        </DropdownMenu>
    `,
};

const ContextPageActionMenu = {
    name: 'ContextPageActionMenu',

    components: {
        ContextItem,
        ContextLabel,
        ContextMenu,
        ContextSeparator,
    },

    props: {
        node: { type: Object, required: true },
        childCreateItems: { type: Array, required: true },
        canDuplicate: { type: Boolean, required: true },
        canDelete: { type: Boolean, required: true },
        canCut: { type: Boolean, required: true },
        isCut: { type: Boolean, required: true },
        isFiltered: { type: Boolean, required: true },
        pasteActions: { type: Array, required: true },
        visitUrl: { type: String, default: null },
    },

    emits: ['duplicate', 'delete', 'copy-url', 'cut', 'paste', 'filter'],

    template: `
        <ContextMenu>
            <ContextItem text="Bearbeiten" icon="edit" :href="node.edit_url" />
            <ContextItem
                v-if="canDuplicate"
                text="Duplizieren"
                icon="duplicate"
                @click="$emit('duplicate')"
            />

            <ContextSeparator />
            <ContextItem
                :text="isFiltered ? 'Filteransicht aufheben' : 'Filteransicht'"
                icon="filter"
                @click="$emit('filter')"
            />

            <ContextSeparator v-if="canCut || isCut || pasteActions.length" />
            <ContextItem
                v-if="isCut"
                text="Ausschneiden aufheben"
                icon="fullscreen-close"
                @click="$emit('cut')"
            />
            <ContextItem
                v-else-if="canCut"
                text="Ausschneiden"
                icon="edit-scissors-cut"
                @click="$emit('cut')"
            />
            <ContextLabel v-if="pasteActions.length" text="Einfügen" />
            <ContextItem
                v-for="action in pasteActions"
                :key="action.position"
                :text="action.text"
                :icon="action.icon"
                @click="$emit('paste', action.position)"
            />

            <ContextSeparator v-if="childCreateItems.length" />
            <ContextLabel v-if="childCreateItems.length > 1" text="Neuer Untereintrag" />
            <ContextItem
                v-for="item in childCreateItems"
                :key="item.handle"
                :text="item.text"
                :icon="item.icon"
                :href="item.href"
            />

            <ContextSeparator v-if="visitUrl" />
            <ContextItem v-if="visitUrl" text="Ansehen" icon="external-link" :href="visitUrl" target="_blank" />
            <ContextItem v-if="visitUrl" text="URL kopieren" icon="clipboard" @click="$emit('copy-url')" />

            <ContextSeparator v-if="canDelete" />
            <ContextItem
                v-if="canDelete"
                text="Löschen"
                icon="trash"
                variant="destructive"
                @click="$emit('delete')"
            />
        </ContextMenu>
    `,
};

const TreeNode = {
    name: 'TreeNode',

    components: {
        Button,
        Badge,
        Context,
        ContextPageActionMenu,
        DragHandle,
        DropdownPageActionMenu,
        Dropdown,
        Icon,
        StatusIndicator,
    },

    props: {
        node: { type: Object, required: true },
        depth: { type: Number, required: true },
        maxDepth: { type: Number, required: true },
        blueprints: { type: Array, required: true },
        createUrl: { type: String, required: true },
        openIds: { type: Array, required: true },
        editable: { type: Boolean, required: true },
        entriesActionUrl: { type: String, required: true },
        expectsRoot: { type: Boolean, required: true },
        rootId: { type: String, default: null },
        draggingId: { type: String, default: null },
        cutNodeId: { type: String, default: null },
        filterNodeId: { type: String, default: null },
        dropTarget: { type: Object, default: null },
        allowedPastePosition: { type: Function, required: true },
    },

    emits: ['toggle', 'duplicate-node', 'delete-node', 'copy-node-url', 'cut-node', 'paste-node', 'filter-node', 'drag-start', 'drag-over', 'drag-end', 'drop-node', 'drop-clear'],

    computed: {
        hasChildren() {
            return Array.isArray(this.node.children) && this.node.children.length > 0;
        },

        isOpen() {
            return this.openIds.includes(this.node.id);
        },

        statusLabel() {
            return this.node.status ? this.node.status.charAt(0).toUpperCase() + this.node.status.slice(1) : '';
        },

        primaryBlueprint() {
            return this.blueprints[0] || null;
        },

        canCreateChild() {
            return this.createUrl && this.primaryBlueprint && this.depth < this.maxDepth;
        },

        childCreateItems() {
            if (! this.canCreateChild) {
                return [];
            }

            return this.blueprints.map((blueprint) => ({
                handle: blueprint.handle,
                href: this.createChildUrl(blueprint),
                icon: blueprint.icon || 'add-entry',
                text: this.blueprints.length > 1 ? blueprint.title : 'Neuer Untereintrag',
            }));
        },

        pageTitle() {
            return this.node.title || this.node.entry_title || this.node.url;
        },

        visitUrl() {
            if (! this.node.url) {
                return null;
            }

            return new URL(this.node.url, window.location.origin).href;
        },

        canDrag() {
            return this.editable && (! this.expectsRoot || this.node.id !== this.rootId);
        },

        canCut() {
            return this.canDrag;
        },

        isCut() {
            return this.cutNodeId === this.node.id;
        },

        isFiltered() {
            return this.filterNodeId === this.node.id;
        },

        pasteActions() {
            if (! this.cutNodeId || this.isCut) {
                return [];
            }

            return [
                { position: 'before', text: 'Vorher einfügen', icon: 'arrow-up' },
                { position: 'after', text: 'Nachher einfügen', icon: 'arrow-down' },
                { position: 'inside', text: 'Als Unterpunkt einfügen', icon: 'add-entry' },
            ].filter((action) => this.allowedPastePosition(this.node.id, action.position));
        },

        canDuplicate() {
            return this.editable && Boolean(this.entriesActionUrl) && Boolean(this.node.entry || this.node.id);
        },

        canDelete() {
            return this.editable
                && Boolean(this.node.can_delete)
                && (! this.expectsRoot || this.node.id !== this.rootId);
        },

        isDragging() {
            return this.draggingId === this.node.id;
        },

        isRootNode() {
            return this.expectsRoot && this.node.id === this.rootId;
        },

        dropPosition() {
            return this.dropTarget?.id === this.node.id ? this.dropTarget.position : null;
        },

        visibilityIndicators() {
            return [
                {
                    key: 'hide_navigation',
                    active: Boolean(this.node.hide_navigation),
                    icon: 'navigation',
                    label: 'In Navigation ausgeblendet',
                },
                {
                    key: 'search_hidden',
                    active: Boolean(this.node.search_hidden),
                    icon: 'magnifying-glass',
                    label: 'In Suche ausgeblendet',
                },
            ].filter((indicator) => indicator.active);
        },

        customBadges() {
            return Array.isArray(this.node.badges)
                ? this.node.badges.filter((badge) => badge?.label)
                : [];
        },
    },

    methods: {
        toggle() {
            if (this.hasChildren) {
                this.$emit('toggle', this.node.id);
            }
        },

        editPage(event) {
            const url = this.node.edit_url;

            if (! url) {
                return;
            }

            if (event.metaKey || event.ctrlKey) {
                window.open(url);
                return;
            }

            router.get(url);
        },

        startDrag(event) {
            if (! this.canDrag) {
                event.preventDefault();
                return;
            }

            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', this.node.id);
            this.$emit('drag-start', this.node.id);
        },

        dragOver(event) {
            if (! this.draggingId || this.draggingId === this.node.id) {
                return;
            }

            event.dataTransfer.dropEffect = 'move';

            this.$emit('drag-over', {
                id: this.node.id,
                position: this.resolveDropPosition(event),
            });
        },

        drop(event) {
            this.$emit('drop-node', {
                id: this.node.id,
                fallbackPosition: this.resolveDropPosition(event),
            });
        },

        createChildUrl(blueprint) {
            const separator = this.createUrl.includes('?') ? '&' : '?';

            return `${this.createUrl}${separator}blueprint=${blueprint.handle}&parent=${this.node.id}`;
        },

        resolveDropPosition(event) {
            const rect = event.currentTarget.getBoundingClientRect();
            const offset = (event.clientY - rect.top) / rect.height;

            if (this.isRootNode) {
                return offset > 0.5 ? 'after' : null;
            }

            if (offset < 0.4) {
                return 'before';
            }

            if (offset > 0.6) {
                return 'after';
            }

            return 'inside';
        },
    },

    template: `
        <li
            class="statamic-cp-tree__item"
            :class="{
                'statamic-cp-tree__item--open': isOpen,
                'statamic-cp-tree__item--leaf': !hasChildren,
                'statamic-cp-tree__item--dragging': isDragging,
                'statamic-cp-tree__item--cut': isCut,
                'statamic-cp-tree__item--search-match': node.search_match,
                'statamic-cp-tree__item--search-muted': node.search_muted,
                'statamic-cp-tree__item--drop-before': dropPosition === 'before',
                'statamic-cp-tree__item--drop-after': dropPosition === 'after',
                'statamic-cp-tree__item--drop-inside': dropPosition === 'inside',
            }"
            role="treeitem"
            :aria-expanded="hasChildren ? String(isOpen) : undefined"
            :style="{ '--tree-depth': depth }"
        >
            <button
                v-if="hasChildren"
                class="statamic-cp-tree__toggle"
                :class="{ 'is-open': isOpen }"
                type="button"
                :aria-label="isOpen ? 'Einklappen' : 'Ausklappen'"
                @click.stop="toggle"
            >
                <span class="statamic-cp-tree__toggle-label" aria-hidden="true"></span>
            </button>
            <span v-else class="statamic-cp-tree__spacer" aria-hidden="true"></span>

            <div
                class="statamic-cp-tree__row"
                @dragover.prevent="dragOver"
                @drop.prevent="drop"
                @dragleave="$emit('drop-clear')"
            >
                <Context side="bottom" align="start">
                    <template #trigger>
                        <a :href="node.edit_url" class="statamic-cp-tree__main-action" @click.prevent.stop="editPage">
                            <StatusIndicator :status="node.status || 'draft'" :show-label="false" />

                            <span class="statamic-cp-tree__title">
                                <Icon v-if="depth === 1 && node.slug === 'home'" name="home" class="statamic-cp-tree__home" aria-hidden="true" />
                                {{ pageTitle }}
                            </span>

                            <span v-if="node.collection" class="statamic-cp-tree__collection">
                                <Icon name="navigation" class="statamic-cp-tree__collection-icon" aria-hidden="true" />
                                {{ node.collection.title }}
                            </span>
                        </a>
                    </template>

                    <ContextPageActionMenu
                        :node="node"
                        :child-create-items="childCreateItems"
                        :can-duplicate="canDuplicate"
                        :can-delete="canDelete"
                        :can-cut="canCut"
                        :is-cut="isCut"
                        :is-filtered="isFiltered"
                        :paste-actions="pasteActions"
                        :visit-url="visitUrl"
                        @duplicate="$emit('duplicate-node', node)"
                        @delete="$emit('delete-node', node)"
                        @copy-url="$emit('copy-node-url', node)"
                        @cut="$emit('cut-node', node)"
                        @paste="$emit('paste-node', { targetId: node.id, position: $event })"
                        @filter="$emit('filter-node', node)"
                    />
                </Context>

                <Badge
                    v-for="badge in customBadges"
                    :key="badge.key"
                    class="statamic-cp-tree__badge"
                    size="sm"
                    :text="badge.label"
                    :color="badge.color"
                />

                <span
                    v-if="visibilityIndicators.length"
                    class="statamic-cp-tree__indicators"
                    aria-label="Sichtbarkeit"
                >
                    <span
                        v-for="indicator in visibilityIndicators"
                        :key="indicator.key"
                        class="statamic-cp-tree__indicator"
                        :class="'statamic-cp-tree__indicator--' + indicator.key"
                        :aria-label="indicator.label"
                        v-tooltip="indicator.label"
                    >
                        <Icon :name="indicator.icon" aria-hidden="true" />
                    </span>
                </span>

                <Dropdown side="bottom" align="end">
                    <template #trigger>
                        <Button
                            class="statamic-cp-tree__item-menu"
                            icon="dots"
                            icon-only
                            size="sm"
                            variant="ghost"
                            aria-label="Optionen öffnen"
                        />
                    </template>

                    <DropdownPageActionMenu
                        :node="node"
                        :child-create-items="childCreateItems"
                        :can-duplicate="canDuplicate"
                        :can-delete="canDelete"
                        :can-cut="canCut"
                        :is-cut="isCut"
                        :is-filtered="isFiltered"
                        :paste-actions="pasteActions"
                        :visit-url="visitUrl"
                        @duplicate="$emit('duplicate-node', node)"
                        @delete="$emit('delete-node', node)"
                        @copy-url="$emit('copy-node-url', node)"
                        @cut="$emit('cut-node', node)"
                        @paste="$emit('paste-node', { targetId: node.id, position: $event })"
                        @filter="$emit('filter-node', node)"
                    />
                </Dropdown>

                <DragHandle
                    v-if="canDrag"
                    class="statamic-cp-tree__drag"
                    draggable="true"
                    title="Verschieben"
                    @dragstart.stop="startDrag"
                    @dragend="$emit('drag-end')"
                />
            </div>

            <ul v-if="hasChildren && isOpen" class="statamic-cp-tree__children" role="group">
                <TreeNode
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :depth="depth + 1"
                    :max-depth="maxDepth"
                    :blueprints="blueprints"
                    :create-url="createUrl"
                    :open-ids="openIds"
                    :editable="editable"
                    :entries-action-url="entriesActionUrl"
                    :expects-root="expectsRoot"
                    :root-id="rootId"
                    :dragging-id="draggingId"
                    :cut-node-id="cutNodeId"
                    :filter-node-id="filterNodeId"
                    :drop-target="dropTarget"
                    :allowed-paste-position="allowedPastePosition"
                    @toggle="$emit('toggle', $event)"
                    @duplicate-node="$emit('duplicate-node', $event)"
                    @delete-node="$emit('delete-node', $event)"
                    @copy-node-url="$emit('copy-node-url', $event)"
                    @cut-node="$emit('cut-node', $event)"
                    @paste-node="$emit('paste-node', $event)"
                    @filter-node="$emit('filter-node', $event)"
                    @drag-start="$emit('drag-start', $event)"
                    @drag-over="$emit('drag-over', $event)"
                    @drag-end="$emit('drag-end')"
                    @drop-node="$emit('drop-node', $event)"
                    @drop-clear="$emit('drop-clear')"
                />
            </ul>
        </li>
    `,
};

export default {
    components: {
        Button,
        ConfirmationModal,
        Icon,
        Input,
        Panel,
        PanelHeader,
        TreeNode,
    },

    props: {
        pageProps: { type: Object, required: true },
        addonConfig: { type: Object, default: () => ({}) },
    },

    data() {
        return {
            loading: true,
            saving: false,
            error: null,
            pages: [],
            initialPages: [],
            searchQuery: '',
            filterNodeId: null,
            openIds: [],
            hasStoredOpenIds: false,
            pageAccessRestricted: false,
            pageAccessCacheKey: 'unknown',
            draggingId: null,
            cutNodeId: null,
            dropTarget: null,
            deletedEntries: [],
            nodePendingDelete: null,
            dirty: false,
        };
    },

    computed: {
        site() {
            return this.pageProps.initialSite;
        },

        collectionHandle() {
            return this.pageProps.handle;
        },

        hideRootUrl() {
            return (this.addonConfig.hideRootUrlCollections || []).includes(this.collectionHandle);
        },

        pagesUrl() {
            return this.pageProps.structurePagesUrl;
        },

        submitUrl() {
            return this.pageProps.structureSubmitUrl;
        },

        createUrl() {
            return this.pageProps.createUrls?.[this.site] || '';
        },

        entriesActionUrl() {
            return this.pageProps.entriesActionUrl || '';
        },

        pagesFlagsUrl() {
            if (this.addonConfig.flagsUrl) {
                return this.addonConfig.flagsUrl;
            }

            const cpRoot = String(Statamic.$config.get('cpRoot') || '/cp').replace(/\/$/, '');

            return `${cpRoot}/api/statamic-cp-tree/flags`;
        },

        blueprints() {
            return this.pageProps.blueprints || [];
        },

        maxDepth() {
            return this.pageProps.structureMaxDepth || Infinity;
        },

        expectsRoot() {
            return Boolean(this.pageProps.structureExpectsRoot);
        },

        editable() {
            return Boolean(this.pageProps.structured ?? this.pageProps.canEdit);
        },

        treeEditable() {
            return this.editable && ! this.pageAccessRestricted;
        },

        rootId() {
            return this.pages[0]?.id || null;
        },

        normalizedSearchQuery() {
            return this.normalizeSearchText(this.searchQuery);
        },

        isSearching() {
            return this.normalizedSearchQuery.length > 0;
        },

        filterPath() {
            if (! this.filterNodeId) {
                return [];
            }

            return this.findNodePath(this.pages, this.filterNodeId);
        },

        filterRootPages() {
            if (! this.filterNodeId) {
                return this.pages;
            }

            const filterNode = this.filterPath.at(-1)?.node;

            return filterNode ? [filterNode] : this.pages;
        },

        displayPages() {
            if (! this.isSearching) {
                return this.filterRootPages;
            }

            return this.filterPagesForSearch(this.filterRootPages);
        },

        treeOpenIds() {
            if (this.filterNodeId && ! this.isSearching) {
                return [...new Set([...this.openIds, this.filterNodeId])];
            }

            if (! this.isSearching) {
                return this.openIds;
            }

            const ids = [];
            const collect = (nodes) => nodes.forEach((node) => {
                if (node.children?.length) {
                    ids.push(node.id);
                    collect(node.children);
                }
            });

            collect(this.displayPages);

            return ids;
        },

        searchResultCount() {
            if (! this.isSearching) {
                return 0;
            }

            return this.countSearchMatches(this.displayPages);
        },

        searchAppendText() {
            if (! this.isSearching) {
                return null;
            }

            return String(this.searchResultCount);
        },

        rootUrl() {
            const rootPath = this.pages[0]?.url || '/';

            return new URL(rootPath, window.location.origin).href;
        },

        rootUrlLabel() {
            return this.rootUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
        },

        deleteConfirmationText() {
            if (! this.nodePendingDelete) {
                return '';
            }

            const descendants = this.collectDescendantIds(this.nodePendingDelete);

            return descendants.length
                ? `Diese Seite und ${descendants.length} Untereintrag(e) löschen? Die Änderung wird erst mit dem Seitenbaum gespeichert.`
                : 'Diese Seite löschen? Die Änderung wird erst mit dem Seitenbaum gespeichert.';
        },
    },

    mounted() {
        this.load();
    },

    methods: {
        async load() {
            this.error = null;
            this.loading = true;

            try {
                const latestCachedPages = this.restoreLatestPagesCache();

                if (latestCachedPages) {
                    this.applyLoadedPages(latestCachedPages);
                    this.applyFilterNode();
                    this.applyOpenIds();
                    this.loading = false;
                }

                const [flagsResponse, treeResponse] = await Promise.all([
                    this.$axios
                        .get(`${this.pagesFlagsUrl}?collection=${encodeURIComponent(this.collectionHandle)}&site=${this.site}`)
                        .catch(() => ({ data: { flags: {}, cache_key: 'unknown' } })),
                    this.$axios.get(`${this.pagesUrl}?site=${this.site}`),
                ]);

                this.pageAccessRestricted = Boolean(treeResponse.data.access_restricted || flagsResponse.data.restricted);
                this.pageAccessCacheKey = flagsResponse.data.cache_key || 'unknown';

                const cachedPages = this.restorePagesCache();

                if (cachedPages && ! latestCachedPages) {
                    this.applyLoadedPages(cachedPages);
                    this.applyFilterNode();
                    this.applyOpenIds();
                    this.loading = false;
                }

                const pages = this.pageAccessRestricted
                    ? this.filterPagesByAllowedIds(treeResponse.data.pages || [], flagsResponse.data.allowed_ids || [])
                    : (treeResponse.data.pages || []);

                this.applyLoadedPages(this.mergePageFlags(pages, flagsResponse.data.flags || {}));
                this.persistPagesCache();
                this.applyFilterNode();
                this.applyOpenIds();
            } catch (error) {
                this.error = 'Der Seitenbaum konnte nicht geladen werden.';
            } finally {
                this.loading = false;
            }
        },

        applyLoadedPages(pages) {
            this.pages = pages || [];
            this.initialPages = this.clonePages(this.pages);
            this.deletedEntries = [];
            this.dirty = false;

            if (this.cutNodeId && ! this.findNode(this.pages, this.cutNodeId)) {
                this.cutNodeId = null;
            }

            if (this.filterNodeId && ! this.findNode(this.pages, this.filterNodeId)) {
                this.filterNodeId = null;
                this.persistFilterNode();
            }
        },

        mergePageFlags(nodes, flags) {
            return (nodes || []).map((node) => {
                const entryId = node.entry || node.id;
                const nodeFlags = flags[entryId] || flags[node.id] || {};

                return {
                    ...node,
                    hide_navigation: Boolean(nodeFlags.hide_navigation),
                    search_hidden: Boolean(nodeFlags.search_hidden),
                    badges: Array.isArray(nodeFlags.badges) ? nodeFlags.badges : (node.badges || []),
                    children: this.mergePageFlags(node.children || [], flags),
                };
            });
        },

        filterPagesByAllowedIds(nodes, allowedIds) {
            const allowed = new Set(allowedIds || []);

            return (nodes || []).flatMap((node) => {
                const children = this.filterPagesByAllowedIds(node.children || [], allowedIds);
                const entryId = node.entry || node.id;

                if (allowed.has(entryId)) {
                    return [{
                        ...node,
                        children,
                    }];
                }

                return children;
            });
        },

        applyFilterNode() {
            const storedFilterNodeId = this.restoreFilterNode();

            if (storedFilterNodeId && this.findNode(this.pages, storedFilterNodeId)) {
                this.filterNodeId = storedFilterNodeId;
            }
        },

        applyOpenIds() {
            const storedOpenIds = this.restoreOpenIds();

            if (storedOpenIds !== null) {
                this.openIds = this.filterExistingIds(storedOpenIds, this.pages);
                this.hasStoredOpenIds = true;
            } else {
                this.openIds = this.defaultOpenIds(this.pages);
                this.hasStoredOpenIds = false;
                this.persistOpenIds();
            }
        },

        toggle(id) {
            this.openIds = this.openIds.includes(id)
                ? this.openIds.filter((openId) => openId !== id)
                : [...this.openIds, id];

            this.persistOpenIds();
        },

        expandAll() {
            const ids = [];
            const collect = (nodes) => nodes.forEach((node) => {
                if (node.children?.length) {
                    ids.push(node.id);
                    collect(node.children);
                }
            });

            collect(this.pages);
            this.openIds = ids;
            this.persistOpenIds();
        },

        collapseAll() {
            this.openIds = [];
            this.persistOpenIds();
        },

        startDrag(id) {
            this.draggingId = id;
        },

        dragOver(target) {
            if (! this.draggingId) {
                return;
            }

            const position = this.allowedDropPosition(this.draggingId, target.id, target.position);

            this.dropTarget = position ? { id: target.id, position } : null;

            if (position === 'inside') {
                this.openDropTarget(target.id);
            }
        },

        clearDropTarget() {
            this.dropTarget = null;
        },

        finishDrag() {
            this.draggingId = null;
            this.dropTarget = null;
        },

        cutNode(node) {
            if (! node?.id) {
                return;
            }

            this.cutNodeId = this.cutNodeId === node.id ? null : node.id;
            this.dropTarget = null;
        },

        setFilterNode(node) {
            if (! node?.id) {
                return;
            }

            this.filterNodeId = node.id;
            this.cutNodeId = null;
            this.dropTarget = null;
            this.openIds = [...new Set([...this.openIds, node.id])];
            this.persistOpenIds();
            this.persistFilterNode();
        },

        toggleFilterNode(node) {
            if (this.filterNodeId === node?.id) {
                this.clearNodeFilter();
                return;
            }

            this.setFilterNode(node);
        },

        clearNodeFilter() {
            this.filterNodeId = null;
            this.dropTarget = null;
            this.persistFilterNode();
        },

        pasteNode(target) {
            if (! this.cutNodeId || this.isSearching) {
                return;
            }

            const position = this.allowedDropPosition(this.cutNodeId, target.targetId, target.position);

            if (! position || ! this.moveNode(this.cutNodeId, target.targetId, position)) {
                this.$toast?.error?.(__('Something went wrong'));
                return;
            }

            this.cutNodeId = null;
            this.dropTarget = null;
            this.dirty = true;
        },

        allowedPastePosition(targetId, position) {
            return Boolean(! this.isSearching && this.cutNodeId && this.allowedDropPosition(this.cutNodeId, targetId, position));
        },

        dropNode(target) {
            if (! this.draggingId || this.isSearching) {
                return;
            }

            const dropTarget = this.dropTarget?.id === target.id
                ? this.dropTarget
                : {
                    id: target.id,
                    position: this.allowedDropPosition(this.draggingId, target.id, target.fallbackPosition),
                };

            if (! dropTarget.position || ! this.moveNode(this.draggingId, dropTarget.id, dropTarget.position)) {
                this.finishDrag();
                return;
            }

            this.dirty = true;
            this.finishDrag();
        },

        openDropTarget(id) {
            const target = this.findNode(this.pages, id);

            if (! target?.node.children?.length || this.openIds.includes(id)) {
                return;
            }

            this.openIds = [...this.openIds, id];
            this.persistOpenIds();
        },

        async duplicateNode(node) {
            if (! this.entriesActionUrl || ! (node.entry || node.id)) {
                return;
            }

            if (this.dirty && ! window.confirm('Ungespeicherte Änderungen am Seitenbaum vorher verwerfen?')) {
                return;
            }

            this.saving = true;

            try {
                await this.$axios.post(this.entriesActionUrl, {
                    action: 'duplicate_entry',
                    selections: [node.entry || node.id],
                    context: {
                        collection: this.pageProps.handle,
                        view: 'list',
                    },
                    values: {},
                });

                this.$toast?.success?.('Eintrag dupliziert');
                await this.load();
            } catch (error) {
                this.$toast?.error?.(__('Something went wrong'));
            } finally {
                this.saving = false;
            }
        },

        deleteNode(node) {
            if (! node.can_delete) {
                return;
            }

            this.nodePendingDelete = node;
        },

        confirmDeleteNode() {
            if (! this.nodePendingDelete) {
                return;
            }

            const nextPages = this.clonePages(this.pages);
            const removed = this.removeNode(nextPages, this.nodePendingDelete.id);

            if (! removed) {
                this.nodePendingDelete = null;
                return;
            }

            this.deletedEntries = [...new Set([
                ...this.deletedEntries,
                removed.id,
                ...this.collectDescendantIds(removed),
            ])];

            this.pages = nextPages;
            this.openIds = this.filterExistingIds(this.openIds, this.pages);
            this.persistOpenIds();
            this.nodePendingDelete = null;
            this.dirty = true;
        },

        async copyNodeUrl(node) {
            if (! node.url) {
                return;
            }

            try {
                await navigator.clipboard.writeText(new URL(node.url, window.location.origin).href);
                this.$toast?.success?.('URL kopiert');
            } catch (error) {
                this.$toast?.error?.(__('Something went wrong'));
            }
        },

        allowedDropPosition(draggingId, targetId, position) {
            if (! position || draggingId === targetId) {
                return null;
            }

            const dragging = this.findNode(this.pages, draggingId);
            const target = this.findNode(this.pages, targetId);

            if (! dragging || ! target || this.containsNode(dragging.node, targetId)) {
                return null;
            }

            if (this.expectsRoot && target.node.id === this.rootId && position !== 'after') {
                return null;
            }

            const targetDepth = position === 'inside' ? target.depth + 1 : target.depth;
            const movedDepth = this.subtreeDepth(dragging.node);

            if (targetDepth + movedDepth - 1 > this.maxDepth) {
                return null;
            }

            return position;
        },

        moveNode(draggingId, targetId, position) {
            const nextPages = this.clonePages(this.pages);
            const removed = this.removeNode(nextPages, draggingId);

            if (! removed) {
                return false;
            }

            const target = this.findNode(nextPages, targetId);

            if (! target) {
                return false;
            }

            if (position === 'inside') {
                target.node.children ||= [];
                target.node.children.push(removed);
                this.openIds = [...new Set([...this.openIds, target.node.id])];
            } else {
                target.siblings.splice(target.index + (position === 'after' ? 1 : 0), 0, removed);
            }

            this.pages = nextPages;
            this.persistOpenIds();

            return true;
        },

        async save() {
            if (! this.editable || ! this.submitUrl || ! this.dirty) {
                return;
            }

            this.saving = true;

            const payload = {
                pages: this.cleanPagesForSubmission(this.pages),
                site: this.site,
                expectsRoot: this.expectsRoot,
                deletedEntries: this.deletedEntries,
                deleteLocalizationBehavior: this.pageProps.deleteLocalizationBehavior,
            };

            Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

            try {
                const response = await this.$axios.patch(this.submitUrl, payload);

                if (! response.data.saved) {
                    throw new Error('not_saved');
                }

                this.initialPages = this.clonePages(this.pages);
                this.deletedEntries = [];
                this.cutNodeId = null;
                this.dirty = false;
                this.persistPagesCache();
                this.$toast?.success?.(__('Saved'));
            } catch (error) {
                this.$toast?.error?.(__('Something went wrong'));
            } finally {
                this.saving = false;
            }
        },

        discard() {
            this.pages = this.clonePages(this.initialPages);
            this.deletedEntries = [];
            this.cutNodeId = null;
            this.dirty = false;
            this.finishDrag();
        },

        cleanPagesForSubmission(pages) {
            return pages.map((page) => ({
                id: page.id,
                children: this.cleanPagesForSubmission(page.children || []),
            }));
        },

        nodeLabel(node) {
            return node.title || node.entry_title || node.url;
        },

        filterPagesForSearch(nodes) {
            return nodes.flatMap((node) => {
                const children = this.filterPagesForSearch(node.children || []);
                const matches = this.nodeMatchesSearch(node);

                if (! matches && ! children.length) {
                    return [];
                }

                return [{
                    ...node,
                    search_match: matches,
                    search_muted: ! matches,
                    children,
                }];
            });
        },

        nodeMatchesSearch(node) {
            const searchableText = [
                node.title,
                node.entry_title,
                node.url,
                node.slug,
                node.entry_blueprint?.title,
                node.collection?.title,
            ].filter(Boolean).join(' ');

            return this.normalizeSearchText(searchableText).includes(this.normalizedSearchQuery);
        },

        countSearchMatches(nodes) {
            return nodes.reduce((count, node) => {
                const ownMatch = this.nodeMatchesSearch(node) ? 1 : 0;

                return count + ownMatch + this.countSearchMatches(node.children || []);
            }, 0);
        },

        normalizeSearchText(value) {
            return String(value || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .trim();
        },

        findNode(nodes, id, parent = null, depth = 1) {
            for (let index = 0; index < nodes.length; index++) {
                const node = nodes[index];

                if (node.id === id) {
                    return {
                        node,
                        parent,
                        siblings: nodes,
                        index,
                        depth,
                    };
                }

                const match = this.findNode(node.children || [], id, node, depth + 1);

                if (match) {
                    return match;
                }
            }

            return null;
        },

        findNodePath(nodes, id, path = []) {
            for (const node of nodes) {
                const nextPath = [...path, { node }];

                if (node.id === id) {
                    return nextPath;
                }

                const match = this.findNodePath(node.children || [], id, nextPath);

                if (match.length) {
                    return match;
                }
            }

            return [];
        },

        removeNode(nodes, id) {
            const match = this.findNode(nodes, id);

            if (! match) {
                return null;
            }

            return match.siblings.splice(match.index, 1)[0];
        },

        containsNode(node, id) {
            return (node.children || []).some((child) => child.id === id || this.containsNode(child, id));
        },

        collectDescendantIds(node) {
            return (node.children || []).flatMap((child) => [
                child.id,
                ...this.collectDescendantIds(child),
            ]);
        },

        subtreeDepth(node) {
            if (! node.children?.length) {
                return 1;
            }

            return 1 + Math.max(...node.children.map((child) => this.subtreeDepth(child)));
        },

        clonePages(pages) {
            return JSON.parse(JSON.stringify(pages));
        },

        defaultOpenIds(nodes, depth = 1) {
            return nodes.flatMap((node) => {
                if (! node.children?.length || depth > 1) {
                    return [];
                }

                return [node.id, ...this.defaultOpenIds(node.children, depth + 1)];
            });
        },

        filterExistingIds(ids, nodes) {
            const existingIds = new Set();
            const collect = (items) => items.forEach((item) => {
                existingIds.add(item.id);
                collect(item.children || []);
            });

            collect(nodes);

            return ids.filter((id) => existingIds.has(id));
        },

        storageKey() {
            return `${STORAGE_KEY_PREFIX}.${this.collectionHandle}.${this.site || 'default'}`;
        },

        filterStorageKey() {
            return `${FILTER_KEY_PREFIX}.${this.collectionHandle}.${this.site || 'default'}`;
        },

        pagesCacheKey() {
            return `${PAGES_CACHE_KEY_PREFIX}.${this.collectionHandle}.${this.site || 'default'}.${this.pageAccessCacheKey}`;
        },

        latestPagesCacheKey() {
            return `${PAGES_CACHE_KEY_PREFIX}.${this.collectionHandle}.${this.site || 'default'}.${this.currentUserCacheKey()}.latest`;
        },

        currentUserCacheKey() {
            return Statamic.user?.id || Statamic.user?.email || 'guest';
        },

        restorePagesCache() {
            try {
                const value = window.sessionStorage.getItem(this.pagesCacheKey());

                return value ? JSON.parse(value) : null;
            } catch (error) {
                return null;
            }
        },

        restoreLatestPagesCache() {
            try {
                const sessionValue = window.sessionStorage.getItem(this.latestPagesCacheKey());

                if (sessionValue) {
                    return JSON.parse(sessionValue);
                }

                const persistedValue = window.localStorage.getItem(this.latestPagesCacheKey());

                if (! persistedValue) {
                    return null;
                }

                const persisted = JSON.parse(persistedValue);

                if (Array.isArray(persisted)) {
                    return persisted;
                }

                if (
                    ! Array.isArray(persisted?.pages)
                    || typeof persisted.cached_at !== 'number'
                    || Date.now() - persisted.cached_at > PAGES_CACHE_MAX_AGE_MS
                ) {
                    window.localStorage.removeItem(this.latestPagesCacheKey());

                    return null;
                }

                return persisted.pages;
            } catch (error) {
                return null;
            }
        },

        persistPagesCache() {
            try {
                const pages = JSON.stringify(this.pages);

                window.sessionStorage.setItem(this.pagesCacheKey(), pages);
                window.sessionStorage.setItem(this.latestPagesCacheKey(), pages);
                window.localStorage.setItem(this.latestPagesCacheKey(), JSON.stringify({
                    cached_at: Date.now(),
                    pages: this.pages,
                }));
            } catch (error) {}
        },

        restoreOpenIds() {
            try {
                const value = window.localStorage.getItem(this.storageKey());

                return value === null ? null : JSON.parse(value);
            } catch (error) {
                return null;
            }
        },

        persistOpenIds() {
            window.localStorage.setItem(this.storageKey(), JSON.stringify(this.openIds));
        },

        restoreFilterNode() {
            try {
                return window.localStorage.getItem(this.filterStorageKey());
            } catch (error) {
                return null;
            }
        },

        persistFilterNode() {
            if (this.filterNodeId) {
                window.localStorage.setItem(this.filterStorageKey(), this.filterNodeId);
                return;
            }

            window.localStorage.removeItem(this.filterStorageKey());
        },
    },
};
</script>
