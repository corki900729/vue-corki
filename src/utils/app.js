import cookie from "js-cookie";

const adminToken = "admin_token";
export function getToken(){
    return cookie.get(adminToken);
}
export function setToken(token){
    return cookie.set(adminToken, token);
}
export function removeToken(){
    return cookie.remove(adminToken);
}
export function setUsername(username){
    return cookie.set("username", username);
}
export function getUsername(){
    return cookie.get("username");
}
export function removeUsername(){
    return cookie.remove("username");
}