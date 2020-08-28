import router from "./index";

import { getToken, removeToken, removeUsername  } from "@/utils/app";
import store from "../store";
const whiteRouter = ["/login"];//白名单  indexOf方法 判断数组中是否存在指定的某个对戏哦昂,不存在返回-1
//l路由守卫
router.beforeEach( (to, from, next) => {
    if( getToken()){//路由的动态添加，分配菜单，为每个角色分配不同的菜单
        if(to.path == "/login"){
            removeToken();
            removeUsername();
            store.commit("app/REMOVE_TOKEN");
            store.commit("app/SET_USERNAME", "");
            next();
        }else{
            //获取用户的角色 动态分配路由权限
            /**1、什么时候处理动态路由
             * 2、什么条件处理
             */
            if(store.getters['app/roles'].length === 0){
                store.dispatch("permission/getRoles").then( response=>{
                    let roles = response;
                    // let button = response.button;
                    store.commit("app/SET_ROLES", roles);
                    store.dispatch("permission/createRouter", roles).then( response => {
                        let addRouter = store.getters['permission/addRouters'];
                        let allRouters = store.getters['permission/allRouters'];
                        router.addRoutes(addRouter);//添加动态路由
                        //路由更新
                        router.options.routes = allRouters ;
                        next({...to, replace:true}); //
                    })
                } );
            }else{
                next();
            }
        }
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){//当前路由在白名单内

            next();
        }else{

            next("./login");
        }
    }
  })
  