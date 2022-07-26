<template>
  <nav class="navbar">
    <div class="navbarBody">
      <RouterLink
        v-for="page in pages"
        :key="page"
        :to="page.url"
        class="navbarItem"
      >
        {{ page.title }}
      </RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
};
</script>
