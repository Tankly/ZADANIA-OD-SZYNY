<template>
  <div class="post" :id="`post_${post.id}`">
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
</template>

<script>
import PostComments from "./PostComments.vue";
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: Object,
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
