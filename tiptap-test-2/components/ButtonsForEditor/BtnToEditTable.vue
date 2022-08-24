<template>
  <v-btn icon tile :title="btn.title" :disabled="shortcutIsDisabled" @click="shortcutOnClick(btn.name)">
    <v-icon>{{ btn.icon }}</v-icon>
  </v-btn>
</template>

<script>
import editorMixin from "~/mixins/editorMixin.js"

export default {
    mixins: [editorMixin],
    props:{
        btn: {
            type: Object,
            default: () => {},
            required: true,
        },
        editor: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    computed: {
        shortcutIsDisabled(){
            return !this.editor.can()[this.btn.name]()
        }
    },
}
</script>
