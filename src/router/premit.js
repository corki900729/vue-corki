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
            next();
        }
        console.log('存在');
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){//当前路由在白名单内
            console.log(111);

            next();
        }else{

            next("./login");
        }
    }
  })
  