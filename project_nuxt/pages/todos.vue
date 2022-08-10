<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="todos"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
    name: 'Todos',
    data() {
        return {
            todosData: null,
            search: null,
            headers: [],
            todos: [],
        }
    },
    async created() {
        this.todosData = await this.getTodosData();
        for(const key in  this.todosData[0]){
            this.headers.push({
                value: key,
                align: 'start',
                text: key,
            })
        }
        for(const todo in this.todosData){
            let tempObj = {}
            for(const value in this.headers){
                let name = this.headers[value].value
                tempObj[name] = this.todosData[todo][name]
            }
            this.todos.push(tempObj)
        }
    },
    methods: {
        async getTodosData() {
            const res = await this.$axios.$get('todos');
            return res
        },
    },
}
</script>
