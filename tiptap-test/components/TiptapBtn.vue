<template>
    <div>
        <v-btn :class="btn.class" :title="title" :disabled="shortcutIsDisabled" icon @click="btn.onClick">
            <!-- <span class="hidden-sm-and-down">
                {{ btn }}
            </span> -->
            <v-icon>
                {{ btn.icon }}
            </v-icon>
        </v-btn>
    </div>
</template>

<script>

export default {
    name: "TiptapBtn",
    props: {
        btn: {
            type: Object,
            default: () => {},
            required: true,
        },
        title: {
            type: String,
            default: "",
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
            return !this.editor.can()[this.title]()
        }
    },
}
</script>
