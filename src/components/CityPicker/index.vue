<template>
        <el-row :gutter="10">
            <el-col :span="6" v-if="init.province">
                <el-select  placeholder="请选择" v-model="provinceValue" @change="handlerProvince">
                    <el-option v-for="item in provinceData" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.city">
                <el-select  placeholder="" v-model="cityValue" @change="handlerCity">
                    <el-option v-for="item in cityData" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.area">
                <el-select  placeholder="" v-model="areaValue" @change="handlerArea">
                    <el-option v-for="item in areaData" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.street">
                <el-select  placeholder="" v-model="streetValue" @change="handlerStreet">
                    <el-option v-for="item in streetData" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-col>                                                
        </el-row>  
</template>
<script>
import { cityPicker } from "@/mixins/cityPicker";
import { watch, onBeforeMount, reactive } from '@vue/composition-api';
export default {
    name: "cityPicker",
    props: {
        cityPickerData: {
            type: Object,
            default: () => {}
        },
        cityPickerLevel: {
            type: Array,
            default: () => []
        }
    },
    setup(props,{ root, emit }){
        //初始化省市区街联动
        const init =reactive({
            province: false,
            city: false,
            area: false,
            street: false,
        })//组件
        const { 
            provinceData,provinceValue, cityValue, areaValue, streetValue, cityData, areaData, streetData, resultData,
            handlerProvince, handlerCity, handlerArea, getProvince, handlerStreet
            } = cityPicker();
//初始化
        const initCityPicker = () => {
            let initData = props.cityPickerLevel;
            if(initData.length==0){
                init.forEach(item => {
                    init[item] = true
                });
            }else{
                initData.forEach(item => {
                    init[item] = true
                });
            }
        }
        watch( [
            () => resultData.provinceValue,
            () => resultData.cityValue,
            () => resultData.areaValue,
            () => resultData.streetValue,
        ], ([province,city, area,street])=>{
            emit("update:cityPickerData", resultData);
            // console.log(province)
            // console.log(city)
            // console.log(area)
            // console.log(street)
        })
        onBeforeMount( () => {
            initCityPicker();
            getProvince();
        } )
        return {
            provinceData,provinceValue, cityValue, areaValue, streetValue, cityData, areaData, streetData,resultData,init,
            handlerProvince, handlerCity, handlerArea, handlerStreet
        }
    }
}
</script>
<style lang="scss" scoped>

</style>