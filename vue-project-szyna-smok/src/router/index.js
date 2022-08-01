import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAlbums } from "@/api.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts",
      name: "posts",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/PostsView.vue"),
    },
    {
      path: "/userForm",
      name: "userForm",
      component: () => import("@/views/UserFormView.vue"),
    },
    {
      path: "/albums",
      name: "albums",
      component: () => import("@/views/AlbumsView.vue"),
    },
    {
      path: "/albums/:albumId/photos",
      name: "photos",
      component: () => import("@/views/PhotosView.vue"),
      props: (route) => ({
        ...route.params,
        albumId: parseInt(route.params.albumId),
      }),
      async beforeEnter(to) {
        let album = await getAlbums();
        const exists = album.find((album) => album.id == to.params.albumId);
        if (!exists) return { name: "404" };
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/views/PageNotFound.vue"),
    },
  ],
});

export default router;
