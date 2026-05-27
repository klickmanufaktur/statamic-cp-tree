import { bootStatamicCpTree } from './boot';
import PageLinkFieldtype from './PageLinkFieldtype.vue';

function registerComponents() {
    const config = Statamic.$config.get('statamicCpTree') || {};

    if (config.pageLinkCollection) {
        Statamic.$components.register('link-fieldtype', PageLinkFieldtype);
    }
}

function boot() {
    bootStatamicCpTree();
}

if (Statamic.$app) {
    registerComponents();
    boot();
} else {
    Statamic.booting(registerComponents);
    Statamic.booted(boot);
}
