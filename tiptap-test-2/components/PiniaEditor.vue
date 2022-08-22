<template>
    <v-card
        class="mx-auto"
        outlined>
        <div v-if="editor" >
            <v-item-group
                dense
                multiple
                class="d-flex flex-wrap  justify-center c-tiptap-btns">
                <BtnsWithClassIsActive v-for="btn in btnsWithClassIsActive" :key="btn.name" :btn="btn" :editor="editor"/>
                <v-menu absolute offset-y :close-on-click="true">
                    <template #activator="{ on, attrs }">
                        <v-btn icon tile v-bind="attrs" v-on="on">
                            <v-icon>mdi-format-header-pound</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="d-flex">
                        <v-list-item v-for="btn in headingsBtns" :key="btn.level" >
                            <HeadingsBtns :btn="btn" :editor="editor"/>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <JustBtn v-for="btn in justBtns" :key="btn.name" :btn="btn" :editor="editor"/>
                <v-menu absolute offset-y :close-on-click="true">
                    <template #activator="{ on, attrs }">
                        <v-btn icon tile v-bind="attrs" v-on="on">
                            <v-icon>mdi-table-cog</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="d-flex">
                        <v-list-item v-for="btn in btnsToEditTable" :key="btn.name">
                            <BtnToEditTable :btn="btn" :editor="editor"/>
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
            justBtns: {
                setHorizontalRule: {
                    icon: "mdi-minus",
                    title: "Wstaw poziomą linię",
                    name: "setHorizontalRule",
                },
                setHardBreak: {
                    icon: "mdi-arrow-left-bottom",
                    title: "Wstaw załamanie linii",
                    name: "setHardBreak",
                },
                undo: {
                    icon: "mdi-undo",
                    title: "Do tyłu",
                    name: "undo",
                },
                redo: {
                    icon: "mdi-redo",
                    title: "Do przodu",
                    name: "redo",
                },
                unsetAllMarks: {
                    icon: "mdi-broom",
                    title: "Wyczyść stylowanie",
                    name: "unsetAllMarks",
                },
                insertTable: {
                    icon: "mdi-table-plus",
                    title: "Wstaw tabele",
                    name: "insertTable",
                },
            },
            btnsToEditTable: {
                addColumnBefore: {
                    name: "addColumnBefore",
                    icon: "mdi-table-column-plus-before",
                    title: "Wstaw kolumne przed",
                },
                addColumnAfter: {
                    name: "addColumnAfter",
                    icon: "mdi-table-column-plus-after",
                    title: "Wstaw kolumne za",
                },
                deleteColumn: {
                    name: "deleteColumn",
                    icon: "mdi-table-column-remove",
                    title: "Usuń kolumne",
                },
                addRowBefore: {
                    name: "addRowBefore",
                    icon: "mdi-table-row-plus-before",
                    title: "Dodaj wiersz przed"
                },
                addRowAfter: {
                    name: "addRowAfter",
                    icon: "mdi-table-row-plus-after",
                    title: "Dodaj wiersz za"
                },
                deleteRow: {
                    name: "deleteRow",
                    icon: "mdi-table-row-remove",
                    title: "Usuń wiersz"
                },
                deleteTable: {
                    name: "deleteTable",
                    icon: "mdi-table-remove",
                    title: "Usuń tabele",
                },
                mergeCells: {
                    name: "mergeCells",
                    icon: "mdi-table-merge-cells",
                    title: "Scal komórki",
                },
                splitCell: {
                    name: "splitCell",
                    icon: "mdi-table-split-cell",
                    title: "Rozdziel komórki",
                },
                toggleHeaderColumn: {
                    name: "toggleHeaderColumn",
                    icon: "mdi-tag-arrow-left",
                    title: "Pierwsza kolumna jak nagłówkowa",
                },
                toggleHeaderRow: {
                    name: "toggleHeaderRow",
                    icon: "mdi-tag-arrow-up",
                    title: "Pierwszy wiersz jak nagłówkowy",
                },
                toggleHeaderCell: {
                    name: "toggleHeaderCell",
                    icon: "mdi-tag",
                    title: "Komórka nagłówkowa"
                },
                goToPreviousCell: {
                    name: "goToPreviousCell",
                    icon: "mdi-arrow-left",
                    title: "Poprzednia komórka",
                },
                goToNextCell: {
                    name: "goToNextCell",
                    icon: "mdi-arrow-right",
                    title: "Następna komórka",
                },
            },
            btnsWithClassIsActive: {
                toggleBold: {
                    icon: "mdi-format-bold",
                    title: "Pogrubienie",
                    name: "toggleBold",
                    class: "bold",
                },
                toggleItalic: {
                    icon: "mdi-format-italic",
                    title: "Kursywa",
                    name: "toggleItalic",
                    class: "italic",
                },
                toggleStrike: {
                    icon: "mdi-format-strikethrough",
                    title: "Przekreślenie",
                    name: "toggleStrike",
                    class: "strike",
                },
                setParagraph: {
                    icon: "mdi-format-paragraph",
                    title: "Paragraf",
                    name: "setParagraph",
                    class: "paragraph",
                },
                toggleBulletList: {
                    icon: "mdi-format-list-bulleted",
                    title: "Lista punktowana",
                    name: "toggleBulletList",
                    class: "bulletList",
                },
                toggleOrderedList: {
                    icon: "mdi-format-list-numbered",
                    title: "Lista numerowana",
                    name: "toggleOrderedList",
                    class: "orderedList",
                },

            },
            headingsBtns: {
                h1: {
                    icon: "mdi-format-header-1",
                    title: "H1",
                    name: "toggleHeading",
                    level: 1,
                },
                h2: {
                    icon: "mdi-format-header-2",
                    title: "H2",
                    name: "toggleHeading",
                    level: 2,
                },
                h3: {
                    icon: "mdi-format-header-3",
                    title: "H3",
                    name: "toggleHeading",
                    level: 3,
                },
                h4: {
                    icon: "mdi-format-header-4",
                    title: "H4",
                    name: "toggleHeading",
                    level: 4,
                },
                h5: {
                    icon: "mdi-format-header-5",
                    title: "H5",
                    name: "toggleHeading",
                    level: 5,
                },
                h6: {
                    icon: "mdi-format-header-6",
                    title: "H6",
                    name: "toggleHeading",
                    level: 6,
                },
            },
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
        shortcutIsDisabled(fnName){
            !this.editor.can()[fnName]()
        },
    }
    
}
</script>

<style>
.is-active{
  background-color: #dad0d0;
}
</style>