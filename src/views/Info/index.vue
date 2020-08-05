<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="4">  
                    <div class="label-wrap category">
                        <label for="">类型： </label>
                    <div class="warp-content">
                        <el-select v-model="category_value" placeholder="请选择" style="width: 120px">
                            <el-option
                            v-for="item in options.category"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>   
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="日期：">
                       <el-date-picker
                            v-model="data_value"
                            type="datetimerange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd HH:mm:ss">
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
                        </el-date-picker>
                    </el-form-item>  
                </el-col>

                <el-col :span="3">
                    <el-form-item label="关键字：">
                        <el-select v-model="search_key" style="width: 80px">
                          <el-option v-for="item in searchOption"
                           :key="item.value"
                           :value="item.value"
                           :label="item.label"
                           ></el-option>
                        </el-select>
                    </el-form-item>  

                </el-col>
                <el-col :span="4">
                    <el-input v-model="search_keywork" placeholder="请输入内容"></el-input>

                </el-col>
                <el-col :span="3">
                    <el-button type="danger" @click="search">搜索</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger" class="pull-right" @click="dialog_info=true">新增</el-button>
                </el-col>
            </el-row>

        </el-form>
 <div class="black-space-30"></div>
        <!-- 表哥 -->
            <el-table :data="tableData.item" border style="width: 100%" v-loading="loadingData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题" ></el-table-column>
                <el-table-column prop="category" label="类别" :formatter="toCategory"></el-table-column>
                <el-table-column prop="created_at" label="日期" :formatter="toData" ></el-table-column>   
                <el-table-column prop="user" label="管理员"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                        <el-button type="success" size="mini" @click="editInfo(scope.row.id)">编辑</el-button>
                        <el-button type="success" size="mini" @click="editInfo(scope.row.id)">编辑详情</el-button>
                    </template>
                </el-table-column>
            </el-table>     
            <div class="black-space-30"></div>
            <!-- //底部分页 -->
            <el-row>
                <el-col :span="12">
                    <el-button size="medium" type="danger" @click="deleteAll">批量删除</el-button>
                </el-col>
                <el-col :span="12" >
                    <el-pagination 
                        class="pull-right"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, prev, pager, next, jumper, sizes"
                        :total="total" >
                    </el-pagination>
                </el-col>
            </el-row>

        <DialogInfo :flag.sync="dialog_info" @close="closeDialog"  :category="options.category" />
        <!-- 修改弹窗 -->
        <DialogEditInfo :flag.sync="dialog_info_edit" :id="infoId" @close="closeDialog"  :category="options.category" @getListEmit="getList" />

    </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { GetCategory, GetList, DeleteInfo } from "@/api/news";
import { common } from "@/api/common";
import { reactive, ref, watch, onMounted } from '@vue/composition-api'
import { global } from "@/utils/global_vue3";
import { timestampToTime } from "@/utils/common";
export default {
    name: "infoIndex",
    components: { DialogInfo, DialogEditInfo },
    setup(props, { root }){
        const {  confirm } = global();
        const { getInfoCategory, category } = common();
        // watch (() => console.log(str.value))
        /** 信息弹窗 */
        const dialog_info = ref(false);
        const dialog_info_edit = ref(false);
        const search_key = ref("id");  
        const category_value = ref("");
        const data_value = ref("");
        const search_keywork = ref("")
        const total = ref(0);
        const loadingData = ref(true);
        const deleteInfoId = ref('');
        const infoId = ref('');
        const options = reactive({
            category: []
        }) 

                //搜索关键字
    const searchOption  = reactive([
        { value: "id", label:"ID" },
        { value: "title", label:"标题" },
    ])      
    const tableData= reactive({
        item: []
    })   
    //页码
    const page = reactive({
        pageNumber: 1,
        pageSize:10
    })
/** ***********方法 */
        const handleSizeChange = (val) => {
            page.pageSize = val;
        }
        const handleCurrentChange = (val) => {
            page.pageNumber = val;
            getList();
        }
        const closeDialog = () => {  //逻辑性的事情
            dialog_info.value = false;
        }
        //搜索条件处理
        const formatData = ()=>{
            let requestData = {
                    pageNumber: page.pageNumber,
                    pageSize: page.pageSize                
            };

            if(category_value.value) { requestData.categoryId = category_value.value }        //分类id
            if(data_value.value.length > 0){
                requestData.startTime = data_value.value[0];
                requestData.endTime = data_value.value[1];
            }   
            //关键字
            if(search_keywork.value) { requestData[search_key.value] = search_keywork.value; }
            
            return requestData;
        }
        const editInfo = (id) => {
            console.log(id);
            infoId.value = id;
            dialog_info_edit.value = true;

        }
        const getList = () => {
            let requestData = formatData();
            loadingData.value = true;
            GetList(requestData).then( response => {
                let data = response.data.data;
                tableData.item = data.data
                //更新页码
                total.value = data.total;
                loadingData.value=false; //加载状态
            }).catch( error =>{
                loadingData.value=false;
            })
        }
        const deleteItem= (id)=> {
            deleteInfoId.value = [id];
            confirm({
                content: "确认删除档期那信息，确认后无法恢复",
                tip: "警告",
                fn: confirmDelete,
            });
            // root.confirm({
            //     content: "确认删除档期那信息，确认后无法恢复",
            //     tip: "警告",
            //     fn: confirmDelete,
            //     id: 3
            // });
        }
        const deleteAll= ()=> {
            if(!deleteInfoId.value || deleteInfoId.value.length == 0){
                root.$message({
                    message: "请选择要删除的数据",
                    type: 'error'
                })
                return false;
            }
            confirm({
                content: "确认删信息，确认后无法恢复",
                tip: "警告",
                fn: confirmDelete,
            });           
            // root.aaa();//vue2.0 this.aaa()
            // root.confirm({
            //      content: "确认所有信息，确认后无法恢复",
            //      type: "success",
            //      fn: confirmDelete,
            //      id: 2
            // });
        }
        const confirmDelete = (value) => {
            DeleteInfo({id: deleteInfoId.value}).then( response => {
                console.log(response);
                deleteInfoId.value = '';
                root.$message({
                    message: response.data.message,
                    type: 'success'
                })
                getList();
            })
                console.log(value)
        }
        const handleSelectionChange = (val) => {
            let id = val.map(item => item.id);
            deleteInfoId.value = id;
            console.log(deleteInfoId.value)

        }
        // const getCategory = () => {  提取到公共方法
        //     console.log(33)
        //     GetCategory({}).then(response => {
        //         let data = response.data.data;
        //         options.category = data;
        //         console.log(data);
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // }    
        const toData = (row, column, cellValue, index) => {
            // return timestampToTime(row.created_at);
            return timestampToTime(Date.parse(new Date())/1000);
        }//调用一个函数，返回新的值，替换原始值
        const toCategory = (row) => {
            let categoryId = row.category;
            let categoryName = options.category.filter( item => item.id == categoryId)[0]['category_name']
            return categoryName;
        }
        const search = () => {
            // console.log(category_value.value);
            // console.log(data_value.value);
            // console.log(search_key.value);
            // console.log(search_keywork.value);
            let requestData = formatData();
            getList();
        }
//生命周期
        onMounted(() => {
            //vue3.0
            // getInfoCategory();
            //vuex
            console.log(options.category)
            root.$store.dispatch("common/getInfoCategory").then(response => {
                 options.category = response.data.data;
                // console.log(response);
            })
            getList();
        })
        //监听
        // watch( () => category.item, (value) => {
        //     options.category = value;
        // })
        return {
            options,category_value,data_value,searchOption,search_key,search_keywork,tableData,dialog_info, total,loadingData,dialog_info_edit, infoId,
            handleSizeChange,handleCurrentChange,closeDialog, deleteItem, deleteAll, toData, toCategory, handleSelectionChange, search, editInfo, getList
            

        }

    }
    
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
    .label-wrap {
        &.category { @include labelDom(left, 60, 40);}

    }   
</style>