<template>
    <div>
        <v-btn class="c-tiptap-btns_btn" :title="btn" :disabled="btn.isDisabled" @click="btn.onClick">
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
    },
}
</script>
