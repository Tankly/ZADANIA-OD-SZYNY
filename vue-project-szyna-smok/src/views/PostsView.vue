<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="postsMain">
      <LoadingComponent :loading="loading" />
      <MainFilter :formInputs="formInputs" />
      <BuildPost :postsData="postsData" />
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import { getPostsData } from "@/api.js";
import MainFilter from "@/components/MainFilter.vue";
import BuildPost from "@/components/posts/BuildPosts.vue";
import LoadingComponent from "../components/LoadingComponent.vue";

export default {
  data() {
    return {
      loading: true,
      postsData: {},
      formInputs: {
        author: {
          name: "author",
          label: "Autor:",
          defaultValue: "",
          filterKey: "userId",
          type: "FormInput",
          inputType: "number",
        },
        title: {
          name: "title",
          label: "Tytuł:",
          defaultValue: "",
          filterKey: "title",
          type: "FormInput",
          inputType: "text",
        },
        content: {
          name: "content",
          label: "Treść:",
          defaultValue: "",
          filterKey: "body",
          type: "FormInput",
          inputType: "text",
        },
        sortBy: {
          name: "sortBy",
          label: "Sortowanie po:",
          defaultValue: "userId",
          type: "FormSelect",
          selectOptions: ["userId", "title", "body"],
          textForOptions: ["Autor", "Tytuł", "Treść"],
        },
        sortDirection: {
          name: "sortDirection",
          label: "Sposób sortowania:",
          defaultValue: "asc",
          type: "FormSelect",
          selectOptions: ["asc", "desc"],
          textForOptions: ["Rosnąco", "Malejąco"],
        },
      },
      btns: {
        filter: {
          type: "FormBtn",
          name: "filter",
          content: "Filtruj",
          btnFunction: async () => {
            // let filteredPosts = await filter("posts");
            // postBuilder(filteredPosts);
            // saveFilterSettings();
          },
        },
        clean: {
          type: "FormBtn",
          name: "clean",
          content: "Wyczyść",
          btnFunction: async () => {
            // clean();
            // await postsData();
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
    LoadingComponent,
  },
  async created() {
    this.postsData = await getPostsData();
    this.loading = false;
  },
};
</script>
