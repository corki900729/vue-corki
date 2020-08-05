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



import "./router/premit";
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
// Vue.use(global);

Vue.config.productionTip = false;


//runtime模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
