import Vue from "vue";
import store from "../store/index";
//自定义指令
Vue.directive("btnPerm", {
    //父级未被渲染
    bind:function(el, bingind, vnode){
      if(bingind.def.hasBtnPerm(bingind.value)){
        el.style.display = "none"
      }
  
    },//处理父节点
    inserted: function(el){
      // console.log('parent')
      // console.log(el.parentNode);
    },
    update: function(){
    },
    componentUpdate: function(){
    },
    unbind: function(){
    },
    hasBtnPerm: function(permisstion){
      // const button = store.getters["app/buttonPermission"];
      const button = "info:add,info:del";
      const role = store.getters['app/roles'];//获取角色
      console.log(role);
      if(role.includes("admin")){
        return true;//判断为超管
      }
      return button.indexOf(permisstion) != -1;
    }
  })