<template>
  <header>
    <h1>{{ headerText }}</h1>
  </header>
</template>

<script>
export default {
  // props: ["headerText"],
  props: {
    headerText: {
      type: String,
      required: true,
      default: String,
    },
  },
};
</script>
