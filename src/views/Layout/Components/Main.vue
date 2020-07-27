<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
         
    </div>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
    name: 'laymain',
    setup(props, { root }){
        const str = ref("{name: '手把手露前端', title:'噜噜噜噜'}");
        return {
            str
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    height: 100vh;
    // position: fixed;
    // left: $nacMenu;
    // top: 75px;
    // right: 0;
    // bottom: 0;
    // border: 30px solid #f7f7f7;
    // border-bottom: none;
    // -webkit-box-sizing: border;
}
.main-content {
    width: 100%;
    height: 100%;
    padding-right: 30px;
    padding-top: $layoutHeader + 30;
    padding-left: $nacMenu + 30;
    box-sizing: border-box;
    @include webkit(box-sizing, border-box);
    @include webkit(transition, all .3s ease 0s);
}
.open {
    .main-content {
    padding-left: $nacMenu + 30;
    }
}
.close {
    .main-content {
    padding-left: $nacMenuMin + 30;
    }
}
.content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0;

    @include webkit(box-sizing, border-box);
    box-sizing: border-box;
    background-color: #fff;
}
</style>