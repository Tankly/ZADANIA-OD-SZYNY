<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="postsMain">
      <MainFilter :formInputs="formInputs" />
      <BuildPost :postsData="postsData" />
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import { getPostsData } from "@/api.js";
import MainFilter from "@/components/MainFilter.vue";
import BuildPost from "@/components/BuildPost.vue";

export default {
  data() {
    return {
      postsData: {},
      formInputs: {
        author: {
          name: "author",
          label: "Autor:",
          defaultValue: "",
          filterKey: "userId",
          type: "input",
          inputType: "number",
        },
        title: {
          name: "title",
          label: "Tytuł:",
          defaultValue: "",
          filterKey: "title",
          type: "input",
          inputType: "text",
        },
        content: {
          name: "content",
          label: "Treść:",
          defaultValue: "",
          filterKey: "body",
          type: "input",
          inputType: "text",
        },
        sortBy: {
          name: "sortBy",
          label: "Sortowanie po:",
          defaultValue: "userId",
          type: "select",
          selectOptions: ["userId", "title", "body"],
          textForOptions: ["Autor", "Tytuł", "Treść"],
        },
        sortDirection: {
          name: "sortDirection",
          label: "Sposób sortowania:",
          defaultValue: "asc",
          type: "select",
          selectOptions: ["asc", "desc"],
          textForOptions: ["Rosnąco", "Malejąco"],
        },
        filter: {
          type: "button",
          id: "filter",
          content: "Filtruj",
          btnFunction: async () => {
            let filteredPosts = await filter("posts");
            postBuilder(filteredPosts);
            saveFilterSettings();
          },
        },
        clean: {
          type: "button",
          id: "clean",
          content: "Wyczyść",
          btnFunction: async () => {
            clean();
            await postsData();
          },
        },
      },
      headerText: "Posty",
    };
  },
  components: {
    MainHeader,
    MainFilter,
    BuildPost,
  },
  async created(){
    this.postsData = await getPostsData();
  }
};
</script>
