<template>
<v-card
    class="mx-auto"
    outlined>
  <div v-if="editor" >
  <v-item-group
    dense
    multiple
    class="d-flex flex-wrap  justify-center">
    <TiptapBtn v-for="btn in Object.keys(btns)" :key="btn" :btn="btns[btn]" :title="btn" />
  </v-item-group>
  </div>
  <EditorContent :editor="editor" />
</v-card>
</template>

<script>
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
      btns: null,
      aaa: "toggleHeaderRow",
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
        TableRow,
        TableHeader,
        CustomTableCell,
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
    this.btns = {
        insertTable: {
          onClick: () => {this.shortcutOnClick("insertTable", ({ rows: 3, cols: 3, withHeaderRow: true }))},
          name: "addColumnBefore",
          icon: "mdi-table-plus",
        },
        addColumnBefore: {
          onClick: () => {this.shortcutOnClick("addColumnBefore")},
          isDisabled: () => {this.shortcutIsDisabled("addColumnBefore")},
          // isDisabled: !this.editor.can().addColumnBefore(),
          name: "addColumnBefore",
          icon: "mdi-table-column-plus-before",
        },
        addColumnAfter: {
          onClick: () => {this.shortcutOnClick("addColumnAfter")},
          isDisabled: this.shortcutIsDisabled("addColumnAfter"),
          icon: "mdi-table-column-plus-after",
        },
        deleteColumn: {
          onClick: () => {this.shortcutOnClick("deleteColumn")},
          isDisabled: this.shortcutIsDisabled("deleteColumn"),
          icon: "mdi-table-column-remove",
        },
        addRowBefore: {
          onClick: () => {this.shortcutOnClick("addRowBefore")},
          isDisabled: this.shortcutIsDisabled("addRowBefore"),
          icon: "mdi-table-row-plus-before",
        },
        addRowAfter: {
          onClick: () => {this.shortcutOnClick("addRowAfter")},
          isDisabled: this.shortcutIsDisabled("addRowAfter"),
          icon: "mdi-table-row-plus-after",
        },
        deleteRow: {
          onClick: () => {this.shortcutOnClick("deleteRow")},
          isDisabled: this.shortcutIsDisabled("deleteRow"),
          icon: "mdi-table-row-remove",
        },
        deleteTable: {
          onClick: () => {this.shortcutOnClick("deleteTable")},
          isDisabled: this.shortcutIsDisabled("deleteTable"),
          icon: "mdi-table-remove",
        },
        mergeCells: {
          onClick: () => {this.shortcutOnClick("mergeCells")},
          isDisabled: this.shortcutIsDisabled("mergeCells"),
          icon: "mdi-table-merge-cells",
        },
        splitCell: {
          onClick: () => {this.shortcutOnClick("splitCell")},
          isDisabled: this.shortcutIsDisabled("splitCell"),
          icon: "mdi-table-split-cell",
        },
        toggleHeaderColumn: {
          onClick: () => {this.shortcutOnClick("toggleHeaderColumn")},
          isDisabled: this.shortcutIsDisabled("toggleHeaderColumn"),
          icon: "mdi-tag-arrow-left",
        },
        toggleHeaderRow: {
          onClick: () => {this.shortcutOnClick("toggleHeaderRow")},
          isDisabled: this.shortcutIsDisabled("toggleHeaderRow"),
          icon: "mdi-tag-arrow-up",
        },
        toggleHeaderCell: {
          onClick: () => {this.shortcutOnClick("toggleHeaderCell")},
          isDisabled: this.shortcutIsDisabled("toggleHeaderCell"),
          icon: "mdi-tag",
        },
        mergeOrSplit: {
          onClick: () => {this.shortcutOnClick("mergeOrSplit")},
          isDisabled: this.shortcutIsDisabled("mergeOrSplit"),
          icon: "mdi-set-all",
        },
        setCellAttribute: {
          onClick: () => {this.editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()},
          isDisabled: !this.editor.can().setCellAttribute('backgroundColor', '#FAF594'),
          icon: "mdi-table-eye",
        },
        fixTables: {
          onClick: () => {this.shortcutOnClick("fixTables")},
          isDisabled: this.shortcutIsDisabled("fixTables"),
          icon: "mdi-table-cog",
        },
        goToPreviousCell: {
          onClick: () => {this.shortcutOnClick("goToPreviousCell")},
          isDisabled: this.shortcutIsDisabled("goToPreviousCell"),
          icon: "mdi-arrow-left",
        },
        goToNextCell: {
          onClick: () => {this.shortcutOnClick("goToNextCell")},
          isDisabled: this.shortcutIsDisabled("goToNextCell"),
          icon: "mdi-arrow-right",
        },
        setTextAlignLeft: {
          onClick: () => {this.shortcutOnClick("setTextAlign","left")},
          icon: "mdi-format-align-left",
          name: "setTextAlignLeft",
          class: { 'is-active': this.editor.isActive({ textAlign: 'left' }) },
        },
        setTextAlignCenter: {
          onClick: () => {this.shortcutOnClick("setTextAlign","center")},
          icon: "mdi-format-align-center",
          name: "setTextAlignCenter",
          class: { 'is-active': this.editor.isActive({ textAlign: 'center' }) },
        },
        setTextAlignRight: {
          onClick: () => {this.shortcutOnClick("setTextAlign","right")},
          icon: "mdi-format-align-right",
          name: "setTextAlignRight",
          class: { 'is-active': this.editor.isActive({ textAlign: 'right' }) },
        },
        setTextAlignJustify: {
          onClick: () => {this.shortcutOnClick("setTextAlign","justify")},
          icon: "mdi-format-align-justify",
          name: "setTextAlignJustify",
          class: { 'is-active': this.editor.isActive({ textAlign: 'justify' }) },
        },
        toggleHighlight: {
          onClick: () => {this.shortcutOnClick("toggleHighlight")},
          icon: "mdi-format-color-highlight",
          name: "toggleHighlight",
          class: { 'is-active': this.editor.isActive('highlight') },
        },
        toggleStrike: {
          onClick: () => {this.shortcutOnClick("toggleStrike")},
          icon: "mdi-format-strikethrough",
          name: "toggleStrike",
          class: { 'is-active': this.editor.isActive('strike') },
        },
        toggleItalic: {
          onClick: () => {this.shortcutOnClick("toggleItalic")},
          icon: "mdi-format-italic",
          name: "toggleItalic",
          class: { 'is-active': this.editor.isActive('italic') },
        },
        toggleBold: {
          onClick: () => {this.shortcutOnClick("toggleBold")},
          icon: "mdi-format-bold",
          name: "toggleBold",
          class: { 'is-active': this.editor.isActive('bold') },
        },
        setParagraph: {
          onClick: () => {this.shortcutOnClick("setParagraph")},
          icon: "mdi-format-paragraph",
          name: "setParagraph",
          class: { 'is-active': this.editor.isActive('paragraph') },
        },

      }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    shortcutOnClick(fnName, option) {
      this.editor.chain().focus()[fnName](option).run()
    },
    shortcutIsDisabled(fnName){
     !this.editor.can()[fnName]()
    }
  }
}
</script>