import { getUserRoles } from "@/api/login";
import { defaultRouterMap, asnycRouterMap } from "@/router";
function hasPremission(role, router){
    if(router.meta && router.meta.system){
       return role.some(item => router.meta.system.indexOf(item) >= 0)
    }
    console.log(role)
    console.log(router.meta.system)
}
const state = {
    roles: [],
    addRouters: [],
    allRouters: defaultRouterMap
}
const getters = {
    roles: state => state.roles,
    addRouters: state => state.addRouters,
    allRouters: state => state.allRouters,
}
const mutations = {
    SET_ROLES(state, value){
        state.roles = value;
        // console.log(state)
    },
    SET_ROUTER(state, value) {
        state.addRouters = value;
        state.allRouters = defaultRouterMap.concat(value);
    }
}
const actions = {
    /**
     * 获取用户角色
     * @param {*} param0 
     * @param {*} requestData 
     */
    getRoles({ commit }, requestData){
        return new Promise( (resolve, reject) => {
            getUserRoles().then(response => {
                let roles = response.data.data;
                commit('SET_ROLES',roles);
                resolve(roles);
                // console.log(response)
            })
        })
    },
    /**
     * 创建动态路由
     */
    createRouter({commit}, data){
        return new Promise( (resolve, reject) => {
            let role = data;
            let addRouters = [];
            if(role.includes('admin')){ //超管
                addRouters = asnycRouterMap;

            }else{//普通管理员
                addRouters = asnycRouterMap.filter( item => {
                    // console.log(item)
                    //es6 includes 匹配数组中数据
                    // if(role.includes(item.meta.system)){
                    //     return item
                    // }
                    if(hasPremission(role, item)){
                        //优先判断
                        if(item.children && item.children.length>0){
                            item.children = item.children.filter(child => {
                                if(hasPremission(role, child)){
                                    return child
                                }
                            })
                        }
                        return item;
                    }
                })
                addRouters.push(asnycRouterMap[asnycRouterMap.length-1]);

            }
                commit("SET_ROUTER", addRouters);//更新路由
                resolve()
            // console.log(asnycRouterMap)
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