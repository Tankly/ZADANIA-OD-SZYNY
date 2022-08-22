<template>
  <v-btn icon tile :title="btn.title" @click="shortcutOnClick(btn.name)">
    <v-icon>{{ btn.icon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'pinia'
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
    methods: {
        ...mapActions(useEditorStore, ['shortcutOnClick'])
    },
}
</script>
