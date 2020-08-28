import { GetCityPicker } from "@/api/common";
import { reactive, toRefs } from '@vue/composition-api';

export function cityPicker(){
    const data = reactive({
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: '',
        provinceData: [],
        cityData: [],
        areaData: [],
        streetData: []
    })   ; 
    const resultData = reactive({
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: '',
    })
        //获取省份
        const getProvince = () => {
            GetCityPicker({type: "province"}).then(response => {
                data.provinceData = response.data.data;
            });
        };
        //触发事件 选择省份获取城市
        const handlerProvince = (val) => {
            resetValue({type:'city'});
            GetCityPicker({type: "city",province_code: val}).then(response => {
                data.cityData = response.data.data;
            })           
        }
        /**
         * 选择城市 获取曲线
         */
        const handlerCity = (val) => {
            resetValue({type:'area'});
            GetCityPicker({type: "area",city_code: val}).then(response => {
                data.areaData = response.data.data;
            })        
        }
        //选择区县获取街道
        const handlerArea = (val) => {
            resetValue({type:'street'});
            GetCityPicker({type: "street",area_code: val}).then(response => {
                data.streetData = response.data.data;
            })        
        }  
        const handlerStreet = (val) => {
            resetValue({type:''});
        }          
        //重置选项
        const resetValue = (params) => {
            const valueJson = {
                city:['cityValue','areaValue','streetValue'],
                area:['areaValue','streetValue'],
                street:['streetValue'],
            }//清空指定的key
            if(valueJson[params.type]){
                valueJson[params.type].forEach(item => data[item] = '');
            }
            //数据集合采集
            result();
        }
        //返回数据集合
        const result = () => {
            for(let key in resultData){
                resultData[key] = data[key];
            }
        }
    return {
        ...toRefs(data),//todo 把对象类型转为基础数据类型。可结构响应
        getProvince, handlerProvince, handlerCity, handlerArea, handlerStreet, resultData
    }
}