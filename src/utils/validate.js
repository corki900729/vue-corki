/**
 * 过滤特殊自负
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*%()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
        var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 验证邮箱
 */
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value);

}
/**
 * 验证密码 6-20字母加数字
 */
export function validatePass(value){
    let reg = /^(?!\D+$)(?![^A-Za-z+$])\S{6,20}$/ ;
    return !reg.test(value);

}
/**
 * 验证码
 */
export function validateVCode(value){
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value);
}
//没有使用 export default时，可以生命多个 export
//文件 import需要{}