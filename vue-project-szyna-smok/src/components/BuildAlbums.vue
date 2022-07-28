<template>
  <div id="albumsContainer">
    <AlbumBuilder v-for="album in albumsData" :key="album" :album="album" />
  </div>
</template>

<script>
import AlbumBuilder from "@/components/AlbumBuilder.vue";

export default {
  props: {
    albumsData: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  components: { AlbumBuilder },
};
</script>
