import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms(){
    service.request({
        method: "post",
        url: "/getSms",
        data: {}
    })
}

/**
 * 获取用户角色
 */

 /**
  * 直接登陆
  */

  /**
   * 注册
   */