<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main id="albumsMain">
      <MainFilter :formInputs="formInputs">
        <button @click="aaaaaaaaaaaaaaaaaaa"></button>
      </MainFilter>
      <BuildAlbums :albumsData="albumsData" />
    </main>
  </div>
</template>
<script>
import MainHeader from "@/components/MainHeader.vue";
import { getAlbums } from "@/api.js";
import MainFilter from "@/components/MainFilter.vue";
import BuildAlbums from "@/components/BuildAlbums.vue";

export default {
  data() {
    return {
      albumsData: {},
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
        filter: {
          type: "FormBtn",
          name: "filter",
          content: "Filtruj",
          btnFunction: async () => {
            // let filteredAlbums = await filter("albums");
            // albumsBuilder(filteredPosts);
            // saveFilterSettings();
          },
        },
        clean: {
          type: "FormBtn",
          name: "clean",
          content: "Wyczyść",
          btnFunction: async () => {
            // clean();
            // await albumsData();
          },
        },
      },
    };
  },
  components: {
    MainHeader,
    MainFilter,
    BuildAlbums,
  },
  async created() {
    this.albumsData = await getAlbums();
  },
};
</script>
