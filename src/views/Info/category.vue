<template>
    <div id="category">
        <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
        <hr style="margin-left:-30px; margin-right:-30px; margin-top:30px;margin-bottom:30px;" />
        <div>
            <el-row>
              <el-col :span="8">
                  <div class="category" v-for="firstItem in category.item" :key="firstItem.id" >
                      <!-- 一级分类 -->
                      <h4>
                          <i class="el-icon-circle-plus"></i>
                          {{ firstItem.category_name }} {{ firstItem.id }}
                          <div class="button-group">
                              <el-button size="mini" type="danger" round @click="editCategory({ data:firstItem, type: 'category_first_edit' })">编辑</el-button>
                              <el-button size="mini" type="success" round @click="handlerAddChildren({ data:firstItem, type: 'category_children_add' })">添加子集</el-button>
                              <el-button size="mini" type="danger" round @click="deleteCategoryComfirm(firstItem.id)">删除</el-button>
                          </div>
                      </h4>
                      <!-- 子级分类 -->
                      <ul v-if="firstItem.all_children">
                            <li v-for="childItem in firstItem.all_children" :key="childItem.id">{{ childItem.category_name }}                              
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round>编辑</el-button>
                                    <el-button size="mini" type="danger" round>删除</el-button>
                                </div>
                            </li>
                      </ul>
                  </div>
               
              </el-col>
              <el-col :span="16">
                  <h4 class="menu-title">
                      一级分类名称
                  </h4>
                <el-form label-width="142px" :model="form" class="from-wrap" ref="categoryFrom">
                    <el-form-item label="一级菜单名称" v-if="category_first_input">
                        <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="二级菜单名称" v-if="category_children_input">
                        <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" :loading="submit_button_loading" :disabled="submit_disabled">确定</el-button>
                    <el-button >重置</el-button>
                </el-form-item>
                </el-form>
              </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { AddFirstCategory, DeleteCategory, EditCategory, AddChildrenCategory } from "@/api/news";
import { common } from "@/api/common";
import { global } from "@/utils/global_vue3";
import { ref, reactive, onMounted, watch } from '@vue/composition-api';
export default {
    name: "infoCategory",
    setup(props, { root,refs }){
      const submit_button_type = ref('');//提交的类型  
        //global
        const {  confirm } = global();
        const { getInfoCategory, category:categoryItem } = common();
      const category_first_input = ref(true);
      const category_children_input=ref(true);
      const submit_button_loading = ref(false);
      const category_children_disabled=ref(true);
      const category_first_disabled=ref(true);
      const submit_disabled=ref(true);
      const delete_id =ref('');
      const form=reactive({
          categoryName: '',
          secCategoryName: '',
        })

    const category = reactive({
        item: [],
        current: []
    });    
    /**
     * method
     */
    const submit = () => {
        if(submit_button_type.value == 'category_first_add'){
            addFirstCategory();
        }
        if(submit_button_type.value == 'category_first_edit'){
            editFirstCategory();
        }
        if(submit_button_type.value == 'category_children_add'){
            addChildrenCategory();
        }

    }
    const addFirstCategory = () => {
        if(!form.categoryName){
            root.$message({
            message: "分类名称不能为空",
            type: "error"
        });    
        return false;       
        }        
        //按钮加载状态
        submit_button_loading.value = true;
        AddFirstCategory({ categoryName: form.categoryName }).then(response => {
            let data = response.data;
            
            if(data.status_code ===0 ){
                root.$message({
                    message: data.message,
                    type: "success"
                });
                category.item.push(data.data);
            }
        submit_button_loading.value = false;
        // refs['categoryFrom'].resetFields();
        form.categoryName = "";
        form.secCategoryName = "";
        }).catch(error => {
        submit_button_loading.value = false;
        // refs['categoryFrom'].resetFields();
         form.categoryName = "";
        form.secCategoryName = "";       
        })        
    }


    const addFirst = (params) => {
        submit_button_type.value = params.type
        category_first_input.value=true;
        category_children_input.value=false
        category_children_disabled.value=false;
        category_first_disabled.value=false;
        submit_disabled.value=false;
        console.log(submit_button_type.value)
    }
    const getCategory = () => {
        GetCategory({}).then(response => {
            let data = response.data.data;
            console.log(data);
            category.item = data;
        }).catch(error => {

        });
    }
    const handlerAddChildren = (params) => {
        //革面革心确定按钮类型
        submit_button_type.value = params.type;
        //存储数据
        category.current =params.data;
        category_first_disabled.value = true; //禁用一级输入框
        category_children_disabled.value = false; //启用子集输入框
        submit_disabled.value = false; //启用确定按钮
        category_children_input.value = true;   //显示子集输入框
        //显示一级分类文本
        form.categoryName = params.data.category_name;
    }
    const addChildrenCategory = () => {
        if(!form.secCategoryName){
            root.$message({
                message: '名称为空',
                error: 'error'
            })
            return false;
        }
        let requestData = {
            categoryName: form.secCategoryName,
            parent_id: category.current.id
        }
        AddChildrenCategory(requestData).then(response => {
            let responseData = response.data;
            root.$message({
                message: responseData.message,
                type: 'success'
            })
        getInfoCategory();
        //清空子集输入框内容
        form.secCategoryName = '';
        console.log(responseData)

        })
    }
    const deleteCategoryComfirm = (categoryId) => {
        // delete_id.value = categoryId;
        confirm({
            content: "确认删信息，确认后无法恢复",
            tip: "警告",
            catchFn:() => {
                root.$message('取消成功')
            },
            fn: deleteCategory,
            id: categoryId
        });   

    }
    const deleteCategory = (categoryId)=>{
        DeleteCategory({id: categoryId}).then(response => {
        //操作数组 splice  es6查找
        //splice("指定起始位置"，“num”，替换数据) 两个参数删除，三个参数替换
        // let index = category.item.findIndex(item => item.id == categoryId);
        // //删除数组制定元素
        // category.item.splice(index, 1);
        // console.log(index)
        let newDate = category.item.filter(item => item.id != categoryId);
        category.item = newDate;

        }).catch(error => {

        })
    }
    //编辑
    const editCategory = (params) => {
        submit_button_type.value = params.type;
        category_children_input.value = false;
        category_first_disabled.value = false;
        submit_disabled.value = false;
        //以及雷鸣
        console.log(submit_button_type.value);
        form.categoryName = params.data.category_name;
        //存储当前的数据对象
        category.current = params.data;
        console.log(category.current)
    }
    const editFirstCategory = () => {
        if(category.current.length === 0){
             root.$message({
                message: '未选择分类',
                type: "error"
            })  
            return false;         
        }
        let requestData = {
            id: category.current.id,
            category_name: form.categoryName
        }
        EditCategory(requestData).then(response => {
            let responseData = response.data;
            root.$message({
                message: response.data.message,
                type: "success"
            })
        category.current.category_name =     responseData.data.category_name;
        // let data = category.item.filter(item => item.id == category.current.id);
        // data[0].category_name = responseData.data.category_name;
        form.categoryName = '';
        category.current = [];
        // category.item = newDate;            
            console.log(response);
        }).catch(error=> {

        })
    }
    // 生命周期挂载完成后 dom对象挂载完成
    onMounted ( () => {
        getInfoCategory()
    })
    watch( ()=>categoryItem.item, (value) =>{
        category.item = value;
    } )
      return {
          form, category,
          submit, addFirst,category_children_disabled, category_first_disabled, submit_disabled, 
          category_first_input, category_children_input, submit_button_loading, deleteCategoryComfirm, deleteCategory, editCategory, addFirstCategory, editFirstCategory, handlerAddChildren
          , addChildrenCategory
      }  
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: aliceblue;   
}
.category {
    line-height: 44px;
    cursor: pointer;
    position: relative;
        &:before {
            content: "";
            position: absolute;    
            left: 0px;
            top: 22px;
            bottom: 0;
            width: 32px;
            border-left: 1px dotted #000;
        }
    h4 {
        position: relative;
        padding-left: 40px;
    }
    i {
        position: absolute;
        left: 15px;
        top: 15px;
        font-size: 17px;
        background-color: #fff;
    }
    li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li,h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {background-color: darkcyan;
        .button-group {
            display: block;
        }
        }
    }
}    
.button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button {
        font-size: 12px;
    }
}
.from-wrap{
    width: 410px;
    padding-top: 22px;
}
</style>