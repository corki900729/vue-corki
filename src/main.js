import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//自定义全局组件
import "./icons";
//自定义全局方法
// import global from "@/utils/global.js";




Vue.use(ElementUI);
Vue.use(VueCompositionApi);

// Vue.use(global);
//自定义指令引入
import "./utils/buttonPerm";

import "./router/premit";

// Vue.directive("btnPerm", {
//   //父级未被渲染
//   bind:function(el, bingind, vnode){
//     if(bingind.def.hasBtnPerm(bingind.value)){
//       el.style.display = "none"
//     }

//   },//处理父节点
//   inserted: function(el){
//     console.log('parent')
//     console.log(el.parentNode);
//   },
//   update: function(){
//   },
//   componentUpdate: function(){
//   },
//   unbind: function(){
//   },
//   hasBtnPerm: function(permisstion){
//     // const button = store.getters["app/buttonPermission"];
//     const button = "info:add,info:del";
//     return button.indexOf(permisstion) != -1;
//   }
// })




Vue.config.productionTip = false;


//runtime模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
