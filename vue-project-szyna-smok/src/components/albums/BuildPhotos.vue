<template>
  <div id="slider">
    <div id="nLeft" class="navigation" @click="previous"></div>
    <img
      id="photoBox"
      :src="currentPhoto.url"
      :alt="currentPhoto.title"
      :title="currentPhoto.title"
      :class="{ photoShakeAnimation: isShaking }"
    />
    <div id="nRight" class="navigation" @click="next"></div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      default: Array,
      required: true,
    },
  },
  computed: {
    currentPhoto() {
      return this.photos[this.photoIterator] || {};
    },
  },
  data() {
    return {
      photoIterator: 0,
      isShaking: false,
    };
  },
  methods: {
    iteratorHandler(handler) {
      this.isShaking = true;
      handler(this.photoIterator);
      setTimeout(() => {
        this.isShaking = false;
      }, 500);
    },
    next() {
      this.iteratorHandler(() => {
        this.photoIterator++;
        if (this.photoIterator >= this.photos.length) {
          this.photoIterator = 0;
        }
      });
    },
    previous() {
      this.iteratorHandler(() => {
        this.photoIterator--;
        if (this.photoIterator < 0) {
          this.photoIterator = this.photos.length - 1;
        }
      });
    },
  },
};
</script>
