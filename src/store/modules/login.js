const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
}

const getters = {
  isCollapse: state => state.isCollapse
}

const mutations= {//必须的同步 没有回调处理事情
        SET_COLLAPSE(state){
console.log('login')
          state.isCollapse = !state.isCollapse;
            //html5 本地存储
          sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
          // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
        }
      }
const actions= {//可以回调处理hi事情
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
  }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};