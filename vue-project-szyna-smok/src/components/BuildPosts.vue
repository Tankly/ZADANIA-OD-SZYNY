<template>
  <div id="postsContainer">
    <PostBuilder v-for="post in postsData" :key="post" :post="post" />
  </div>
</template>

<script>
import PostBuilder from "./PostBuilder.vue";

export default {
  props: {
    postsData: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  components: { PostBuilder },
};
</script>
