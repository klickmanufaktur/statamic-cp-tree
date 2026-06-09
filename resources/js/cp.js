import { bootStatamicCpTree } from './boot';
import PageLinkFieldtype from './PageLinkFieldtype.vue';
import BardLinkToolbarButton from './BardLinkToolbarButton.vue';

function registerComponents() {
    const config = Statamic.$config.get('statamicCpTree') || {};

    Statamic.$components.register('statamic-cp-tree-bard-link-toolbar-button', BardLinkToolbarButton);

    if (config.pageLinkCollection) {
        Statamic.$components.register('link-fieldtype', PageLinkFieldtype);
    }

    Statamic.$bard.buttons((buttons) => {
        const anchorButton = buttons.find((button) => button && button.name === 'anchor');

        if (anchorButton) {
            anchorButton.component = 'statamic-cp-tree-bard-link-toolbar-button';
        }
    });
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
