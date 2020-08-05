<template>
  <div id="nav-warp">
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu :key="item.id" :index="index + ''" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <svg-icon  iconClass="console" className="console" /> -->
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
 
  </div>
</template>
<script>
import { ref, reactive, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * data 数据
     */
    // const isCollapse = ref(true);
    const routers = reactive(root.$router.options.routes);
    /**
     *  computed 监听
     */
    const isCollapse = computed(() => root.$store.state.app.isCollapse )
    

    // root.$store.commit("SET_COUNT",100);
    return {
      isCollapse,
      routers,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    margin:28px auto 25px;
    width: 92px;
    @include webkit(transition, all .3s ease 0s)
  }
}
#nav-warp {
  position: fixed;
  top: 0;
  left: 0;
  width: $nacMenu;
  @include webkit(transition, all .3s ease 0s);
  height: 100vh;
  background: #344a5f;
}
.open {
  #nav-warp {
      width: $nacMenu;
  }
}
.close {
  #nav-warp {
      width: $nacMenuMin;
  }
  .logo img {
    width: 70%;
  }

}
</style>
