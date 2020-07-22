import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms(data){
    return service.request({
        method: "post",
        url: "/getSms",
        data: data
        //data: data 左边的是后台接受的 右边的data是接受的参数，如果两个是同名的可以写成一个
    })
}

/**
 * 获取用户角色
 */
export function getUserRole( data = {}){
    return service.request({
        method: 'post',
        url: "/userRole",
        data
    })
}

 /**
  * 直接登陆
  */
 export function login(data){
    service.request({
        method: "post",
        url: "/login",
        data: data
        //data: data 左边的是后台接受的 右边的data是接受的参数，如果两个是同名的可以写成一个
    })
}

  /**
   * 注册
   */
  export function Register(data){
    return service.request({
        method: "post",
        url: "/register",
        data: data
        //data: data 左边的是后台接受的 右边的data是接受的参数，如果两个是同名的可以写成一个
    })
}
