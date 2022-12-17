import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

Vue.use(VueRouter);

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("../views/NewsView.vue"),
  },
  {
    path: "/map",
    name: "map",

    component: () => import("../views/MapView.vue"),
    redirect: "/map/list",
    children: [
      {
        path: "list",
        name: "list",
        component: () => import("@/components/map/MapList"),
      },
      {
        path: "detail",
        name: "detail",
        component: () => import("@/components/map/MapDetail"),
      },
    ],
  },

  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView"),
    children: [
      {
        path: "join",
        name: "join",
        component: () => import("@/components/user/UserRegister"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/UserLogin"),
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/UserMyPage"),
      },
      {
        path: "adminpage",
        name: "adminpage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/UserAdminPage"),
      },
      {
        path: "findpage",
        name: "findpage",
        component: () => import("@/components/user/UserFindPage"),
      },
      {
        path: "authuser",
        name: "authuser",
        component: () => import("@/components/user/UserAuth"),
      },
    ],
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/BoardView"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "write",
        name: "boardwrite",

        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "view/:articleno",
        name: "boardview",

        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "modify",
        name: "BoardModify",

        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardModify"),
      },
      {
        path: "delete/:articleno",
        name: "BoardDelete",

        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardDelete"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
