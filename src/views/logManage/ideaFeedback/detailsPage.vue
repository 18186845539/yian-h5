<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="医院/家庭客户详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">产品线：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.productLine | dicFilter(productLines)}}</el-col>

              <el-col :span="3" class="detailsTitle">型号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.model | dicFilter(models)}}</el-col>

              <el-col :span="3" class="detailsTitle">产品名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.product}}</el-col>

              <el-col :span="3" class="detailsTitle">医院名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.hospital}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.userName}}</el-col>

              <el-col :span="3" class="detailsTitle">电话：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.phone}}</el-col>

              <el-col :span="3" class="detailsTitle">反馈评价（星级）：</el-col>
              <el-col :span="3" class="detailsBodle">
                <el-rate v-model="detailsData.feedbackEvaluation" disabled text-color="#ff9900"></el-rate>
              </el-col>

              <el-col :span="3" class="detailsTitle">反馈时间：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.createDate}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">反馈详情：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.feedback}}</el-col>
            </el-row>
          </div>

          <div style="margin:20px;text-align: center;">
            <el-button @click="returnBtn()" size="small">返回</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 获取所有字典值
import { getAllDict } from "@/api/common";
// 根据id查询意见反馈详情
import { queryOpinionFeedById } from "@/api/logManage";

export default {
  // 过滤显示
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    }
  },

  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 所有客户类型
      hospitalTypes: [],
      // 所有性别
      sexs: [],
      // 所有科室
      departments: [],
      // 所有终端客户级别
      customerLevels: [],
      // 所有职务
      positions: [],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有省份
      provinces: [],
      // 所有城市
      citys: [],
      // 所有国家
      countrys: [],
      // 所有产品线
      productLines: [],
      // 所有型号
      models: [],

      // 详情数据
      detailsData: {}
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 回填数据
    this.backfillData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "HOSPITAL_TYPE,SEX,DEPARTMENT,CUSTOMER_LEVEL,POSITION,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,PROVINCE,CITY,COUNTRY,PRODUCT_LINE,EQUI_MODEL";
      getAllDict(data).then(res => {
        // 获取所有客户类型
        this.hospitalTypes = res.data.HOSPITAL_TYPE;
        // 获取所有客户类型
        this.sexs = res.data.SEX;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有终端客户级别
        this.customerLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有职务
        this.positions = res.data.POSITION;
        // 获取所有客户服务等级
        this.customerServiceLevels = res.data.CUSTOMER_SERVICE_LEVEL;
        // 获取所有终端客户类型
        this.customerTypes = res.data.CUSTOMER_TYPE;
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
        // 获取所有国家
        this.countrys = res.data.COUNTRY;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
      });
    },
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryOpinionFeedById(data).then(res => {
        this.detailsData = res.data;
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "IdeaFeedback"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

