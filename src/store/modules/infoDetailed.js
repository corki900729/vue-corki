const state = {//已经存储了值不刷新页面的时候一直存在，刷新页面后会去去session的值 赋值给变量
    id: "" || sessionStorage.getItem('infoId'),
    title: "" || sessionStorage.getItem('infoTitle')
}
const getters = {
    infoId: state =>state.id,
    infoTitle: state =>state.title
}
const mutations = {

    UPDATE_STATE_VALUE(state, params){
        for(let key in params){
            state[key] = params[key].value
            //是否存储session
            if(params[key].session){
                sessionStorage.setItem(params[key].sessionKey, params[key].value);
            }
        }
    },

    // SET_ID(state, value){
    //     state.id = value;

    //     sessionStorage.setItem('infoId', JSON.stringify(value));//h5本地存储
    // },
    // SET_TITLE(state, value){
    //     state.title = value;
    //     sessionStorage.setItem('infoTitle', JSON.stringify(value));//h5本地存储
    // }
}
const actions= {//可以回调处理hi事情

}
  
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};