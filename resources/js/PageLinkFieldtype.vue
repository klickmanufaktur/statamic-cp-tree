<template>
    <div class="page-link-fieldtype">
        <div class="flex gap-2 sm:gap-3">
            <div class="w-fit">
                <Select :options="options" v-model="option" />
            </div>

            <div class="flex-1 flex min-w-0">
                <Input v-if="option === 'url'" :read-only="isReadOnly" v-model="urlValue" />

                <relationship-fieldtype
                    v-if="option === 'entry'"
                    ref="entries"
                    handle="entry"
                    button-size="base"
                    :config="meta.entry.config"
                    :meta="meta.entry.meta"
                    :value="selectedEntries"
                    @update:meta="meta.entry.meta = $event"
                    @update:value="entriesSelected"
                />

                <div v-if="option === 'page'" class="page-link-fieldtype__page-control">
                    <div v-if="selectedPageId" class="page-link-fieldtype__selected related-item">
                        <div class="flex flex-1 items-center line-clamp-1 text-sm text-gray-600 dark:text-gray-300">
                            <StatusIndicator v-if="selectedPageStatus" :status="selectedPageStatus" class="me-2" />
                            <button
                                type="button"
                                class="page-link-fieldtype__selected-title"
                                :disabled="isReadOnly"
                                v-tooltip="selectedPageTitle"
                                @click="openPageSelector"
                            >
                                {{ selectedPageTitle || selectedPageId }}
                            </button>

                            <div class="flex flex-1 items-center justify-end">
                                <Icon name="fieldtype-navigation" class="page-link-fieldtype__selected-icon" aria-hidden="true" />
                                <div class="flex items-center" v-if="!isReadOnly">
                                    <Dropdown>
                                        <template #trigger>
                                            <Button icon="dots" variant="ghost" size="xs" :aria-label="__('Open dropdown menu')" />
                                        </template>
                                        <DropdownMenu>
                                            <DropdownItem text="Seite auswählen" icon="fieldtype-navigation" @click="openPageSelector" />
                                            <DropdownItem text="Verknüpfung aufheben" variant="destructive" @click="clearLink" />
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="relationship-input-buttons @container relative">
                        <div class="flex flex-wrap items-center gap-2">
                            <Button
                                icon="fieldtype-navigation"
                                size="base"
                                text="Seite verknüpfen"
                                :disabled="isReadOnly"
                                @click.prevent="openPageSelector"
                            />
                        </div>
                    </div>
                </div>

                <assets-fieldtype
                    v-if="option === 'asset'"
                    ref="assets"
                    handle="asset"
                    :value="selectedAssets"
                    :config="meta.asset.config"
                    :meta="meta.asset.meta"
                    @update:value="assetsSelected"
                    @update:meta="meta.asset.meta = $event"
                />
            </div>
        </div>

        <Stack v-model:open="pageSelectorOpen" title="Seite auswählen" icon="fieldtype-navigation" size="half">
            <StackContent inset>
                <div class="statamic-cp-tree page-link-fieldtype__tree">
                    <div class="page-node-access-fieldtype__header page-node-access-fieldtype__header--stack">
                        <Select
                            v-if="sites.length > 1"
                            class="page-link-fieldtype__site-select"
                            icon="globe-world-wide-web"
                            aria-label="Site wechseln"
                            v-tooltip="'Site wechseln'"
                            adaptive-width
                            :options="siteOptions"
                            v-model="selectedSite"
                        />
                        <Input
                            class="page-node-access-fieldtype__search"
                            v-model="searchQuery"
                            icon-prepend="magnifying-glass"
                            placeholder="Seiten suchen"
                            clearable
                            :append="searchAppendText"
                        />
                        <div class="page-node-access-fieldtype__tools">
                            <Button size="sm" icon="tree-collapse" text="Alle schließen" @click="collapseAll" />
                            <Button size="sm" icon="tree-expand" text="Alle öffnen" @click="expandAll" />
                        </div>
                    </div>

                    <div v-if="pageTreeLoading" class="statamic-cp-tree__state">Lade Seitenbaum...</div>
                    <div v-else-if="pageTreeError" class="statamic-cp-tree__state statamic-cp-tree__state--error">{{ pageTreeError }}</div>
                    <div v-else-if="!displayPages.length" class="statamic-cp-tree__state">
                        {{ isSearching ? 'Keine Treffer.' : 'Keine Seiten gefunden.' }}
                    </div>

                    <div v-else class="page-node-access-fieldtype__scroll page-node-access-fieldtype__scroll--stack">
                        <RadioGroup
                            class="page-link-fieldtype__radio-group"
                            :model-value="selectedPageId"
                            @update:model-value="pageSelected"
                        >
                            <ul class="statamic-cp-tree__list page-link-fieldtype__list" role="tree">
                                <PageLinkTreeNode
                                    v-for="node in displayPages"
                                    :key="node.id"
                                    :node="node"
                                    :depth="1"
                                    :open-ids="treeOpenIds"
                                    :selected-id="selectedPageId"
                                    @toggle-open="toggleOpen"
                                    @select-page="pageSelected"
                                />
                            </ul>
                        </RadioGroup>
                    </div>
                </div>
            </StackContent>

            <StackFooter>
                <template #start>{{ selectedPageTitle || 'Keine Seite ausgewählt' }}</template>
                <template #end>
                    <Button variant="primary" text="Fertig" @click="pageSelectorOpen = false" />
                </template>
            </StackFooter>
        </Stack>
    </div>
</template>

<script>
import { FieldtypeMixin } from '@statamic/cms';
import { Button, Dropdown, DropdownItem, DropdownMenu, Icon, Input, Radio, RadioGroup, Select, Stack, StackContent, StackFooter, StatusIndicator } from '@statamic/cms/ui';

const STORAGE_KEY_PREFIX = 'statamic.cp_tree.page_link.open_ids';
const UPDATE_DEBOUNCE_MS = 150;

function debounce(callback, wait) {
    let timeout = null;

    return (...args) => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => callback(...args), wait);
    };
}

const PageLinkTreeNode = {
    name: 'PageLinkTreeNode',

    components: {
        Icon,
        Radio,
        StatusIndicator,
    },

    props: {
        node: { type: Object, required: true },
        depth: { type: Number, required: true },
        openIds: { type: Array, required: true },
        selectedId: { type: String, default: null },
    },

    emits: ['toggle-open', 'select-page'],

    computed: {
        entryId() {
            return this.node.entry || this.node.id;
        },

        hasChildren() {
            return Array.isArray(this.node.children) && this.node.children.length > 0;
        },

        isOpen() {
            return this.openIds.includes(this.node.id);
        },

        isSelected() {
            return this.entryId === this.selectedId;
        },

        pageTitle() {
            return this.node.title || this.node.entry_title || this.node.url || this.node.id;
        },
    },

    methods: {
        toggleOpen() {
            if (this.hasChildren) {
                this.$emit('toggle-open', this.node.id);
            }
        },

        selectPage() {
            this.$emit('select-page', this.entryId);
        },
    },

    template: `
        <li
            class="statamic-cp-tree__item"
            :class="{
                'statamic-cp-tree__item--open': isOpen,
                'statamic-cp-tree__item--leaf': !hasChildren,
                'statamic-cp-tree__item--selected': isSelected,
                'statamic-cp-tree__item--search-match': node.search_match,
                'statamic-cp-tree__item--search-muted': node.search_muted,
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
                @click.stop="toggleOpen"
            >
                <span class="statamic-cp-tree__toggle-label" aria-hidden="true"></span>
            </button>
            <span v-else class="statamic-cp-tree__spacer" aria-hidden="true"></span>

            <div
                class="statamic-cp-tree__row page-link-fieldtype__row"
                role="button"
                tabindex="0"
                :aria-pressed="String(isSelected)"
                @click="selectPage"
                @keydown.enter.prevent="selectPage"
                @keydown.space.prevent="selectPage"
            >
                <Radio
                    class="page-link-fieldtype__radio"
                    :value="entryId"
                    :label="pageTitle"
                    @click.stop
                >
                    <span class="statamic-cp-tree__title">
                        <StatusIndicator :status="node.status || 'draft'" :show-label="false" />
                        <Icon v-if="depth === 1 && node.slug === 'home'" name="home" class="statamic-cp-tree__home" aria-hidden="true" />
                        {{ pageTitle }}
                    </span>
                </Radio>
            </div>

            <ul v-if="hasChildren && isOpen" class="statamic-cp-tree__children" role="group">
                <PageLinkTreeNode
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :depth="depth + 1"
                    :open-ids="openIds"
                    :selected-id="selectedId"
                    @toggle-open="$emit('toggle-open', $event)"
                    @select-page="$emit('select-page', $event)"
                />
            </ul>
        </li>
    `,
};

export default {
    components: {
        Button,
        Dropdown,
        DropdownItem,
        DropdownMenu,
        Icon,
        Input,
        PageLinkTreeNode,
        RadioGroup,
        Select,
        Stack,
        StackContent,
        StackFooter,
    },

    mixins: [FieldtypeMixin],

    provide: {
        isInLinkField: true,
    },

    data() {
        return {
            option: this.initialOption(),
            options: this.initialOptions(),
            urlValue: this.meta.initialUrl,
            selectedEntries: this.meta.initialSelectedEntries,
            selectedAssets: this.meta.initialSelectedAssets,
            metaChanging: false,
            pages: [],
            sites: [],
            selectedSite: null,
            pageTreeSite: 'default',
            pageTreeLoading: false,
            pageTreeError: null,
            pageSelectorOpen: false,
            openIds: [],
            searchQuery: '',
        };
    },

    computed: {
        entryValue() {
            return this.selectedEntries.length ? `entry::${this.selectedEntries[0]}` : null;
        },

        assetValue() {
            return this.selectedAssets.length ? `asset::${this.selectedAssets[0]}` : null;
        },

        selectedPageId() {
            return this.selectedEntries[0] || null;
        },

        selectedPageNode() {
            return this.selectedPageId ? this.findPageNode(this.pages, this.selectedPageId) : null;
        },

        selectedPageTitle() {
            if (! this.selectedPageNode) {
                return null;
            }

            return this.nodeLabel(this.selectedPageNode);
        },

        selectedPageStatus() {
            return this.selectedPageNode?.status || null;
        },

        isSearching() {
            return this.normalizedSearchQuery.length > 0;
        },

        normalizedSearchQuery() {
            return this.normalizeSearchText(this.searchQuery);
        },

        displayPages() {
            if (! this.isSearching) {
                return this.pages;
            }

            return this.filterPagesForSearch(this.pages);
        },

        searchResultCount() {
            return this.countSearchMatches(this.displayPages);
        },

        searchAppendText() {
            return this.isSearching ? String(this.searchResultCount) : null;
        },

        treeOpenIds() {
            if (! this.isSearching) {
                return this.openIds;
            }

            const ids = [];
            this.collectOpenIds(this.displayPages, ids);

            return ids;
        },

        siteOptions() {
            return this.sites.map((site) => ({ value: site.handle, label: site.name }));
        },

        replicatorPreview() {
            if (! this.showFieldPreviews) {
                return;
            }

            switch (this.option) {
                case 'url':
                    return this.urlValue;
                case 'first-child':
                    return __('First Child');
                case 'page':
                    return this.selectedPageTitle || this.entryValue;
                case 'entry':
                    return data_get(this.meta, 'entry.meta.data.0.title', this.entryValue);
                case 'asset':
                    return data_get(this.meta, 'asset.meta.data.0.basename', this.assetValue);
            }

            return this.value;
        },
    },

    watch: {
        option(option) {
            if (this.metaChanging) {
                return;
            }

            if (option === null) {
                this.update(null);
            } else if (option === 'url') {
                this.updateDebounced(this.urlValue);
            } else if (option === 'first-child') {
                this.update('@child');
            } else if (option === 'page') {
                if (this.selectedPageNode) {
                    this.update(this.entryValue);
                } else {
                    this.openPageSelector();
                }
            } else if (option === 'entry') {
                if (this.entryValue) {
                    this.update(this.entryValue);
                } else {
                    setTimeout(() => this.$refs.entries.linkExistingItem(), 0);
                }
            } else if (option === 'asset') {
                if (this.assetValue) {
                    this.update(this.assetValue);
                } else {
                    setTimeout(() => this.$refs.assets.openSelector(), 0);
                }
            }

            this.updateMeta({ ...this.meta, initialOption: option });
        },

        urlValue(url) {
            if (this.metaChanging) {
                return;
            }

            this.syncUrlDebounced(url);
        },

        meta(meta, oldMeta) {
            if (meta === oldMeta) {
                return;
            }

            if (JSON.stringify(meta) === JSON.stringify(oldMeta)) {
                return;
            }

            this.metaChanging = true;
            this.urlValue = meta.initialUrl;
            this.option = this.initialOption(meta.initialOption, meta.initialSelectedEntries);
            this.selectedEntries = meta.initialSelectedEntries;
            this.selectedAssets = meta.initialSelectedAssets;
            this.$nextTick(() => (this.metaChanging = false));
        },

        selectedSite(site, oldSite) {
            if (! oldSite || site === oldSite) {
                return;
            }

            this.loadPages(site);
        },
    },

    created() {
        this.syncUrlDebounced = debounce((url) => {
            this.update(url);
            this.updateMeta({ ...this.meta, initialUrl: url });
        }, UPDATE_DEBOUNCE_MS);
    },

    mounted() {
        this.loadPages();
    },

    methods: {
        initialOption(option = this.meta.initialOption, selectedEntries = this.meta.initialSelectedEntries) {
            if (option === 'page') {
                return 'page';
            }

            if (option === 'entry' && selectedEntries?.[0] && this.findPageNode(this.pages, selectedEntries[0])) {
                return 'page';
            }

            return option;
        },

        initialOptions() {
            return [
                this.config.required ? null : { label: __('None'), value: null },
                { label: __('URL'), value: 'url' },
                this.meta.showFirstChildOption ? { label: __('First Child'), value: 'first-child' } : null,
                { label: 'Seite', value: 'page' },
                { label: __('Entry'), value: 'entry' },
                this.meta.showAssetOption ? { label: __('Asset'), value: 'asset', maxFiles: 1 } : null,
            ].filter((option) => option);
        },

        async loadPages(site = this.selectedSite) {
            this.pageTreeLoading = true;
            this.pageTreeError = null;

            try {
                const config = Statamic.$config.get('statamicCpTree') || {};
                const url = config.pageLinkTreeUrl || cp_url('api/statamic-cp-tree/page-link-tree');
                const response = await this.$axios.get(url, { params: site ? { site } : {} });

                this.pages = response.data.pages || [];
                this.sites = response.data.sites || [];
                this.pageTreeSite = response.data.site || 'default';
                this.selectedSite = this.pageTreeSite;
                this.openIds = this.initialOpenIds(this.pages);

                if (this.option === 'entry' && this.selectedPageNode) {
                    this.metaChanging = true;
                    this.option = 'page';
                    this.updateMeta({ ...this.meta, initialOption: 'page' });
                    this.$nextTick(() => (this.metaChanging = false));
                }

                if (this.pageSelectorOpen) {
                    this.openSelectedPagePath();
                }
            } catch (error) {
                this.pageTreeError = 'Der Seitenbaum konnte nicht geladen werden.';
            } finally {
                this.pageTreeLoading = false;
            }
        },

        openPageSelector() {
            if (this.isReadOnly) {
                return;
            }

            this.openSelectedPagePath();
            this.pageSelectorOpen = true;
        },

        pageSelected(id) {
            this.selectedEntries = [id];
            this.update(`entry::${id}`);
            this.updateMeta({
                ...this.meta,
                initialOption: 'page',
                initialSelectedEntries: [id],
            });
            this.pageSelectorOpen = false;
        },

        clearLink() {
            const option = this.config.required ? 'page' : null;

            this.metaChanging = true;
            this.option = option;
            this.selectedEntries = [];
            this.update(null);
            this.updateMeta({
                ...this.meta,
                initialOption: option,
                initialSelectedEntries: [],
            });
            this.$nextTick(() => (this.metaChanging = false));
        },

        entriesSelected(entries) {
            this.selectedEntries = entries;
            this.update(this.entryValue);
            this.updateMeta({ ...this.meta, initialSelectedEntries: entries });
        },

        assetsSelected(assets) {
            this.selectedAssets = assets;
            this.update(this.assetValue);
            this.updateMeta({ ...this.meta, initialSelectedAssets: assets });
        },

        toggleOpen(id) {
            this.openIds = this.openIds.includes(id)
                ? this.openIds.filter((openId) => openId !== id)
                : [...this.openIds, id];

            this.persistOpenIds();
        },

        expandAll() {
            const ids = [];
            this.collectOpenIds(this.pages, ids);
            this.openIds = ids;
            this.persistOpenIds();
        },

        collapseAll() {
            this.openIds = [];
            this.persistOpenIds();
        },

        initialOpenIds(nodes) {
            const storedOpenIds = this.restoreOpenIds();

            if (Array.isArray(storedOpenIds)) {
                return this.filterExistingIds(storedOpenIds, nodes);
            }

            return this.defaultOpenIds(nodes);
        },

        defaultOpenIds(nodes, depth = 1) {
            return (nodes || []).flatMap((node) => {
                if (! node.children?.length || depth > 1) {
                    return [];
                }

                return [node.id, ...this.defaultOpenIds(node.children, depth + 1)];
            });
        },

        collectOpenIds(nodes, ids) {
            (nodes || []).forEach((node) => {
                if (node.children?.length) {
                    ids.push(node.id);
                    this.collectOpenIds(node.children, ids);
                }
            });
        },

        filterExistingIds(ids, nodes) {
            const existingIds = new Set();
            const collect = (items) => (items || []).forEach((item) => {
                existingIds.add(item.id);
                collect(item.children || []);
            });

            collect(nodes);

            return ids.filter((id) => existingIds.has(id));
        },

        storageKey() {
            return `${STORAGE_KEY_PREFIX}.${this.pageTreeSite || 'default'}`;
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
            try {
                window.localStorage.setItem(this.storageKey(), JSON.stringify(this.openIds));
            } catch (error) {}
        },

        openSelectedPagePath() {
            if (! this.selectedPageId || ! this.pages.length) {
                return;
            }

            const path = this.findPageNodePath(this.pages, this.selectedPageId);

            if (! path.length) {
                return;
            }

            const openIds = path.slice(0, -1);
            this.openIds = [...new Set([...this.openIds, ...openIds])];
        },

        findPageNode(nodes, entryId) {
            for (const node of nodes || []) {
                if ((node.entry || node.id) === entryId) {
                    return node;
                }

                const child = this.findPageNode(node.children || [], entryId);

                if (child) {
                    return child;
                }
            }

            return null;
        },

        findPageNodePath(nodes, entryId, path = []) {
            for (const node of nodes || []) {
                const nextPath = [...path, node.id];

                if ((node.entry || node.id) === entryId) {
                    return nextPath;
                }

                const childPath = this.findPageNodePath(node.children || [], entryId, nextPath);

                if (childPath.length) {
                    return childPath;
                }
            }

            return [];
        },

        nodeLabel(node) {
            return node.title || node.entry_title || node.url || node.id;
        },

        normalizeSearchText(value) {
            return String(value || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .trim();
        },

        filterPagesForSearch(nodes) {
            return (nodes || []).flatMap((node) => {
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
            return this.normalizeSearchText([
                node.title,
                node.entry_title,
                node.url,
                node.slug,
            ].filter(Boolean).join(' ')).includes(this.normalizedSearchQuery);
        },

        countSearchMatches(nodes) {
            return (nodes || []).reduce((count, node) => (
                count + (this.nodeMatchesSearch(node) ? 1 : 0) + this.countSearchMatches(node.children || [])
            ), 0);
        },
    },
};
</script>
