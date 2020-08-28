import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "../views/Home.vue";
Vue.use(VueRouter);

import Layout from "@/views/Layout";

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
    // name: "Home",
    // component: Home
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("../views/Login/index.vue"),
    meta: {
      name: "登陆"
    }
  },
  {
    path: "/console",
    name: "Console",
    redirect: "/index",
    meta: {
      name: "控制台",
      icon: "el-icon-eleme",
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页",
          icon: "el-icon-phone",
        },
        component: () => import("../views/Console/index.vue"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "el-icon-star-off",
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表",
          icon: "el-icon-s-platform",
        },
        component: () => import("../views/Info/index.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类",
          icon: "el-icon-s-marketing",
        },
        component: () => import("../views/Info/category.vue"),
      },
      {
        path: "/infoDetaild",
        name: "InfoDetaild",
        hidden: true,
        meta: {
          name: "信息详情",
          icon: "el-icon-s-marketing",
        },
        component: () => import("../views/Info/detailed.vue"),
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "el-icon-loading",
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表",
          icon: "el-icon-paperclip",
        },
        component: () => import("../views/User/index.vue"),
      },
      

    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
