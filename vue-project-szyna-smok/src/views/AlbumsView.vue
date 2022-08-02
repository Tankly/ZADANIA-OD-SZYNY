<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="albumsMain">
      <MainFilter :formInputs="formInputs" :btns="btns">
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
};
</script>
