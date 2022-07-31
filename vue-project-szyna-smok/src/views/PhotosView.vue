<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText + $route.params.albumId" />
    <main id="photosMain">
      <LoadingComponent :loading="loading" />
      <BuildPhotos :photos="photos" />
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import BuildPhotos from "@/components/albums/BuildPhotos.vue";
import { getPhotosOfGivenAlbum } from "../api";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  data() {
    return {
      loading: true,
      headerText: "Zdjęcia z albumu numer ",
      photos: {},
    };
  },
  components: {
    MainHeader,
    BuildPhotos,
    LoadingComponent,
  },
  async created() {
    this.photos = await getPhotosOfGivenAlbum(this.$route.params.albumId);
    this.loading = false;
  },
};
</script>
