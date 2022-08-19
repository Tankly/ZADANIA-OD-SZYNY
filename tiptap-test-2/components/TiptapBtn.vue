<template>
    <div>
        <v-btn :class="btn.class" :title="title" :disabled="disabled" icon @click="btn.onClick">
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
            default: Object,
            required: true,
        },
        title: {
            type: String,
            default: String,
            required: true,
        },
        editor: {
            type: Object,
            default: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: Boolean,
            required: true,
        }
    },
}
</script>
