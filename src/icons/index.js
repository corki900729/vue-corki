import Vue from "vue";
import SvgIcon from "./SvgIcon";

Vue.component("svg-icon", SvgIcon);

/**
 * require.context 读取制定母的的所有文件
 * 1指定目录，2、是否便利所有自己目录3，定义便利文件规则
 * 
 * 
 */
const req = require.context("./svg", false, /\.svg$/);
//es6 函数写法
const requireALL = ( requireContext ) => {
    // console.log(requireContext.keys().map(requireContext));
    return requireContext.keys().map(requireContext);
}
requireALL(req);