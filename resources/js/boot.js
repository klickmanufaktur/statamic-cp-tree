import { createApp } from 'vue';
import PagesTree from './PagesTree.vue';
import '../css/page-tree.css';

let pagesTreeInjectorBooted = false;
let pagesTreeApp = null;
let pagesTreeMount = null;
let hiddenStatamicTreePanel = null;
let pagesTreeObserver = null;
let pagesTreeSyncQueued = false;
let pagesTreeSyncTimer = null;
let mountedTreeContextKey = null;
const pagesTreeInFlightRequests = new Map();
const collectionSiteOverrides = new Map();

export function bootStatamicCpTree() {
    if (pagesTreeInjectorBooted) return;

    pagesTreeInjectorBooted = true;
    installTreeRequestDedupe();

    document.addEventListener('inertia:navigate', () => queueTreeSync(50));
    document.addEventListener('inertia:finish', () => queueTreeSync(50));

    queueTreeSync(0);
    queueTreeSync(250);
    queueTreeSync(750);
}

function addonConfig() {
    return Statamic.$config.get('statamicCpTree') || {};
}

function enabledCollections() {
    return addonConfig().collections || [];
}

function isEnabledCollection(handle) {
    return enabledCollections().includes(handle);
}

function currentCollectionHandleFromPath() {
    const cpRoot = String(Statamic.$config.get('cpRoot') || '/cp').replace(/^\/|\/$/g, '');
    const segments = window.location.pathname.split('/').filter(Boolean);
    const cpIndex = segments.indexOf(cpRoot);

    if (cpIndex === -1) {
        return null;
    }

    return segments[cpIndex + 1] === 'collections' && segments.length === cpIndex + 3
        ? segments[cpIndex + 2]
        : null;
}

function isEnabledCollectionRoute() {
    const handle = currentCollectionHandleFromPath();

    return handle ? isEnabledCollection(handle) : false;
}

function syncTreeViewClass() {
    const enabled = isEnabledCollectionRoute();

    document.documentElement.classList.toggle('statamic-cp-tree-view', enabled);

    if (enabled) {
        startTreeObserver();
        syncTreeMount();
        return;
    }

    stopTreeObserver();
    destroyTree();
}

function installTreeRequestDedupe() {
    const axios = Statamic.$app?.config.globalProperties?.$axios;

    if (!axios || axios.get.__statamicCpTreeDedupe) {
        return;
    }

    const originalGet = axios.get.bind(axios);

    axios.get = (url, config) => {
        const treeRequest = parseCollectionTreeRequest(url);

        if (!treeRequest) {
            return originalGet(url, config);
        }

        rememberCollectionTreeSite(treeRequest);
        const key = String(url);

        if (pagesTreeInFlightRequests.has(key)) {
            return pagesTreeInFlightRequests.get(key);
        }

        const request = originalGet(url, config).finally(() => {
            pagesTreeInFlightRequests.delete(key);
        });

        pagesTreeInFlightRequests.set(key, request);

        return request;
    };

    axios.get.__statamicCpTreeDedupe = true;
}

function parseCollectionTreeRequest(url) {
    try {
        const cpRoot = String(Statamic.$config.get('cpRoot') || '/cp').replace(/^\/|\/$/g, '');
        const parsedUrl = new URL(url, window.location.origin);
        const segments = parsedUrl.pathname.split('/').filter(Boolean);
        const cpIndex = segments.indexOf(cpRoot);
        const isTreeRequest = cpIndex !== -1
            && segments[cpIndex + 1] === 'collections'
            && segments[cpIndex + 3] === 'tree';

        if (!isTreeRequest) {
            return null;
        }

        return {
            collection: segments[cpIndex + 2],
            site: parsedUrl.searchParams.get('site'),
        };
    } catch (error) {
        return null;
    }
}

function rememberCollectionTreeSite(treeRequest) {
    if (!treeRequest.collection || !treeRequest.site) {
        return;
    }

    if (!isEnabledCollection(treeRequest.collection)) {
        return;
    }

    if (collectionSiteOverrides.get(treeRequest.collection) === treeRequest.site) {
        return;
    }

    collectionSiteOverrides.set(treeRequest.collection, treeRequest.site);
    queueTreeSync(0);
}

function currentInertiaProps() {
    const statamicElement = document.getElementById('statamic');
    const initialPage = JSON.parse(statamicElement?.dataset.page || '{}');

    return window.history.state?.page?.props
        || window.history.state?.props
        || initialPage?.props
        || {};
}

function queueTreeSync(delay = 0) {
    window.clearTimeout(pagesTreeSyncTimer);
    pagesTreeSyncTimer = window.setTimeout(syncTreeViewClass, delay);
}

function startTreeObserver() {
    if (pagesTreeObserver) return;

    pagesTreeObserver = new MutationObserver(() => {
        if (pagesTreeSyncQueued) return;

        pagesTreeSyncQueued = true;
        requestAnimationFrame(() => {
            pagesTreeSyncQueued = false;
            syncTreeMount();
        });
    });

    pagesTreeObserver.observe(document.body, { childList: true, subtree: true });
}

function stopTreeObserver() {
    pagesTreeObserver?.disconnect();
    pagesTreeObserver = null;
    pagesTreeSyncQueued = false;
    window.clearTimeout(pagesTreeSyncTimer);
    pagesTreeSyncTimer = null;
}

function syncTreeMount() {
    if (!isEnabledCollectionRoute()) {
        destroyTree();
        return;
    }

    const props = currentInertiaProps();

    if (!isEnabledCollection(props.handle) || !props.structurePagesUrl) {
        destroyTree();
        return;
    }

    if (currentCollectionView(props) !== 'tree') {
        destroyTree();
        return;
    }

    const statamicTree = document.querySelector('.page-tree');
    const statamicTreePanel = statamicTree?.closest('[data-ui-panel]');

    if (pagesTreeApp && !pagesTreeMount?.isConnected) {
        resetDisconnectedTree();
    }

    const treeContextKey = currentTreeContextKey(props);

    if (pagesTreeApp && mountedTreeContextKey !== treeContextKey) {
        destroyTree();
    }

    if (pagesTreeApp) {
        hideStatamicTreePanel(statamicTreePanel);
        return;
    }

    const insertBeforeElement = statamicTreePanel || findTreeInsertBeforeElement();

    if (!insertBeforeElement) {
        return;
    }

    injectTree(insertBeforeElement, props, statamicTreePanel);
}

function currentCollectionView(props) {
    const view = Statamic.$preferences?.get?.(`collections.${props.handle}.view`);

    return view || 'tree';
}

function currentTreeContextKey(props) {
    return [
        props.handle,
        currentSiteForProps(props),
        props.structurePagesUrl,
        props.structureSubmitUrl,
    ].map((value) => value || '').join('|');
}

function currentSiteForProps(props) {
    return collectionSiteOverrides.get(props.handle) || props.initialSite;
}

function findTreeInsertBeforeElement() {
    const header = document.querySelector('[data-ui-header]');

    if (!header || !header.parentElement) {
        return null;
    }

    return header.nextElementSibling || null;
}

function hideStatamicTreePanel(statamicTreePanel) {
    if (!statamicTreePanel || statamicTreePanel === hiddenStatamicTreePanel) {
        return;
    }

    statamicTreePanel.hidden = true;
    hiddenStatamicTreePanel = statamicTreePanel;
}

function injectTree(insertBeforeElement, props, statamicTreePanel = null) {
    if (pagesTreeApp || !isEnabledCollectionRoute()) return;

    pagesTreeMount = document.createElement('div');
    pagesTreeMount.className = 'statamic-cp-tree-mount';
    insertBeforeElement.before(pagesTreeMount);
    hideStatamicTreePanel(statamicTreePanel);

    const treeProps = {
        ...props,
        initialSite: currentSiteForProps(props),
    };

    pagesTreeApp = createApp(PagesTree, { pageProps: treeProps, addonConfig: addonConfig() });
    mountedTreeContextKey = currentTreeContextKey(treeProps);
    Object.assign(pagesTreeApp._context.components, Statamic.$app._context.components);
    Object.assign(pagesTreeApp._context.directives, Statamic.$app._context.directives);
    Object.assign(pagesTreeApp._context.provides, Statamic.$app._context.provides);
    Object.assign(pagesTreeApp.config.globalProperties, Statamic.$app.config.globalProperties);
    pagesTreeApp.mount(pagesTreeMount);
}

function resetDisconnectedTree() {
    if (pagesTreeApp) {
        pagesTreeApp.unmount();
        pagesTreeApp = null;
    }

    mountedTreeContextKey = null;
    pagesTreeMount = null;

    if (hiddenStatamicTreePanel?.isConnected) {
        hiddenStatamicTreePanel.hidden = false;
    }

    hiddenStatamicTreePanel = null;
}

function destroyTree() {
    if (pagesTreeApp) {
        pagesTreeApp.unmount();
        pagesTreeApp = null;
    }

    mountedTreeContextKey = null;
    pagesTreeMount?.remove();
    pagesTreeMount = null;

    if (hiddenStatamicTreePanel) {
        hiddenStatamicTreePanel.hidden = false;
        hiddenStatamicTreePanel = null;
    }
}
