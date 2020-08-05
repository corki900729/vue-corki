import Vue from "vue";
import Vuex from "vuex";
import { Login } from "@/api/login";

Vue.use(Vuex);

import app from "./modules/app";
import login from "./modules/login";
import common from "./modules/common";

export default new Vuex.Store({
  state: {
  },
  getters: {//蕾丝 computed
  },
  mutations: {//必须的同步 没有回调处理事情
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse;
        //html5 本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    },
  },
  actions: {//可以回调处理hi事情
    login(content, data){
      return new Promise( (resolve, reject) => {
        //接口
        Login(data).then( (response) => {
          return resolve(response)
        }).catch( (error) => {
          return reject(error);
        })
      })
    }
  },
  modules: {
    app,login, common
  }
});