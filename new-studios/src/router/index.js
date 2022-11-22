import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import NoteView from "../views/NoteView.vue";
import SearchView from "../views/SearchView.vue";
import UserView from "../views/UserView.vue";
// import SearchView from "../views/SearchView.vue";
import ClassView from "../views/ClassView.vue";
import SearchPhoto from "../views/SearchPhoto.vue";
import SearchOv from "../views/SearchOv.vue";
import MyLogin from "../views/MyLogin.vue";

import MyView from "../views/MyView.vue";
import NavView from "@/components/NavView.vue";
import MyMain from "@/components/MyMain.vue";
import MyAttention from "@/components/MyAttention.vue";
import MyFans from "@/components/MyFans.vue";
import MyCollect from "@/components/MyCollect.vue";
import MyRecord from "@/components/MyRecord.vue";
import MySpace from "@/components/MySpace.vue";
import MyNote from "@/components/MyNote.vue";
import MyTransfer from "@/components/MyTransfer.vue";
import MyPhoto from "@/components/MyPhoto.vue";
import MyInformation from "@/components/MyInformation.vue";

import MyCourse from "@/components/MyCourse.vue";
import MyMatter from "@/components/MyMatter.vue";
import MyIndent from "@/components/MyIndent.vue";
import MyMember from "@/components/MyMember.vue";

import HomeMedia from "@/components/TabsCom/HomeMedia.vue";
import NoteXian from "@/components/note/NoteXian.vue";
import NoteList from "@/components/note/NoteList.vue";

// import MyCourse from "@/components/MyCourse.vue";
// import MyMatter from "@/components/MyMatter.vue";
// import MyIndent from "@/components/MyIndent.vue";
// import MyMember from "@/components/MyMember.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "note",
    // component: NoteView,
    // children: [],
    redirect: "/home",
  },
  {
    path: "/home",
    // name: "home",
    component: NavView,
    children: [
      {
        path: "",
        // name: "note",
        component: HomeView,
        // children: [],
      },
      {
        path: "note",
        name: "note",
        component: NoteView,
      },
      {
        path: "search",
        name: "search",
        component: SearchView,
      },
      {
        path: "class",
        name: "class",
        component: ClassView,
      },
      {
        path: "My",
        name: "My",
        component: MyView,
        meta: {
          dl: true,
        },
      },
    ],
  },
  {
    path: "/mymain",
    // name: "note",
    component: MyMain,
    // children: [],
  },
  {
    path: "/myattention",
    // name: "note",
    component: MyAttention,
    // children: [],
  },
  {
    path: "/myfans",
    // name: "note",
    component: MyFans,
    // children: [],
  },
  {
    path: "/MyCollect",
    // name: "note",
    component: MyCollect,
    // children: [],
  },
  {
    path: "/MyRecord",
    component: MyRecord,
  },
  {
    path: "/MySpace",
    component: MySpace,
  },
  {
    path: "/MyNote",
    component: MyNote,
  },
  {
    path: "/MyTransfer",
    component: MyTransfer,
  },
  {
    path: "/MyPhoto",
    component: MyPhoto,
  },
  {
    path: "/MyInformation",
    component: MyInformation,
  },
  {
    path: "/MyCourse",
    component: MyCourse,
  },
  {
    path: "/MyMatter",
    component: MyMatter,
  },
  {
    path: "/MyIndent",
    component: MyIndent,
  },
  {
    path: "/MyMember",
    component: MyMember,
  },
  {
    path: "/SearchPhoto",
    component: SearchPhoto,
  },
  {
    path: "/SearchOv",
    component: SearchOv,
  },
  {
    path: "/NoteXian",
    component: NoteXian,
  },
  {
    path: "/NoteList",
    component: NoteList,
  },

  {
    path: "/media",
    name: "media",
    component: HomeMedia,
    meta: {
      isMedia: true,
    },
  },
  {
    path: "/MyLogin",
    component: MyLogin,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/NoteView.vue"),
  // },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.meta.dl & !token) {
    // console.log("to", to, "  ", "from", from);
    //console.log("dengl");
    router.push("/MyLogin?from=" + to.path);

    next();
  } else {
    next();
  }
});

export default router;
