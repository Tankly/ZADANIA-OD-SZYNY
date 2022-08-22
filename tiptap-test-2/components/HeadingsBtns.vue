<template>
  <v-btn icon tile :title="btn.title" :class="{'is-active': editor.isActive('heading', {level: btn.level})}" @click="shortcutOnClick(btn.name, {level: btn.level})">
    <v-icon>{{ btn.icon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useEditorStore } from '~/store/Editor.js'

export default {
    props:{
        btn: {
            default: Object,
            type: Object,
            required: true,
        },
        editor: {
            default: Object,
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState(useEditorStore, {
            storeEditor: 'editor',
        })
    },
    methods: {
        ...mapActions(useEditorStore, ['shortcutOnClick'])
    },
}
</script>
