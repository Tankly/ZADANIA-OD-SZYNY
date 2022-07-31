<template>
  <div class="commentsContainer" :id="`post_${postId}_comments`">
    <h3>Komentarze:</h3>
    <div v-for="comment in comments" :key="comment" class="commentDiv">
      <h4>
        {{ comment.email }} <br />
        {{ comment.name }}
      </h4>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
import { getPostComments } from "@/api.js";
export default {
  data() {
    return {
      comments: {},
    };
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  async created() {
    this.comments = await getPostComments(this.postId);
  },
};
</script>
