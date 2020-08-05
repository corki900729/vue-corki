<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
import LayoutMain from "./Components/Main";
import LayoutHeader from "./Components/Header";
import LayoutNav from "./Components/Nav";
import { computed } from '@vue/composition-api';
export default {
    name: "layout",
    components: { LayoutMain,LayoutHeader, LayoutNav },
    setup(props, { root }){
        const menuStatus = computed( () => root.$store.state.isCollapse)

    return{
        menuStatus,
    }
    }
}
</script>
<style lang="scss" scoped>

</style>