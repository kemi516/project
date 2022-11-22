import {
  createRouter,
  createWebHashHistory,
} from "vue-router";
import TabbarView from "@/views/TabbarView.vue";
import HomeView from "@/views/HomeView.vue";
import ListView from "@/views/ListView.vue";
import MeView from "@/views/MeView.vue";

import SearchView from "../views/SearchView.vue";
import SelectCity from "../views/SelectCity.vue";
import ShowView from "../views/ShowView.vue";
import ArtistView from "../views/ArtistView.vue";
import VenueView from "../views/VenueView.vue";
import CollectView from "../views/CollectView.vue";
import LoginView from "../views/LoginView.vue";
import OrderView from "../views/OrderView.vue";
import DetailView from "../views/DetailView.vue";
import LocationView from "@/views/LocationView.vue";
import LogOutView from "@/views/LogOutView.vue";

import programAllView from "@/views/programAllView.vue";

import AttentionView from "@/views/AttentionView.vue";
import BuyTicket from "@/views/BuyTicket.vue";
import SitView from "@/views/SitView.vue";
import MyOrderView from "../views/MyOrderView.vue";

import GreatValueSelection from "../views/GreatValueSelection.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "tabber",
      component: TabbarView,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/list",
          name: "list",
          component: ListView,
        },
        {
          path: "/me",
          name: "me",
          component: MeView,
        },
      ],
    },
    {
      path: "/detail",
      name: "detail",
      component: DetailView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/selectcity",
      name: "selectcity",
      component: SelectCity,
    },
    {
      path: "/show",
      name: "show",
      component: ShowView,
    },
    {
      path: "/artist",
      name: "artist",
      component: ArtistView,
    },
    {
      path: "/venue",
      name: "venue",
      component: VenueView,
    },
    {
      path: "/collect",
      name: "collect",
      component: CollectView,
      meta: {
        needLogin: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
    },
    {
      path: "/location",
      name: "location",
      component: LocationView,
    },
    {
      path: "/program",
      name: "program",
      component: programAllView,
    },
    {
      path: "/attention",
      name: "AttentionView",
      component: AttentionView,
      meta: {
        needLogin: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: LogOutView,
      meta: {
        needLogin: true,
      },
    },
    {
      path: "/buy",
      name: "buy",
      component: BuyTicket,
    },
    {
      path: "/sit",
      name: "sit",
      component: SitView,
    },
    {
      path: "/myorder",
      name: "myorder",
      component: MyOrderView,
      meta: {
        needLogin: true,
      },
    },
    {
      path: "/great",
      name: "great",
      component: GreatValueSelection,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // document.title = `摩天轮${to.path}`;
  // console.log(to, from);
  const token = localStorage.getItem("token");
  if (!to.meta.needLogin) {
    next();
  } else {
    if (token) {
      // const a = document.cookie.split(";").map((e) => e.split("="));
      // const i = a.findIndex((e) => e[0] == "token");
      if (token == "Token_ssh") {
        next();
      } else {
        router.push("/login?to=" + to.path);
      }
    } else {
      router.push("/login?to=" + to.path);
    }
  }
});

export default router;
