import { GetCategory, DeleteCategory, EditCategory } from "@/api/news";
const state = {
    qiniuUrl: 'http:://www.baidu.com'
}
const getters = {
    qiniuUrl: state => state.qiniuUrl
}
const actions= {//可以回调处理hi事情
        getInfoCategory(content, requestData) {
            return new Promise( (resolve, reject) => {
                GetCategory({}).then( (response) => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            } )
        }
    }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions
  };