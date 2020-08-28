<template>
    <div>
            a.vue组件 {{ test }}
            <B v-bind="$attrs" v-on="$listeners" />
    </div>
</template>
<script>
import { reactive } from '@vue/composition-api'
import B from "./b";
export default {
    components: { B },
    setup(props,  { attrs }){
        console.log(attrs)
        const test = reactive(attrs)

        return {
            test
        }
    }
}
</script>
<style lang="scss" scoped>

</style>