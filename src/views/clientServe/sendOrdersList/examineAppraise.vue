<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="服务评价" name="1">
          <div style="padding: 20px 50px">
            <div>
              <span>员工姓名：</span>
              <span>{{backfillData.name}}</span>
            </div>

            <div>
              <span>员工编号：</span>
              <span>{{backfillData.staffId}}</span>
            </div>

            <div>
              <span>响应速度：</span>
              <span>{{backfillData.repairSpeed}}</span>
            </div>

            <div>
              <span>维修结果：</span>
              <span>{{backfillData.repairResult}}</span>
            </div>

            <div>
              <span>服务态度：</span>
              <span>{{backfillData.serviceAttitude}}</span>
            </div>

            <div>
              <span>评价内容：</span>
              <span>{{backfillData.evaluate}}</span>
            </div>

            <div>
              <span>综合服务评价：</span>
              <el-button v-if="backfillData.evaluateType == 0" type="primary" size="mini" circle>优</el-button>
              <el-button v-if="backfillData.evaluateType == 1" type="warning" size="mini" circle>良</el-button>
              <el-button v-if="backfillData.evaluateType == 2" type="danger" size="mini" circle>差</el-button>
            </div>

            <div style="margin-top: 10px;">
              <el-button @click="returnBtn()" size="mini">返回</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 查看服务评价
import { queryServiceEvaluate } from "@/api/clientServe";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 回填数据
      backfillData: {}
    };
  },
  mounted() {
    // 获取回填数据
    this.getBackfillData();
  },
  methods: {
    // 获取回填数据
    getBackfillData() {
      let groupId = this.$route.query.sendData;
      // if (!sendData) {
      //   this.$router.push({
      //     name: "SendOrdersList"
      //   });
      //   return;
      // }
      let data = {
        groupId: groupId
      };
      queryServiceEvaluate(data).then(res => {
        this.backfillData = res.data;
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "SendOrdersList"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

