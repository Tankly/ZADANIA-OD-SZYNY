<template>
  <div v-if="loading" class="loadingDiv">
    <div class="loadingSubDiv">
      <span class="loader loader-circles"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueLoader",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
