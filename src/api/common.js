import { GetCategory, DeleteCategory, EditCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";

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