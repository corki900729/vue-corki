import { GetCategory, DeleteCategory, EditCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from "@/utils/request";

export function common(){
    const category = reactive({
        item: []
    });
    //获取分类
    const getInfoCategory = () =>{
        GetCategory({}).then( response => {
            console.log(response);
            category.item = response.data.data;
        }).catch(error => {

        })
    }
    return {
        getInfoCategory,
        category
    }
}
/**
 * 获取七牛云token
 */
export function QiNiuToken(data){
    return service.request({
        method: "post",
        url: "/uploadIngToken",
        data
    })
}