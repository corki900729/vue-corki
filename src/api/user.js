import service from "@/utils/request";

export function GetRole(data={}){
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}
//添加用户
export function addUser(data){
    return service.request({
        method: 'post',
        url: '/user/add/',
        data
    })
}
//删除用户
export function UserDelete(data){
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}
/**
 *用户禁用 
 */
export function UserActives(data){
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}
/**
 * 
 * @param {*
 * 编辑
 * } data 
 */
export function UserEdit(data){
    return service.request({
        method: "post",
        url: "/user/edit",
        data
    })
}
/**
 * 按钮权限
 * @param {*} data 
 */
export function GetPermButton(data){
    return service.request({
        method: "post",
        url: "/permButton/",
        data
    })
}