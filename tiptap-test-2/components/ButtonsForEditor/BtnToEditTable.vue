<template>
  <v-btn icon tile :title="btn.title" :disabled="shortcutIsDisabled" @click="fun(btn.name)">
    <v-icon>{{ btn.icon }}</v-icon>
  </v-btn>
</template>

<script>

export default {
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
        fun: {
            type: Function,
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
