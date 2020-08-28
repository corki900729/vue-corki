<template>
        <el-select v-model="data.selectValue" placeholder="请选择" @change="select">
            <el-option
                v-for="item in data.initOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
export default {
    name: "",
    props: {
        config: {
            type: Object,
            default: ()=>{}
        },
        selectData: {
            type: Object,
            default: ()=>{}
        }
    },
    setup(props, { root, emit }){
        const data = reactive({
            selectValue: "",
            initOption: [],
            option: [
                {value: "name", label: "姓名"},
                {value: "phone", label: "手机号"},
                {value: "email", label: "邮箱"},

            ]
        })
        //初始化下拉选项
        const initOption = () => {
            let initData = props.config.init;
            //数据校验
            if(initData.length === 0 ){
                return false;
            }
            let optionArr = [];
            initData.forEach(item => {
                let arr = data.option.filter(elem => elem.value == item); //filter匹配成功后是一个数组，需要取下表第一个
                optionArr.push(arr[0]);
            });
            data.initOption = optionArr;//初始化默认值
            //初始化搜索类型
            data.selectValue = optionArr[0].value
        }
        /**
         * 选择触发
         */
        const select = (val) => {
            let filterData = data.option.filter( item => item.value == val )
            console.log(filterData)
            emit("update:selectData",filterData[0])
        }
        onMounted( () => {
            initOption()
        })

        return {
            data,
            initOption, select
        }
    }  
}
</script>
<style lang="scss" scoped>
    
</style>