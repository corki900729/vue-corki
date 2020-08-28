<template>
    <div>
        <el-row >
            <el-col :span="20">
                <div class="label-wrap">
                    <label for="">关键字 :</label>

                    <div class="wrap-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <SelectVue :config="data.configOption"  :selectData.sync="data.selectData" />
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="data.key_word"  placeholder="请输入搜索内容" ></el-input>
                            </el-col>     
                            <el-col :span="10">
                                <el-button type="danger" @click="search">搜索</el-button>
                            </el-col>                    
                        </el-row>
                    </div>
                </div>                
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right" @click="data.dialog_add = true">新增用户</el-button>
            </el-col>
        </el-row>
        <div class="black-space-30"> </div>
        <el-button type="success" @click="busEvent()">触发</el-button>
            <TableVue :config="data.configTable" :tableRow.sync="data.tableRow" ref="userTable"> 
                <template v-slot:status="slotData">
                    <el-switch v-model="slotData.data.status"
                    @change="handleSwitch(slotData.data)"
                        active-color="#13ce66"
                        active-value="2"
                        inactive-value="1"
                        inactive-color="#ff4949">
                    </el-switch>
                        {{ slotData.data.status }}
                </template>
               <template v-slot:operation="slotData">
                   <el-button type="danger" size="small" @click="handleDel(slotData.data)" >删除</el-button>
                   <el-button type="success" size="small" @click="handleEdit(slotData.data)" >编辑</el-button>
                </template>      
               <template v-slot:tableFooterLeft>
                   <el-button size="small" @click="bathDel()" >批零删除</el-button>
                </template>  
            </TableVue>
              
            <DialogAdd :flag.sync="data.dialog_add" @refreshData="refreshData" :editData="data.editData" />
            <A  aaa='111' bbb='222' v-on:upaaa="busEvent" />
    </div>
</template>
<script>
import { reactive, provide } from '@vue/composition-api'
import { UserDelete, UserActives, UserEdit } from "@/api/user";
import { global } from "@/utils/global_vue3"
//select组件
import SelectVue from "@c/Select";
import TableVue from "@c/Table";
import DialogAdd from "./dialog/add";
//中央事件
import EventBus from "@/utils/bus";
import A from "./a";
export default {
    name: "userIndex",
    components: { SelectVue, TableVue, DialogAdd, A },
    setup(props,{ root, refs }){
        const busEvent = () =>{
            console.log(66666)
             EventBus.$emit('showFun',{aa:'2222'}) //调用中央组件
        }
        provide("customval","我是父组件的值")
        const { confirm } = global(); //引入全局的函数
        const data = reactive({
            updataStatus: false,   //delay一下借口访问速度
            editData: {},  //编辑传递当前数据到子组件
            dialog_add: false,
            selectData: {} ,
            key_word:'',  //搜索关键字
            configOption: {
                init: ["name", "phone"]
            },//table组件配置参数
            configTable: {
                selection: true, //多选框
                recordCheckbox: true,//多选框记录
                tHead: [ //表头
                    { label: "邮箱/用户名", field: "username" },
                    { label: "真实姓名", field: "truename" },
                    { label: "手机号", field: "phone" },
                    { label: "地区", field: "region" },
                    { label: "角色", field: "role" },
                    { label: "禁启用状态", field: "status", columnType: "slot", slotName: "status" },
                    { label: "操作", columnType: "slot", slotName: "operation" },
                ],
                requestData: {
                    url: "getUserList",
                    method: "post",
                    data: {
                        pageNumber: 1,
                        pageSize: 10
                    }
                },
                pagination: {
                    show: true,
                    layout: "total, sizes, prev, pager, next, jumper"
                },

            },//table 选择的数据
            tableRow: {
                    
            }
        })
        const search = () => {
            let requestData = {
                [data.selectData.value]: data.key_word
            }
            console.log(data.selectData)
            refs.userTable.paramsLoadData(requestData); //调用组件中的方法
        }
        const handleDel = (params) => {
            data.tableRow.idItem = [params.id];
            confirm({
                content: "确认当前信息五五后删除",
                tip: "警告",
                fn: UserDel
            })
                refs.userTable.refreshData()//调用table组件中的tableLoadData方法重新加载
        }
        const bathDel = ()=>{
            let userId = data.tableRow.idItem;
            if(!userId || userId.length===0){
                root.$message({
                    message: "请选择需要删除的用户",
                    type: 'error'
                })
                return false;
            }
            confirm({
                content: "确认当前信息五五后删除",
                tip: "警告",
                fn: UserDel
            })
        }
        const UserDel = ()=>{
            UserDelete({id:data.tableRow.idItem}).then(response => {
                console.log(refs.userTable);
                refs.userTable.refreshData()//调用table组件中的tableLoadData方法重新加载
            })    
        }
        const refreshData = ()=>{
            refs.userTable.refreshData();
        }
        const handleSwitch = (params) => {
            if(data.updataStatus){ return false}
            data.updataStatus = true;
            let requestData = {
                id: params.id,
                status: params.status
            }
            UserActives(requestData).then( response => {
                console.log(response.data.data);
                root.$message({
                    message: response.data.message,
                    type: 'success'
                })
                refreshData()
                data.updataStatus = !data.updataStatus
            }).catch( error => {
                data.updataStatus = !data.updataStatus
            })
            console.log(params);
        }
        const handleEdit = (params) => {
            data.dialog_add = true;
            //子组件复制
            data.editData = Object.assign({}, params)
        }
        return {
            data, 
            handleDel, bathDel, busEvent,refreshData, handleSwitch, handleEdit, search
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
    @include labelDom(left, 60, 40)
}    
</style>