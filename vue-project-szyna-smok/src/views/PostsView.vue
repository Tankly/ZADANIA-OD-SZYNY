<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="postsMain">
      <MainFilter
        :formInputs="formInputs"
        :btns="btns"
        v-model:inputsData="inputsData"
      />
      <BuildPost :postsData="postsData" v-if="postsData" />
      <LoadingComponent v-else />
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
      inputsData: {},
      postsData: null,
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
            this.postsData = null;
            this.postsData = await getPostsData();
            this.useFilter();
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
            document.forms["filterForm"].reset();
            this.inputsData = {};
            this.postsData = null;
            this.postsData = await getPostsData();
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
  },
  methods: {
    useFilter() {
      console.log(this.inputsData);
      for (let input in this.inputsData) {
        console.log(input);
        let type = this.formInputs[input].inputType;
        let key = this.formInputs[input].filterKey;
        console.log("key: ", key, "type: ", type);
        if (type == "text") {
          console.log(this.inputsData[input]);
          this.postsData = this.postsData.filter(() => {
            console.log(key.indexOf(this.inputsData[input]));
            return key.indexOf(this.inputsData[input]) !== -1;
          });
        }
      }
    },
  },
};
</script>
