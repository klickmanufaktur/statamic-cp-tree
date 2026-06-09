<template>
    <Stack
        :title="__('Link')"
        size="narrow"
        inset
        :wrap-slot="false"
        v-model:open="showingToolbar"
    >
        <template #trigger>
            <Button
                class="px-2!"
                :class="{ active, group: variant === 'floating' }"
                :variant="variant === 'floating' ? 'subtle' : 'ghost'"
                size="sm"
                :aria-label="button.text"
                v-tooltip="button.text"
                @mousedown.prevent
            >
                <ui-icon :name="button.svg" v-if="button.svg" class="size-3.5!" :class="{ 'group-hover:text-white text-yellow-300!': active && variant === 'floating' }" />
                <div class="flex items-center" v-html="button.html" v-if="button.html" />
            </Button>
        </template>

        <BardLinkToolbar
            v-if="linkAttrs !== null"
            ref="toolbar"
            :link-attrs="linkAttrs"
            :config="config"
            :bard="bard"
            @updated="setLink"
            @canceled="close"
        />
    </Stack>
</template>

<script>
import { Button, Stack } from '@statamic/cms/ui';
import BardLinkToolbar from './BardLinkToolbar.vue';

export default {
    components: {
        BardLinkToolbar,
        Button,
        Stack,
    },

    props: {
        button: Object,
        active: Boolean,
        variant: String,
        config: Object,
        bard: {},
        editor: {},
    },

    data() {
        return {
            linkAttrs: null,
            showingToolbar: false,
        };
    },

    watch: {
        showingToolbar(showingToolbar) {
            if (showingToolbar) {
                this.linkAttrs = this.editor.getAttributes('link');
            } else {
                this.editor.commands.focus();
                this.linkAttrs = null;
            }
        },
    },

    created() {
        this.bard.events.on('open-link-toolbar', () => (this.showingToolbar = true));
    },

    beforeUnmount() {
        this.bard.events.off('open-link-toolbar');
    },

    methods: {
        close() {
            this.showingToolbar = false;
        },

        setLink(attributes) {
            this.editor.chain().focus().setLink(attributes).run();
            this.linkAttrs = null;
            this.close();
        },
    },
};
</script>
