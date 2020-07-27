<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><i class="el-icon-document-remove"></i></div>
        <div class="pull-right ">
            <div class="user-info pull-left">
                {{username}}
            </div>
            <div class="header-icon pull-right" @click="exit"><i class="el-icon-document-remove"></i></div>    
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api';
export default {
    name: "layoutHeafer",
    setup(props, { root }){
        const username = computed( () => root.$store.state.app.username );
        const navMenuState = () => {
            // root.$store.dispatch('setMenuStatus',{"name": "aaa"});
            root.$store.commit("app/SET_COLLAPSE");
        }
        //退出
        const exit = () => {
            root.$store.dispatch("app/exit").then(() => {
                root.$router.push({ 
                   name: "Login"
                })
            })
        }
        return {
            navMenuState,
            username,
            exit
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $nacMenu;
    height: 75px;
    background-color: #fff;
    @include webkit(box-shadow, 0px 3px 16px 0px rgba(0, 0, 0, .1));
    line-height: 75px;
      @include webkit(transition, all .3s ease 0s);
}
.open {
    #header-wrap { left: $nacMenu; 
    
    }
} 
.close {
    #header-wrap { left: $nacMenuMin; }
} 
.header-icon {
    padding: 0 32px;
    i {
        margin-bottom: -8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.user-info {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon {
        padding: 0 28px;
    }
}

</style>