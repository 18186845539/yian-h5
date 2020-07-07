<template>
  <div class="dashboard-container">
    <div style="display: flex;justify-content: space-around;align-items: center;margin-top:100px">
      <div>
        <img src="@/assets/logo.png" alt>
        <p style="font-size: 36px;">谊安微信售后平台后台管理系统</p>
      </div>

      <div>
        <img src="@/assets/homeImg.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
