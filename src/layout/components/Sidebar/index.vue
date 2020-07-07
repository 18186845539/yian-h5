<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: {
    SidebarItem,
    Logo
  },
  created() {
    let data = JSON.parse(sessionStorage.getItem("userinfo")).permission;
    let arr = [];
    //然后person的对象你可以用JSON.parse();
    //筛选出  权限
    for (let ls = 0; ls <= data.length - 1; ls++) {
      if (data[ls].indexOf("yakf:") != -1) {
        arr.push(data[ls]);
      }
    }
    //匹配已有权限
    for (let i = 0; i <= arr.length - 1; i++) {
      for (let m = 3; m <= 8; m++) {
        if (
          this.permission_routes[m].children != undefined &&
          this.permission_routes[m].children.length - 1 > 0
        ) {
          for (
            let x = 0;
            x <= this.permission_routes[m].children.length - 1;
            x++
          ) {
            if (
              this.permission_routes[m].children[x].meta.roles !== undefined
            ) {
              if (
                this.permission_routes[m].children[x].meta.roles
                  .requiresAuth === arr[i]
              ) {
                this.permission_routes[m].children[x].hidden = false;
              }
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar", "topmenu"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    topMenuSelect() {
      return this.topmenu.selectMenu;
    }
  }
};
</script>
