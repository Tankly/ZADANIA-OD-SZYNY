<template>
    <v-card
        class="mx-auto"
        outlined>
        <div v-if="editor" >
            <v-item-group
                dense
                multiple
                class="d-flex flex-wrap  justify-center c-tiptap-btns">
                <BtnsWithClassIsActive v-for="btn in btnsWithClassIsActive" :key="btn.name" :btn="btn" :editor="editor" :fun="shortcutOnClick"/>
                <v-menu absolute offset-y :close-on-click="true">
                    <template #activator="{ on, attrs }">
                        <v-btn icon tile v-bind="attrs" v-on="on">
                            <v-icon>mdi-format-header-pound</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="d-flex">
                        <v-list-item v-for="btn in headingsBtns" :key="btn.level" >
                            <HeadingsBtns :btn="btn" :editor="editor" :fun="shortcutOnClick"/>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <JustBtn v-for="btn in justBtns" :key="btn.name" :btn="btn" :editor="editor" :fun="shortcutOnClick"/>
                <v-menu absolute offset-y :close-on-click="true">
                    <template #activator="{ on, attrs }">
                        <v-btn icon tile v-bind="attrs" v-on="on">
                            <v-icon>mdi-table-cog</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="d-flex">
                        <v-list-item v-for="btn in btnsToEditTable" :key="btn.name">
                            <BtnToEditTable :btn="btn" :editor="editor" :fun="shortcutOnClick"/>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-item-group>
        </div>
        <EditorContent :editor="editor" />
    </v-card>
</template>

<script>

import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import { justBtns, btnsToEditTable, btnsWithClassIsActive, headingsBtns } from './_editorData'

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

    data(){
        return {
            editor: null,
            justBtns,
            btnsToEditTable,
            btnsWithClassIsActive,
            headingsBtns,
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
    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        shortcutOnClick(fnName, option) {
            this.editor.chain().focus()[fnName](option).run()
        },
    }
    
}
</script>

<style>
.is-active{
  background-color: #dad0d0;
}
</style>