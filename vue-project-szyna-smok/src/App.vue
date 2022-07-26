<template>
  <MainNavbar :pages="pages" />
  <router-view />
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";

export default {
  name: "app",
  data() {
    return {
      pages: {
        home: {
          title: "Strona główna",
          url: "/",
        },
        posts: {
          title: "Posty",
          url: "/posts",
        },
        userFrom: {
          title: "Formularz",
          url: "/userForm",
        },
        albums: {
          title: "Albumy",
          url: "/albums",
        },
      },
    };
  },
  components: {
    MainNavbar,
  },
};
</script>
