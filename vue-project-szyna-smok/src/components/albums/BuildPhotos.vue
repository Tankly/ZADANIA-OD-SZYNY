<template>
  <div id="slider">
    <div id="nLeft" class="navigation"></div>
    <img
      id="photoBox"
      :src="photos[currentPhoto].url"
      :alt="photos[currentPhoto].title"
      :title="photos[currentPhoto].title"
    />
    <div id="nRight" class="navigation"></div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Object,
      default: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPhoto: 0,
    };
  },
};
</script>
