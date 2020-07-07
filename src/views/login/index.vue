<template>
  <div class="login-container">
    <!-- <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">谊安微信客户服务中心</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >谊安微信售后平台后台管理系统</el-button>
    </el-form>-->

    <!-- <div>
      <img src="@/assets/homeImg.png" style="margin: 0 auto;
    display: block;" alt />
      <div
        @click="shuaxin"
        style="color:#fff;display: block;
    text-align: center;"
      >谊安微信售后平台后台管理系统</div>
    </div>-->

    <!-- <el-button
      :loading="loading"
      type="primary"
      @click="handleLogin"
      style="width:100%;margin-bottom:30px;"
    >谊安微信售后平台后台管理系统</el-button>-->
  </div>
</template>

<script>
// 根据token获得用户信息
import { getInfoByToken } from "@/api/login";

import { validUsername } from "@/utils/validate";

import Cookies from "js-cookie";

//获取  token  设置token
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      customer_token: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    var adrrs = window.location.href;
    var obj = {};
    function getHttp() {
      var num = adrrs.indexOf("?") + 1;
      var attribute = adrrs.slice(num);
      attribute = attribute.split("&");
      for (var i = 0; i < attribute.length; i++) {
        attribute[i] = attribute[i].split("=");
        obj[attribute[i][0]] = attribute[i][1];
      }
    }
    getHttp();
    obj.customer_token = obj.customer_token.slice(
      0,
      obj.customer_token.indexOf("#")
    );
    obj.customer_token = '123456789kkkk'
    if (obj.customer_token) {
      let data = {
        adminName: "熊茂",
        roles: [
          {
            code: "ADMIN",
            createTime: 1510909019000,
            enable: true,
            name: "管理员",
            updateTime: 1510909019000,
            id: 1,
            status: 1
          },
          {
            creator: 2,
            code: "WXSHGLY",
            createTime: 1566288882000,
            enable: true,
            descipt: "",
            name: "微信售后管理员",
            updateTime: 1566288882000,
            id: 71,
            status: 1
          },
          {
            creator: 2,
            code: "CJGLY",
            createTime: 1567423556000,
            enable: false,
            descipt: "最高权限",
            name: "超级管理员",
            updateTime: 1567423556000,
            id: 86,
            status: 1
          }
        ],
        adminId: 215,
        permission: [
          "news:back/selectCommentByNewsId",
          "banner:back/addBanner_2",
          "role:get/roles",
          "user:put/users/password",
          "user:get/users/current",
          "order:back/selectOrderRefundAndItemBy",
          "order:back/selectSendOrdersDe",
          "yian:post/yianService/getUrl",
          "systemdic:back/deleteSysDicByBrandCompanys",
          "systemdic:back/updateSysDicByBrandCompany",
          "user:get/users/{id}/roles",
          "productline:back/addProductLine2",
          "role:post/roles",
          "order:back/updateOrdersLogisticsByExcel",
          "systemdic:back/updateSysDicByBreath",
          "product:back/product/list",
          "yakf:service/pjgl",
          "yakf:datastatistics/yhsx",
          "role:get/roles/{id}/permissions",
          "log:back/deleteSysLogs",
          "banner:back/updateBanner_1",
          "yakf:service/pdlb",
          "log:back/deleteSysLog",
          "permission:get/permissions",
          " banner:back/updateBanner_2",
          "order:back/selectOrderPayInfoAll",
          "role:get/findAllRoles",
          "productType:back/productType/list",
          "order:back/selectOrderInvoice",
          "order:back/selectReturnOrderAndItemBy",
          "menu:post/menus",
          "menu:get/menus/{roleId}/menus",
          "order:back/selectOrderRefundAndItemDe",
          "systemdic:back/selectSysDicByBreath",
          "website:back/deleteWebsites",
          "systemdic:back/deleteSysDicByBreaths",
          "permission:delete/permissions/{id}",
          "yakf:productorder/pxjl",
          "yakf:datastatistics/cpx",
          "user-consulting:back/deleteConsultingByUserId",
          "news:back/selectNewsAttachmentByNewsId",
          "systemdic:back/deleteSysDicByBrand",
          "yakf:datastatistics/ygjd",
          "smstamplate:save",
          "comment:back/deleteProductCommment",
          "productline:back/deleteProductLine2",
          "yakf:log/yjfk",
          "website:back/selectWebSiteAll",
          "department:update",
          "comment:back/selectCommentAndPicsBy",
          "systemdic:back/addSysDicByBrandCompany",
          "user:get/users/updateEnabled",
          "news:back/addNews",
          "newsforum:review",
          "productline:back/deleteProductLine",
          "yakf:user/user1",
          "systemdic:back/addSysDicByBreath",
          "yakf:user/user2",
          "yakf:user/user3",
          "express:back/selectOrderStatusByOrder",
          "menu:delete/menus/{id}",
          "banner:back/deleteBanners_1",
          "order:mall/order/mall/queryExpress",
          "banner:back/deleteBanners_2",
          "user:delete",
          "smstamplate:tamplatelist",
          "order:back/updateReturnOrderFirst",
          "yakf:service/cpda",
          "order:back/selectOrdersBy",
          "news:back/deleteCommentByPrimaryKeys",
          "news:back/selectNewsSimpleBack",
          "productType:back/productType/deleteProductTypeIds",
          "order:back/updateOrderRefund",
          "product:back/updateProduct",
          "user:post/users/exportUser",
          "news:back/deleteNewsMore",
          "systemdic:back/selectSysDicByBrand",
          "newsforum:selectforuminfo",
          "user-consulting:back/selectConsultingAndUserBean",
          "user:get/users",
          "smstamplate:update",
          "news:back/selectNewsByCondition",
          "order:back/updateOrdersLogistics",
          "yakf:service/khbxd",
          "cuser:list",
          "user:post/users/{id}/resetPassword",
          "order:back/selectReturnOrderAndItemDe",
          "user-consulting:back/deleteConsultingByIds",
          "yakf:service/wxjnzy",
          "newsforum:selectforumlist",
          "menu:grantedToMenu",
          "newsforumcomment:delete",
          "order:back/selectOrderPayInfoByCondition",
          "comment:back/updateCommmentStatus",
          "role:put/roles",
          "menu:get/menus/tree",
          "menu:get/menus/all",
          "news:back/updateNews",
          "newsforum:add",
          "news:back/deleteCommentByPrimaryKey",
          "yakf:productorder/zxjl",
          "order:back/selectSendOrders",
          "news:back/deleteNewsSingle",
          "productType:back/productType/addProductType",
          "product:back/selectProductInfoById",
          "user-consulting:back/selectConsultingByUserId",
          "menu:get/menus/findAlls",
          "news:back/updateNewsDisplay",
          "sms:messageExcelRead",
          "permission:put/permissions",
          "systemdic:back/updateSysDicByBrand",
          "user-consulting:back/addConsulting",
          "permission:get/permissions/findAuthByMenu",
          "systemdic:back/selectSysDicByBrandCompany",
          "user-message:back/deleteMessageByIds",
          "department:save",
          "order:back/selectOrderRefundAndItem",
          "systemdic:back/deleteSysDicByBrands",
          "user-consulting:back/deleteConsultingById",
          "smstamplate:delete",
          "productline:back/updateProductLine2",
          "comment:back/updateProductCommment",
          "order:back/order/verifyBankVoucvhers",
          "productType:back/productType/deleteProductTypeId",
          "order:back/selectOrdersExcel",
          "yakf:productorder/wxjl",
          "systemdic:back/addSysDicByBrand ",
          "user:post/users/save",
          "log:back/selectSysLogs",
          "productline:back/addProductLine",
          "news:back/updateNewsFirst",
          "express:back/selectExpressAll",
          "newsforumcomment:review",
          "order:back/selectReturnOrderAndItem",
          "systemdic:back/deleteSysDicByBrandCompany",
          "menu:post/menus/granted",
          "newsforum:update",
          "news:back/selectNewsAll",
          "yakf:service/wxkfzy",
          "role:roles/delroles",
          "website:back/addWebsite",
          "website:back/updateWebsite",
          "user:post/users/update",
          "log:back/selectSysLogsBy",
          "cuser:deleteUsers",
          "productline:back/selectProductLineAll",
          "yakf:service/khgl",
          "newsforumcomment:select",
          "yakf:log/czrz",
          "order:back/selectSendOrdersBy",
          "yakf:productorder/hfjl",
          "order:back/selectOrders",
          "comment:back/selectCommentAndPics",
          "user-message:back/selectMessageAll",
          " banner:back/addBanner_1",
          "productType:back/productType/updateProductType",
          "sms:smslist",
          "yakf:service/cpxx",
          "productline:back/updateProductLine",
          "banner:back/selectBannerByType_2",
          "banner:back/selectBannerByType_1",
          "user-message:back/selectMessageByCondition",
          "user-message:back/deleteMessageById",
          "comment:back/addProductCommment",
          "yakf:service/ygbxd",
          "yakf:datastatistics/gzypj",
          "user:post/users/getUserInfo",
          "systemdic:back/deleteSysDicByBreath",
          "permission:post/permissions",
          "department:list",
          "department:delete",
          "yakf:service/wxfwtp",
          "order:back/order/exportToBeShipped",
          "product:back/addProduct",
          "newsforum:delete",
          "banner:back/deleteBanner_1",
          "user-department/findDepartmentListEnabled",
          "banner:back/deleteBanner_2",
          "user:departmentlist",
          "user-consulting:back/deleteConsultingByUserIds",
          "sms:sendmessagegroup"
        ],
        userName: "xiongmao"
      };

      sessionStorage.setItem("userinfo", JSON.stringify(data));

      getInfoByToken(obj.customer_token).then(res => {
        let userinfo = JSON.stringify(res.data);
        // userinfo.token = obj.customer_token;
        // // 存储用户信息
        // sessionStorage.setItem("userinfo", userinfo);

        this.$store
          .dispatch("user/login", obj.customer_token)
          .then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || "/" });
          })
          .catch(() => {
            this.loading = false;
          });
      });
    } else {
      // 宝哥代码
      // this.$store
      //   .dispatch("user/login", "123456789kkkk")
      //   .then(() => {
      //     this.loading = false;
      //     this.$router.push({ path: this.redirect || "/" });
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
    }
  },
  methods: {
    shuaxin() {
      window.location.href =
        // "http://39.100.124.168:9998/#/login?access_token=b7089ad0-4241-4d39-967f-e696cda282fd&customer_token=da45871f1d8044049c22bb34f8e9d701";
        // "http://192.168.133.163:9528/#/login?access_token=b7089ad0-4241-4d39-967f-e696cda282fd&customer_token=5ebc5b100ee3441d811a902ee2a093c0";
        //"http://localhost:9528/#/login?access_token=b9e5363e-134a-4d3e-b1a3-1d9769c0aedf&customer_token=5fed942e3780486eaa3aef9947beab02";
        //  "http://172.14.10.51:9528/#/login?access_token=3a24d2f9-b6c2-4afa-a48f-b7e7d0d8d870&customer_token=cf7d8af6aff54511a8469ed50bfa7ff1"
        //白玲正式"http://localhost:9528/#/login?access_token=e10797c0-e0d0-40d6-809d-acc344275984&customer_token=7ecdaa178a3b4309acddd94bfb97f16b";
               "http://localhost:9528/#/login?access_token=c97572ba-14d3-4444-97f8-2f5e75505874&customer_token=60c1929641c043a79bb190266a6ff611";
         // window.location.href = "http://192.168.133.163:9528/#/";
      window.location.reload();
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // commit('SET_TOKEN', "123456789kkkk")
          //   setToken("123456789kkkk");
          // this.$router.push({ path: this.redirect || "/" });
          // 我写的测试代码
          // let searchURL = window.location.href;
          // let tokenData = searchURL.slice(searchURL.indexOf("?") + 1);
          // if (tokenData.indexOf("token") == -1) {
          //   this.loading = false;
          //   this.$message.error("您还未登录！");
          //   window.location.href = "http://www.baidu.com";
          //   return;
          // } else {
          //   let token = tokenData.slice(tokenData.indexOf("=") + 1);
          //   getInfoByToken(token).then(res => {
          //     let userinfo = res.data;
          //     userinfo.token = token;
          //     // 存储用户信息
          //     sessionStorage.setItem("userinfo", userinfo);

          //     this.$store
          //       .dispatch("user/login", token)
          //       .then(() => {
          //         this.loading = false;
          //         this.$router.push({ path: this.redirect || "/" });
          //       })
          //       .catch(() => {
          //         this.loading = false;
          //       });
          //   });
          // }
          if (
            this.loginForm.username == "admin" &&
            this.loginForm.password == "123456"
          ) {
            // // 宝哥代码
            // this.$store
            //   .dispatch("user/login", "123456789kkkk")
            //   .then(() => {
            //     this.loading = false;
            //     this.$router.push({ path: this.redirect || "/" });
            //   })
            //   .catch(() => {
            //     this.loading = false;
            //   });

            this.shuaxin();
          } else {
            this.$message.success("用户名或密码错误！");
            this.loading = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
