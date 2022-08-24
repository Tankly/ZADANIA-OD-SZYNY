export default {
    methods: {
        shortcutOnClick(fnName, option) {
            this.editor.chain().focus()[fnName](option).run()
        },
    }
}