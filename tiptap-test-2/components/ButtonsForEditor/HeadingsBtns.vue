<template>
  <v-btn icon tile :title="btn.title" :class="{'is-active': editor.isActive('heading', {level: btn.level})}" @click="fun(btn.name, {level: btn.level})">
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
}
</script>
