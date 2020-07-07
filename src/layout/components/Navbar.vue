<template>
  <div class="navbar">
    <!-- 左侧菜单开关 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <!-- 右侧用户信息 -->
    <div class="right-menu">
      <span style="font-size:18px;margin-right:10px;cursor:pointer;" @click="logout">
        <el-tooltip class="item" effect="dark" content="退出登录" placement="left">
          <i class="el-icon-sold-out"></i>
        </el-tooltip>
      </span>

      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="logo" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import logoUrl from "@/assets/logo.png";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      activeIndex: "1",
      logo: logoUrl
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },

    // 我写的测试代码
    // logout() {
    //   // 删除session中的token
    //   sessionStorage.clear();
    //   // 跳转到登录页
    //   this.$router.push({ name: "Login" });
    //   // 提示
    //   this.$message.success("退出成功");
    // },

    // 宝哥代码
    // async logout() {
    // await this.$store.dispatch("user/logout");
    // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    logout() {
      sessionStorage.clear();
      removeToken();
      // window.open(" ", "_self");

      window.location.href = "http://39.105.157.251:8067/";
       // window.location.href = "http://124.207.242.89:8067/";

      // window.close();
    },

    topMenuSelect() {
      this.$store.dispatch("topmenu/changeTopMenu", {
        name: "",
        group: ""
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }

  .hamburger-container {
    line-height: 46px;
    // height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
