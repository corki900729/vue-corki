import service from "@/utils/request";
/**
 * 列表
 */
export function GetList(data){
    return service.request({
        method: "post",
        url: "/news/getList",
        data
    })
}
 /**
  * 新增
  */
export function AddInfo(data){
    return service.request({
        method: "post",
        url: "/news/add",
        data
    })
}
  /**
   * 编辑
   */
export function EditInfo(data){
    return service.request({
        method: "post",
        url: "/news/editInfo",
        data
    })
}
   /**
    * 删除
    */
export function DeleteInfo(data){
    return service.request({
        method: "post",
        url: "/news/deleteInfo",
        data
    })
}   

/******一级分类添加 */
export function AddFirstCategory(data){
    return service.request({
        method: "post",
        url: "/news/addFirstCategory",
        data
    })
}
/**
 * 
 * @param {新增子集} data 
 */
export function AddChildrenCategory(data){
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}
/**
 * 获取分类
 */
export function GetCategory(data){
    return service.request({
        method: "post",
        url: "/news/getCategory",
        data
    })
}
/**
 * 
 */
export function DeleteCategory(data){
    return service.request({
        method: "post",
        url: "/news/delteCategory",
        data
    })
}
/**
 * 修改分类
 */
export function EditCategory(data){
    return service.request({
        method: "post",
        url: "/news/editCategory",
        data
    })
}