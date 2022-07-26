<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main></main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  data() {
    return {
      headerText: "Albumy",
    };
  },
  components: {
    MainHeader,
  },
};
</script>
