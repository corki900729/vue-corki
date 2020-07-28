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
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                    <el-button type="danger">搜索</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger" class="pull-right" @click="dialog_info=true">新增</el-button>
                </el-col>
            </el-row>

        </el-form>
 <div class="black-space-30"></div>
        <!-- 表哥 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题" ></el-table-column>
                <el-table-column prop="category" label="类别" ></el-table-column>
                <el-table-column prop="date" label="日期" ></el-table-column>   
                <el-table-column prop="user" label="管理员"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
                        <el-button type="success" size="mini" @click="dialog_info=true">编辑</el-button>
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
                        :total="1000">
                    </el-pagination>
                </el-col>
            </el-row>

        <DialogInfo :flag.sync="dialog_info" @close="closeDialog" />

    </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { reactive, ref, watch } from '@vue/composition-api'
import { global } from "@/utils/global_vue3"
export default {
    name: "infoIndex",
    components: { DialogInfo },
    setup(props, { root }){
        const {  confirm } = global();
        // watch (() => console.log(str.value))
        /** 信息弹窗 */
        const dialog_info = ref(false);
        const search_key = ref("id");  
        const category_value = ref("");
        const data_value = ref("");
        const search_keywork = ref("")
        const options = reactive([{
                value: 1,
                label: '国际信息'
                }, {
                value: 2,
                label: '国内信息'
                }, {
                value: 3,
                label: '行业信息'
                }]) 

                //搜索关键字
    const searchOption  = reactive([
        { value: "id", label:"ID" },
        { value: "title", label:"标题" },
    ])      
    const tableData= reactive([
                {
                    title: "似懂非懂舒服的沙发上对方",
                    category: "国内信息",
                    date: '2016-05-02',
                    user: '王小虎',
                },
                {
                    title: "似懂非懂舒服的沙发上对方",
                    category: "国内信息",
                    date: '2016-05-02',
                    user: '王小虎',
                },
                 {
                    title: "似懂非懂舒服的沙发上对方",
                    category: "国内信息",
                    date: '2016-05-02',
                    user: '王小虎',
                },
                {
                    title: "似懂非懂舒服的沙发上对方",
                    category: "国内信息",
                    date: '2016-05-02',
                    user: '王小虎',
                },                              
        ])   

    
/** ***********方法 */

        const handleSizeChange = (val) => {
            console.log(val);
        }
        const handleCurrentChange = (val) => {
            console.log(val)
        }
        const closeDialog = () => {  //逻辑性的事情
            dialog_info.value = false;
        }
        const deleteItem= ()=> {
            confirm({
                content: "确认删除档期那信息，确认后无法恢复",
                tip: "警告",
                fn: confirmDelete,
                id: 3
            });
            // root.confirm({
            //     content: "确认删除档期那信息，确认后无法恢复",
            //     tip: "警告",
            //     fn: confirmDelete,
            //     id: 3
            // });
        }
        const deleteAll= ()=> {
            confirm({
                content: "确认删信息，确认后无法恢复",
                tip: "警告",
                fn: confirmDelete,
                id: 2
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
                console.log(value)
        }
        return {
            options,category_value,data_value,searchOption,search_key,search_keywork,tableData,dialog_info,
            handleSizeChange,handleCurrentChange,closeDialog, deleteItem, deleteAll
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