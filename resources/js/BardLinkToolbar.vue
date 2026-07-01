<template>
    <StackContent class="space-y-5">
        <section class="flex gap-3 items-center">
            <Select v-model="linkType" :options="visibleLinkTypes" class="w-1/4 min-w-24" />

            <div class="flex-1 min-w-0">
                <Input v-if="linkType === 'url'" v-model="url.url" type="text" ref="urlInput" autofocus placeholder="https://" @keydown.enter.prevent="commit" />

                <Input v-else-if="linkType === 'mailto'" v-model="urlData.mailto" type="text" ref="mailtoInput" :placeholder="__('Email Address')" @keydown.enter.prevent="commit" />

                <Input v-else-if="linkType === 'tel'" v-model="urlData.tel" ref="telInput" :placeholder="__('Phone Number')" @keydown.enter.prevent="commit" />

                <div v-else-if="linkType === 'asset'" class="link-fieldtype">
                    <assets-fieldtype
                        ref="assetField"
                        handle="asset"
                        :value="selectedAssets"
                        :config="assetFieldConfig"
                        :meta="assetFieldMeta"
                        @update:value="assetFieldSelected"
                    />
                </div>

                <button
                    v-else
                    type="button"
                    :class="[
                        'flex overflow-hidden cursor-pointer items-center justify-between',
                        'w-full bg-white dark:bg-gray-900 min-w-0',
                        'border border-gray-300 with-contrast:border-gray-500 dark:border-gray-700 dark:with-contrast:border-gray-500 dark:inset-shadow-2xs dark:inset-shadow-black',
                        'text-gray-925 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-400/85',
                        'appearance-none antialiased shadow-ui-sm disabled:shadow-none disabled:opacity-50 not-prose',
                        'text-sm rounded-lg px-2.5 py-1.5 h-10 leading-[1.125rem]',
                    ]"
                    @click="openSelector"
                >
                    <Icon v-if="isLoading" name="loading" />

                    <span v-else class="flex flex-1 items-center me-2 overflow-hidden min-w-0">
                        <StatusIndicator v-if="linkType === 'page' && selectedPageStatus" :status="selectedPageStatus" class="me-2" />
                        <span class="truncate min-w-0 flex-1">{{ displayValue || __('Choose item...') }}</span>
                    </span>

                    <span class="flex items-center cursor-pointer" v-tooltip="`${__('Browse')}...`" :aria-label="`${__('Browse')}...`">
                        <Icon v-show="linkType === 'page'" name="fieldtype-navigation" class="size-4" />
                        <Icon v-show="linkType === 'entry'" name="folder" class="size-4" />
                    </span>
                </button>
            </div>
        </section>

        <ui-separator :text="__('Advanced Options')" />

        <section class="space-y-5">
            <Input v-if="linkType === 'entry' || linkType === 'page'" type="text" v-model="appends" :prepend="__('Append')" :placeholder="__('?query=params#anchor')" />
            <Input type="text" ref="input" v-model="title" :prepend="__('Label')" :placeholder="__('Add a link label')" />
            <Input type="text" ref="input" v-model="rel" :prepend="__('Rel')" :placeholder="__('noopener, noreferrer')" />

            <div class="flex items-center gap-2">
                <ui-switch v-model="targetBlank" />
                <ui-description :text="__('Open in new window')" />
            </div>
        </section>

        <relationship-input
            class="hidden"
            ref="relationshipInput"
            name="link"
            :value="[]"
            :config="relationshipConfig"
            :item-data-url="itemDataUrl"
            :selections-url="selectionsUrl"
            :filters-url="filtersUrl"
            :columns="[{ label: __('Title'), field: 'title' }]"
            :max-items="1"
            :site="bard.site"
            :search="true"
            @loading="isLoading = $event"
            @item-data-updated="entrySelected"
        />

        <Stack v-model:open="pageSelectorOpen" title="Seite auswählen" icon="fieldtype-navigation" size="half">
            <StackContent inset>
                <div class="statamic-cp-tree page-link-fieldtype__tree">
                    <div class="page-node-access-fieldtype__header page-node-access-fieldtype__header--stack">
                        <Select v-if="sites.length > 1" class="page-link-fieldtype__site-select" icon="globe-world-wide-web" aria-label="Site wechseln" v-tooltip="'Site wechseln'" adaptive-width :options="siteOptions" v-model="selectedSite" />
                        <Input class="page-node-access-fieldtype__search" v-model="searchQuery" icon-prepend="magnifying-glass" placeholder="Seiten suchen" clearable :append="searchAppendText" />
                        <div class="page-node-access-fieldtype__tools">
                            <Button size="sm" icon="tree-collapse" text="Alle schließen" @click="collapseAll" />
                            <Button size="sm" icon="tree-expand" text="Alle öffnen" @click="expandAll" />
                        </div>
                    </div>

                    <div v-if="pageTreeLoading" class="statamic-cp-tree__state">Lade Seitenbaum...</div>
                    <div v-else-if="pageTreeError" class="statamic-cp-tree__state statamic-cp-tree__state--error">{{ pageTreeError }}</div>
                    <div v-else-if="!displayPages.length" class="statamic-cp-tree__state">{{ isSearching ? 'Keine Treffer.' : 'Keine Seiten gefunden.' }}</div>

                    <div v-else class="page-node-access-fieldtype__scroll page-node-access-fieldtype__scroll--stack">
                        <RadioGroup class="page-link-fieldtype__radio-group" :model-value="selectedPageId" @update:model-value="pageSelected">
                            <ul class="statamic-cp-tree__list page-link-fieldtype__list" role="tree">
                                <PageLinkTreeNode v-for="node in displayPages" :key="node.id" :node="node" :depth="1" :open-ids="treeOpenIds" :selected-id="selectedPageId" @toggle-open="toggleOpen" @select-page="pageSelected" />
                            </ul>
                        </RadioGroup>
                    </div>
                </div>
            </StackContent>

            <StackFooter>
                <template #start>{{ selectedPageTitle || 'Keine Seite ausgewählt' }}</template>
                <template #end><Button variant="primary" text="Fertig" @click="pageSelectorOpen = false" /></template>
            </StackFooter>
        </Stack>
    </StackContent>

    <StackFooter>
        <template #end>
            <ui-button @click="$emit('canceled')" :text="__('Cancel')" variant="ghost" />
            <ui-button :text="__('Remove Link')" @click="remove" />
            <ui-button :text="__('Apply Link')" :disabled="!canCommit" @click="commit" variant="primary" />
        </template>
    </StackFooter>
</template>

<script>
import { Button, Icon, Input, Radio, RadioGroup, Select, Stack, StackContent, StackFooter, StatusIndicator } from '@statamic/cms/ui';

const STORAGE_KEY_PREFIX = 'statamic.cp_tree.bard_page_link.open_ids';

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
            <button v-if="hasChildren" class="statamic-cp-tree__toggle" :class="{ 'is-open': isOpen }" type="button" :aria-label="isOpen ? 'Einklappen' : 'Ausklappen'" @click.stop="toggleOpen">
                <span class="statamic-cp-tree__toggle-label" aria-hidden="true"></span>
            </button>
            <span v-else class="statamic-cp-tree__spacer" aria-hidden="true"></span>

            <div class="statamic-cp-tree__row page-link-fieldtype__row" role="button" tabindex="0" :aria-pressed="String(isSelected)" @click="selectPage" @keydown.enter.prevent="selectPage" @keydown.space.prevent="selectPage">
                <Radio class="page-link-fieldtype__radio" :value="entryId" :label="pageTitle" @click.stop>
                    <span class="statamic-cp-tree__title">
                        <StatusIndicator :status="node.status || 'draft'" :show-label="false" />
                        <Icon v-if="depth === 1 && node.slug === 'home'" name="home" class="statamic-cp-tree__home" aria-hidden="true" />
                        {{ pageTitle }}
                    </span>
                </Radio>
            </div>

            <ul v-if="hasChildren && isOpen" class="statamic-cp-tree__children" role="group">
                <PageLinkTreeNode v-for="child in node.children" :key="child.id" :node="child" :depth="depth + 1" :open-ids="openIds" :selected-id="selectedId" @toggle-open="$emit('toggle-open', $event)" @select-page="$emit('select-page', $event)" />
            </ul>
        </li>
    `,
};

export default {
    emits: ['updated', 'canceled', 'deselected'],

    components: {
        Button,
        Icon,
        Input,
        PageLinkTreeNode,
        RadioGroup,
        Select,
        Stack,
        StackContent,
        StackFooter,
        StatusIndicator,
    },

    provide: {
        isInLinkField: true,
    },

    props: {
        bard: {},
        config: Object,
        linkAttrs: Object,
    },

    data() {
        return {
            linkType: 'url',
            linkTypes: [
                { value: 'url', label: __('URL') },
                { value: 'page', label: 'Seite' },
                { value: 'entry', label: __('Entry') },
                { value: 'asset', label: 'Datei' },
                { value: 'mailto', label: __('Email') },
                { value: 'tel', label: __('Phone') },
            ],
            url: {},
            urlData: {},
            itemData: {},
            appends: null,
            title: null,
            rel: null,
            targetBlank: false,
            isLoading: false,
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
        addonConfig() {
            return Statamic.$config.get('statamicCpTree') || {};
        },

        visibleLinkTypes() {
            return this.linkTypes.filter((type) => {
                if (type.value === 'asset' && ! this.config.container) {
                    return false;
                }

                return true;
            });
        },

        displayValue() {
            switch (this.linkType) {
                case 'url':
                    return this.url.url;
                case 'page':
                    return this.selectedPageTitle || this.pageItemData?.title || null;
                case 'entry':
                    return this.itemData.entry ? this.itemData.entry.title : null;
                case 'asset':
                    return this.itemData.asset ? this.itemData.asset.basename : null;
                case 'mailto':
                    return this.urlData.mailto ? this.urlData.mailto : null;
                case 'tel':
                    return this.urlData.tel ? this.urlData.tel : null;
            }

            return null;
        },

        canCommit() {
            return !! this.url[this.linkType];
        },

        href() {
            return this.sanitizeLink(this.url[this.linkType]);
        },

        normalizedAppends() {
            const value = this.appends;

            if (! value) {
                return '';
            }

            if (value.startsWith('?') || value.startsWith('#')) {
                return value;
            }

            return value.includes('=') ? `?${value}` : `#${value}`;
        },

        defaultRel() {
            const rel = [];

            if (this.config.link_noopener) {
                rel.push('noopener');
            }

            if (this.config.link_noreferrer) {
                rel.push('noreferrer');
            }

            return rel.length ? rel.join(' ') : null;
        },

        relationshipConfig() {
            return {
                type: 'entries',
                collections: this.collections,
                max_items: 1,
                select_across_sites: this.config.select_across_sites,
            };
        },

        itemDataUrl() {
            return `${cp_url('fieldtypes/relationship/data')}?${this.relationshipQueryString()}`;
        },

        selectionsUrl() {
            return `${cp_url('fieldtypes/relationship')}?${this.relationshipQueryString(true)}`;
        },

        filtersUrl() {
            return `${cp_url('fieldtypes/relationship/filters')}?${this.relationshipQueryString(true)}`;
        },

        configParameter() {
            return utf8btoa(JSON.stringify(this.relationshipConfig));
        },

        collections() {
            return this.bard.meta.linkCollections;
        },

        canHaveTarget() {
            return ['url', 'page', 'entry', 'asset'].includes(this.linkType);
        },

        selectedTextIsEmail() {
            const { view, state } = this.bard.editor;
            const { from, to } = view.state.selection;
            const text = state.doc.textBetween(from, to, '');

            return text.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        },

        selectedPageId() {
            const { id } = this.parseDataUrl(this.url.page);

            return id || null;
        },

        selectedPageNode() {
            return this.selectedPageId ? this.findPageNode(this.pages, this.selectedPageId) : null;
        },

        selectedPageTitle() {
            return this.selectedPageNode ? this.nodeLabel(this.selectedPageNode) : null;
        },

        selectedPageStatus() {
            return this.selectedPageNode?.status || this.pageItemData?.status || null;
        },

        pageItemData() {
            return this.itemData.page || null;
        },

        selectedAssets() {
            const { id } = this.parseDataUrl(this.url.asset);

            return id ? [id] : [];
        },

        assetFieldConfig() {
            return {
                container: this.config.container,
                folder: this.config.folder || '/',
                restrict: this.config.restrict_assets,
                max_files: 1,
                mode: 'list',
                allow_uploads: this.config.allow_uploads ?? true,
                show_filename: true,
            };
        },

        assetFieldMeta() {
            return {
                container: this.bard.meta.assets.container,
                columns: this.bard.meta.assets.columns,
                data: this.itemData.asset ? [this.itemData.asset] : [],
            };
        },

        isSearching() {
            return this.normalizedSearchQuery.length > 0;
        },

        normalizedSearchQuery() {
            return this.normalizeSearchText(this.searchQuery);
        },

        displayPages() {
            return this.isSearching ? this.filterPagesForSearch(this.pages) : this.pages;
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
    },

    watch: {
        linkType(type) {
            if (! ['entry', 'page'].includes(type)) {
                this.appends = null;
            }

            if (type === 'page' && ! this.url.page) {
                this.openPageSelector();
            }

            this.autofocus();
        },

        urlData: {
            deep: true,
            handler() {
                if (! ['mailto', 'tel'].includes(this.linkType)) {
                    return;
                }

                this.setUrl(
                    this.linkType,
                    this.urlData[this.linkType] ? `${this.linkType}:${this.urlData[this.linkType]}` : null,
                );
            },
        },

        selectedSite(site, oldSite) {
            if (! oldSite || site === oldSite) {
                return;
            }

            this.loadPages(site);
        },
    },

    created() {
        this.applyAttrs(this.linkAttrs);

        this.bard.events.on('link-selected', this.applyAttrs);
        this.bard.events.on('link-deselected', () => this.$emit('deselected'));

        if (Object.keys(this.linkAttrs).length === 0 && this.selectedTextIsEmail) {
            this.linkType = 'mailto';
            this.urlData = { mailto: this.selectedTextIsEmail };
        }
    },

    mounted() {
        this.loadPages();
        this.autofocus();
    },

    beforeUnmount() {
        this.bard.events.off('link-selected');
        this.bard.events.off('link-deselected');
    },

    methods: {
        applyAttrs(attrs) {
            const type = this.getLinkTypeForUrl(attrs.href);
            const appends = this.getAppendsForUrl(attrs.href);
            const href = appends ? attrs.href?.replace(appends, '') : attrs.href;

            this.linkType = type;
            this.appends = appends;
            this.url = { [type]: href };
            this.urlData = { [type]: this.getUrlDataForUrl(attrs.href) };
            this.itemData = { [type]: this.getItemDataForUrl(attrs.href, type) };

            this.title = attrs.title;
            this.rel = attrs.href ? attrs.rel : this.defaultRel;
            this.targetBlank = attrs.href ? attrs.target === '_blank' : (this.config.target_blank || false);
        },

        autofocus() {
            if (this.linkType === 'url') {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.urlInput?.focus();
                    }, 50);
                });
            }
        },

        relationshipQueryString(includeCollections = false) {
            const params = new URLSearchParams();

            params.set('config', this.configParameter);

            if (includeCollections) {
                this.collections.forEach((collection) => params.append('collections[]', collection));
            }

            return params.toString();
        },

        setUrl(type, url) {
            this.url = {
                ...this.url,
                [type]: url,
            };
        },

        setItemData(type, itemData) {
            this.itemData = {
                ...this.itemData,
                [type]: itemData,
            };
        },

        remove() {
            this.$emit('updated', { href: null });
        },

        commit() {
            if (! this.href) {
                return this.remove();
            }

            this.$emit('updated', {
                href: this.href + this.normalizedAppends,
                rel: this.rel,
                target: this.canHaveTarget && this.targetBlank ? '_blank' : null,
                title: this.title,
            });
        },

        sanitizeLink(link) {
            if (! link) {
                return null;
            }

            const str = link.trim();

            return str.match(/^\w[\w\-_\.]+\.(co|uk|com|org|net|gov|biz|info|us|eu|de|fr|it|es|pl|nz)/i)
                ? `https://${str}`
                : str;
        },

        openSelector() {
            if (this.linkType === 'page') {
                this.openPageSelector();
            } else if (this.linkType === 'entry') {
                this.openEntrySelector();
            }
        },

        openEntrySelector() {
            this.$refs.relationshipInput.openSelector();
        },

        assetFieldSelected(assets) {
            if (assets.length) {
                this.loadAssetData(assets[0]);
            } else {
                this.setItemData('asset', null);
                this.setUrl('asset', null);
            }
        },

        loadAssetData(url) {
            this.isLoading = true;

            this.$axios
                .post(cp_url('assets-fieldtype'), {
                    assets: [url],
                })
                .then((response) => {
                    this.selectItem('asset', response.data[0]);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        entrySelected(data) {
            if (data.length) {
                this.selectItem('entry', data[0]);
            }
        },

        selectItem(type, item) {
            const ref = `${type}::${item.id}`;

            this.setItemData(type, item);
            this.setUrl(type, `statamic://${ref}`);
            this.putItemDataIntoMeta(ref, item);
        },

        putItemDataIntoMeta(ref, item) {
            const meta = this.bard.meta;

            meta.linkData[ref] = item;
            this.bard.updateMeta(meta);
        },

        getLinkTypeForUrl(url) {
            const { type, id } = this.parseDataUrl(url);

            if (type === 'entry' && this.findPageNode(this.pages, id)) {
                return 'page';
            }

            if (type) {
                return type;
            }

            const matches = url ? url.match(/^(mailto|tel):(.*)$/) : null;

            if (matches) {
                return matches[1];
            }

            return 'url';
        },

        getUrlDataForUrl(url) {
            const matches = url ? url.match(/^(mailto|tel):(.*)$/) : null;

            if (! matches) {
                return null;
            }

            return matches[2];
        },

        getItemDataForUrl(url, linkType = null) {
            const { ref, id } = this.parseDataUrl(url);

            if (! ref) {
                return null;
            }

            if (linkType === 'page') {
                return this.pageItemFromNode(this.findPageNode(this.pages, id)) || this.bard.meta.linkData[ref];
            }

            return this.bard.meta.linkData[ref];
        },

        getAppendsForUrl(urlString) {
            if (! urlString?.includes('statamic://entry::')) {
                return null;
            }

            return urlString.replace(urlString.split(/[?#]/)[0], '') || null;
        },

        parseDataUrl(url) {
            if (! url) {
                return {};
            }

            const appends = this.getAppendsForUrl(url);
            const matches = (appends ? url.replace(appends, '') : url).match(/^statamic:\/\/((.*?)::(.*))$/);

            if (! matches) {
                return {};
            }

            const [, ref, type, id] = matches;

            return { ref, type, id };
        },

        async loadPages(site = this.selectedSite) {
            this.pageTreeLoading = true;
            this.pageTreeError = null;

            try {
                const url = this.addonConfig.pageLinkTreeUrl || cp_url('api/statamic-cp-tree/page-link-tree');
                const response = await this.$axios.get(url, { params: site ? { site } : {} });

                this.pages = response.data.pages || [];
                this.sites = response.data.sites || [];
                this.pageTreeSite = response.data.site || 'default';
                this.selectedSite = this.pageTreeSite;
                this.openIds = this.initialOpenIds(this.pages);

                const { id } = this.parseDataUrl(this.url.entry || this.url.page);
                const pageNode = id ? this.findPageNode(this.pages, id) : null;

                if (this.linkType === 'entry' && pageNode) {
                    const href = this.url.entry;

                    this.linkType = 'page';
                    this.url = { page: href };
                    this.itemData = { page: this.pageItemFromNode(pageNode) };
                }

                if (this.linkType === 'page' && pageNode) {
                    this.itemData = { page: this.pageItemFromNode(pageNode) };
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
            this.openSelectedPagePath();
            this.pageSelectorOpen = true;
        },

        pageSelected(id) {
            const node = this.findPageNode(this.pages, id);
            const item = this.pageItemFromNode(node) || { id, title: id };
            const ref = `entry::${id}`;

            this.setItemData('page', item);
            this.setUrl('page', `statamic://${ref}`);
            this.putItemDataIntoMeta(ref, item);
            this.pageSelectorOpen = false;
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

            this.openIds = [...new Set([...this.openIds, ...path.slice(0, -1)])];
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

        pageItemFromNode(node) {
            if (! node) {
                return null;
            }

            return {
                id: node.entry || node.id,
                title: this.nodeLabel(node),
                status: node.status || null,
                url: node.url || null,
            };
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

                return [{ ...node, search_match: matches, search_muted: ! matches, children }];
            });
        },

        nodeMatchesSearch(node) {
            return this.normalizeSearchText([node.title, node.entry_title, node.url, node.slug].filter(Boolean).join(' ')).includes(this.normalizedSearchQuery);
        },

        countSearchMatches(nodes) {
            return (nodes || []).reduce((count, node) => (
                count + (this.nodeMatchesSearch(node) ? 1 : 0) + this.countSearchMatches(node.children || [])
            ), 0);
        },
    },
};
</script>
