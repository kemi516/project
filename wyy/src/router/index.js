import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchSong from "../views/SearchSong.vue";
import PlayList from "../views/PlayList.vue";
import PlayXian from "../views/PlayXian.vue";
import ArtistView from "../views/ArtistView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/hot",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HotSong.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/search",
    name: "search",
    component: SearchSong,
    meta: { requiresAuth: true },
  },
  {
    path: "/playlist",
    name: "play",
    component: PlayList,
  },
  {
    path: "/playx",
    // name: "PlayXian",
    component: PlayXian,
  },
  {
    path: "/artist",
    // name: "PlayXian",
    component: ArtistView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
