import { defineStore } from "pinia";
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Editor } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export const useEditorStore = defineStore("EditorStore", {
    state: () =>{
        return {
            editor: null,
        }
    },
    actions:{
        buildEditor(){
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
        }
    }
})