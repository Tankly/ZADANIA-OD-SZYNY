<template>
<v-card
    class="mx-auto"
    outlined>
  <div v-if="editor" >
  <v-item-group
    dense
    multiple
    class="d-flex flex-wrap  justify-center">

    <v-btn icon tile :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>
    <v-btn icon tile :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>
    <v-btn icon tile :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
      <v-icon>mdi-format-strikethrough</v-icon>
    </v-btn>
    <v-btn icon tile :class="{ 'is-active': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
      <v-icon>mdi-xml</v-icon>
    </v-btn>
    <v-btn icon tile @click="editor.chain().focus().unsetAllMarks().run()">
      <v-icon>mdi-broom</v-icon>
    </v-btn>
    <v-btn icon tile :class="{ 'is-active': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()">
      <v-icon>mdi-format-paragraph</v-icon>
    </v-btn>
    <v-menu offset-y :close-on-click="true">
     <template #activator="{ on, attrs }">
        <v-btn icon tile v-bind="attrs" v-on="on">
          <v-icon>mdi-format-header-pound</v-icon>
        </v-btn>
      </template>
      <v-list>
          <v-list-item>
            <v-btn icon tile :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
              <v-icon>mdi-format-header-1</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn icon tile :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
              <v-icon>mdi-format-header-2</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn icon tile :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
              <v-icon>mdi-format-header-3</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn icon tile :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
              <v-icon>mdi-format-header-4</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn icon tile :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
              <v-icon>mdi-format-header-5</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn icon tile :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
              <v-icon>mdi-format-header-6</v-icon>
            </v-btn>
          </v-list-item>
       </v-list>
    </v-menu>
    <v-btn icon tile :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn icon tile :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
      <v-icon>mdi-format-list-numbered</v-icon>
    </v-btn>
    <v-btn icon tile @click="editor.chain().focus().setHorizontalRule().run()">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-btn icon tile @click="editor.chain().focus().setHardBreak().run()">
      <v-icon>mdi-arrow-left-bottom</v-icon>
    </v-btn>
    <v-btn icon tile @click="editor.chain().focus().undo().run()">
      <v-icon>mdi-undo</v-icon>
    </v-btn>
    <v-btn icon tile @click="editor.chain().focus().redo().run()">
      <v-icon>mdi-redo</v-icon>
    </v-btn>
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

<style>
.is-active{
  background-color: #dad0d0;
}
</style>