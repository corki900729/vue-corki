<template>
    <div>
            bvue组件 孙子组件 ----》 {{ tests }}
            <el-button @click="backcall">调用index.vue的方法</el-button>
    </div>
</template>
<script>
import { reactive, inject } from '@vue/composition-api'
export default {
    setup(props,  { attrs, emit }){
        console.log(attrs)
        const tests = reactive(attrs)
        const aaaa = inject("customval")
        console.log(aaaa)
        const backcall = () => {
            emit("upaaa")
        }
        return {
            tests , backcall, aaaa
        }
    }
}
</script>
<style lang="scss" scoped>

</style>