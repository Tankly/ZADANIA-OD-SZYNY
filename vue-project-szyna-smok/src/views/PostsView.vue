<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main></main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import { getPostsData, getPostComments } from "@/api.js";

export default {
  data() {
    return {
      headerText: "Posty",
    };
  },
  components: {
    MainHeader,
  },
};
</script>
