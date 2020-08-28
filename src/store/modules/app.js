import cookie from "js-cookie";
import { Login } from "@/api/login";
import { setToken, setUsername, removeToken, removeUsername } from "@/utils/app";
import { Cookie } from "js-cookie";
import { getUsername } from "@/utils/app";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  roles: [],
  token: "",
  username: getUsername() || "",
}

const getters = {
  isCollapse: state => state.isCollapse,
  username: state => state.username,
  roles: state => state.roles,
}

const mutations= {//必须的同步 没有回调处理事情
        SET_COLLAPSE(state){
          console.log(222);
          state.isCollapse = !state.isCollapse;
            //html5 本地存储
          sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
          // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
        },
        SET_TOKEN(state, value){
          state.token = value;
        },
        SET_USERNAME(state, value){
          state.username = value;
        },
        REMOVE_TOKEN(state){
            state.token = "";
        },
        SET_ROLES(state, value){
          state.roles = value;
          // console.log(state)
      },
      }
const actions= {//可以回调处理hi事情
  login(content, data){

    return new Promise( (resolve, reject) => {
        //接口
        Login(data).then( (response) => {
          let data =response.data.token
          content.commit('SET_TOKEN', data.access_token);
          content.commit('SET_USERNAME', data.username);
          setToken(data.access_token);
          setUsername(data.username);
//存储token

          return resolve(response);
        }).catch( (error) => {
          return reject(error);
        })
      })
    },
    //退出
    exit({ commit }){
      return new Promise( (resolve, reject) => {
        removeToken();
        removeUsername();
        commit("SET_TOKEN", "");
        commit("SET_USERNAME", "");
        commit("SET_ROLES", []);
        resolve();
      } )

    }
  }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};