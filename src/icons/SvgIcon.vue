<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:herf="iconName"> </use>
    </svg>
</template>
<script>
import { ref, computed } from '@vue/composition-api'
export default {
    name: "svgIcon",
    // props: [ "iconClass", "className" ],
    props:{
        iconClass: {
            type: String, //定义接受的值 number boolean array object date function symbol（是独一无二的值）es6
            default: "默认值", //基本数据类型-》直接复制  对象类型用函数赋值() => {}
            // required: true, //必填项
            // validator: (value) =>{
            //     return value >= 0;  //娇艳规则
            // }
        },
        className: {
            type: String, //定义接受的值 number boolean array object date function symbol（是独一无二的值）es6
            default: "默认值", //基本数据类型-》直接复制  对象类型用函数赋值() => {}
            // required: true, //必填项
            // validator: (value) =>{
            //     return value >= 0;  //娇艳规则
            // } 
        }
    },
    setup(props){

        const msg = ref("手把手路");
        //计算属性得出最终结果返回
        const iconName = computed(() => `#icon-${props.iconClass}`)
        const svgClass = computed(() =>  {
            if(props.className){
                return `svg-icon ${props.className}`;
            }else{
                return `svg-icon`;
            }
        })

        return {
            msg,
            svgClass,iconName
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: red;
    font-size: 20px;
}
</style>