<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="postsMain">
      <FormBuilder
        :formInputs="formInputs"
        :btns="btns"
        :formInfo="formInfo"
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
import FormBuilder from "@/components/FormBuilder.vue";
import BuildPost from "@/components/posts/BuildPosts.vue";
import LoadingComponent from "../components/LoadingComponent.vue";

export default {
  data() {
    return {
      inputsData: { sortDirection: "asc", sortBy: "userId" },
      postsData: null,
      formInfo: {
        divId: "filterFormContainer",
        formId: "filterForm",
      },
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
          },
        },
        clean: {
          type: "FormBtn",
          name: "clean",
          content: "Wyczyść",
          btnFunction: async () => {
            document.forms["filterForm"].reset();
            this.inputsData = { sortDirection: "asc", sortBy: "userId" };
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
    FormBuilder,
    BuildPost,
    LoadingComponent,
  },
  async created() {
    this.postsData = await getPostsData();
  },
  methods: {
    useFilter() {
      for (let input in this.inputsData) {
        let type = this.formInputs[input].inputType;
        let key = this.formInputs[input].filterKey;
        if (this.inputsData[input]) {
          if (type == "text") {
            this.postsData = this.postsData.filter((e) => {
              return e[key].indexOf(this.inputsData[input]) !== -1;
            });
          } else if (type == "number") {
            this.postsData = this.postsData.filter((e) => {
              return e[key] == this.inputsData[input];
            });
          } else if (input == "sortDirection") {
            let isDesc = this.inputsData[input] != "asc";
            let sortBy = this.inputsData["sortBy"];
            this.postsData.sort((a, b) => {
              let greater = a[sortBy] >= b[sortBy];
              if (isDesc) {
                greater = !greater;
              }
              return greater ? 1 : -1;
            });
          }
        }
      }
    },
  },
};
</script>
