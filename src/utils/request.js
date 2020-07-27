import axios from "axios";
import { Message } from "element-ui";

//创建axios 副给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "/coeki" : "/devapi";
const service = axios.create({
  // baseURL: 'http://dcat.test/vueapi',
  // baseURL: 'http://api.dcat.test/api',
  baseURL: BASEURL,
  timeout: 5000,
});

// 添加请求拦截器
/**
 * 请求借口之前做一些数据处理（请求拦截起）
 */
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //后台需要前端这边穿的相关参数 token userid sui 业务需求 最终目的不是在请求头添加参数
    // config.headers['Tokey'] = getToken();
    // config.headers['UserName'] = getUserName();

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
/**
 *  请求借口后 返回数据进行拦截
 */
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;

    if (data.status_code !== 0) {
      Message.error(data.message);
      // MessageChannel.error(data.message);
      return Promise.reject(data); //.cache
    } else {
      return response;
      return Promise.resolve; //请求成功返回 .then
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么

    return Promise.reject(error);
  }
);

//让这个变量对外
export default service;
//使用 export default时，但不能存在多个default
//文件 import不需要{}
