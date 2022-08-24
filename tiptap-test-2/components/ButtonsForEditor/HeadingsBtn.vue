<template>
  <v-btn icon tile :title="btn.title" :class="{'is-active': editor.isActive('heading', {level: btn.level})}" @click="shortcutOnClick(btn.name, {level: btn.level})">
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
}
</script>
