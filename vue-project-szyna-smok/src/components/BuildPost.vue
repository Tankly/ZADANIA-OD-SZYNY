<template>
  <div id="postsContainer">
    <div
      v-for="post in postsData"
      :key="post"
      class="post"
      :id="`post_${post.id}`"
    >
      <h2>Post nr: {{ post.id }} <br />{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <div class="postFooter">
        <span>Autor: {{ post.id }}</span>
        <button
          @click="
            () => {
              toggle = !toggle;
            }
          "
        >
          Komentarze
        </button>
      </div>
      <PostComments v-if="toggle" :postId="post.id" />
    </div>
  </div>
</template>

<script>
import PostComments from "./PostComments.vue";
export default {
  props: {
    postsData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toggle: false,
    };
  },
  components: { PostComments },
};
</script>
