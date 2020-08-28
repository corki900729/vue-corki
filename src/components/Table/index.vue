<template>
<div>
    <el-table
        :data="data.tableData"
        border
        @selection-change="thatSelectCheckbox"
        style="width: 100%">
        <el-table-column
            v-if="data.tableConfig.selection"
            type="selection"
            width="55">
        </el-table-column>
        <template v-for="item in data.tableConfig.tHead">
            <!-- v-slot -->
            <el-table-column :key="item.field" v-if="item.columnType === 'slot'"   :prop="item.field"  :label="item.label">
                <template slot-scope="scope">
                    <slot :name="item.slotName" :data="scope.row"></slot>
                    <slot></slot>
                </template>
            </el-table-column>
            <!-- 文本数据渲染 -->
            <el-table-column v-else
                :prop="item.field"
                :key="item.field"
                :label="item.label"
            >
            </el-table-column>
        </template>    
    </el-table>   
    <div class="table-footer">
        <el-row>
          <el-col :span="4">
                <slot name="tableFooterLeft" ></slot>
          </el-col>
          <el-col :span="20">
                <el-pagination
                    class="pull-right"
                    v-if="data.tableConfig.pagination.show"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageData.currentPage"
                    :page-sizes="pageData.pageSizes"
                    :page-size="pageData.pageSize"
                    :layout="data.tableConfig.pagination.layout"
                    background
                    :total="pageData.total">
                </el-pagination>                  
          </el-col>
        </el-row>
    </div>

</div>
</template>
<script>
import { onUpdated, reactive, onBeforeMount, watch } from '@vue/composition-api'
import { loadData } from "./tableLoadData";
import { recordPage } from "./recordPage";
import { paginationHook } from "./paginationHook";
import tableLoadData from "@/mixins/tableLoadData";
export default {
    name: "tableVue",
    mixins: [tableLoadData],
    props: {
        config: {
            type: Object,
            default: ()=>{}
        },
        tableRow: {
            type: Object,
            default: ()=>{}
        }
    },
    setup( props, { root, emit, refs }){
       const { tableData, tableLoadData } = loadData( {root} );//加载数据
       const { pageData, handleSizeChange, handleCurrentChange, totalCount } = paginationHook( {root} );//页码
       const data = reactive({  
           tableConfig: {
               selection: true,
               recordCheckbox: false,
               tHead: [],
               requestData: {},
               pagination: {
                    show: true,
                    layout: "total, sizes, prev, pager, next, jumper"
                }
           },
           tableData: [

            ]
       })//初始化配置
       const initTableConfig = () =>{
           let configData = props.config;
           let keys = Object.keys(data.tableConfig);
           for(let key in configData){
               if(keys.includes(key)){ //includes 数组包含
                    data.tableConfig[key] = configData[key]
               }

           }
        //    console.log(props.config)
       }

        onBeforeMount( () => {
            initTableConfig();
            tableLoadData(data.tableConfig.requestData)
        })
//勾选checkbox时触发
        const thatSelectCheckbox = (val) => {
            let rowData = {
                idItem: val.map(item => item.id)
            }
            emit("update:tableRow", rowData);
        }
        //刷新数据
        const refreshData = () => {
            tableLoadData(data.tableConfig.requestData);
        }
        //带参数刷新
        const paramsLoadData = (params) => {
            let requestData = Object.assign({}, params, {
                pageNumber: 1,
                pageSize: 10
            })
            data.tableConfig.requestData.data = requestData;
            tableLoadData(data.tableConfig.requestData);
            console.log(data.tableConfig.requestData)
        }
        // watch( () => tableData.item, (newValue, oldValue) => data.tableData = newValue)
        //数据渲染
        watch( [
            () => tableData.item,
            () => tableData.total,
        ], ([tableData, total]) => {
            data.tableData = tableData;
            totalCount(total)
        })
        //页码监听
        watch([
            () => pageData.currentPage,
            () => pageData.pageSize
        ], ([currentPage, pageSize]) => {
            let requestData = data.tableConfig.requestData;
            if(requestData.data){
                requestData.data.pageNumber = currentPage;
                requestData.data.pageSize = pageSize;
                tableLoadData(data.tableConfig.requestData)
            }
            console.log(data.tableConfig.requestData)
            // console.log(pageSize)
        })
        // onMounted( () => {})
        // onBeforeUpdate( () => {})
        // onUpdated( () =>{})
        // onBeforDestory( () =>{})

        return {
            data, pageData, 
            handleSizeChange, handleCurrentChange, thatSelectCheckbox, refreshData, paramsLoadData
        }
    }
}
</script>
<style lang="scss" scoped>
.table-footer {
    padding: 15px;
}
</style>