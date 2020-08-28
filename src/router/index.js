import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "../views/Home.vue";
Vue.use(VueRouter);

import Layout from "@/views/Layout";


export const defaultRouterMap = [
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
  //404
  {
    path: "/page404",
    meta: {
      name: "404",
      icon: "el-icon-eleme",
    },
    hidden:true,
    component: Layout,
    children: [
      {
        path: "/404",
        meta: {
          name: "首页",
          icon: "el-icon-phone",
        },
        component: () => import("../views/404.vue"),
      }
    ]
  },
];
//动态路由
export  const asnycRouterMap = [
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      system: ["userSystem"],      
      icon: "el-icon-star-off",
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          system: ["userSystem"],  
          keepAlive: true,        
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
          keepAlive: true,   
          system: [], 
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
          keepAlive: true,  
          system: ["userSystem"], 
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
      system: ["userSystem"], 
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
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const router = new VueRouter({
  routes:defaultRouterMap,
});

export default router;