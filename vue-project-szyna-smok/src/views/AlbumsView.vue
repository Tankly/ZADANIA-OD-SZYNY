<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="albumsMain">
      <MainFilter
        :formInputs="formInputs"
        :btns="btns"
        v-model:inputsData="inputsData"
      >
        <button @click="aaaaaaaaaaaaaaaaaaa"></button>
      </MainFilter>
      <BuildAlbums :albumsData="albumsData" v-if="albumsData" />
      <LoadingComponent v-else />
    </main>
  </div>
</template>
<script>
import MainHeader from "@/components/MainHeader.vue";
import { getAlbums } from "@/api.js";
import MainFilter from "@/components/MainFilter.vue";
import BuildAlbums from "@/components/albums/BuildAlbums.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  data() {
    return {
      inputsData: { sortDirection: "asc", sortBy: "userId" },
      albumsData: null,
      headerText: "Albumy",
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
        sortBy: {
          name: "sortBy",
          label: "Sortowanie po:",
          defaultValue: "userId",
          type: "FormSelect",
          selectOptions: ["userId", "title"],
          textForOptions: ["Autor", "Tytuł"],
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
            this.albumsData = null;
            this.albumsData = await getAlbums();
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
            this.albumsData = null;
            this.albumsData = await getAlbums();
          },
        },
      },
    };
  },
  components: {
    MainHeader,
    MainFilter,
    BuildAlbums,
    LoadingComponent,
  },
  async created() {
    this.albumsData = await getAlbums();
  },
  methods: {
    useFilter() {
      for (let input in this.inputsData) {
        let type = this.formInputs[input].inputType;
        let key = this.formInputs[input].filterKey;
        if (type == "text") {
          this.albumsData = this.albumsData.filter((e) => {
            return e[key].indexOf(this.inputsData[input]) !== -1;
          });
        } else if (type == "number") {
          this.albumsData = this.albumsData.filter((e) => {
            return e[key] == this.inputsData[input];
          });
        } else if (input == "sortDirection") {
          let isDesc = this.inputsData[input] != "asc";
          let sortBy = this.inputsData["sortBy"];
          this.albumsData.sort((a, b) => {
            let greater = a[sortBy] >= b[sortBy];
            if (isDesc) {
              greater = !greater;
            }
            return greater ? 1 : -1;
          });
        }
      }
    },
  },
};
</script>
