<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="产品维历史详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">省份：</el-col>
              <el-col :span="3" class="detailsBodle">
                <span v-if="detailsData.province == ''">无</span>
                {{detailsData.province | dicFilter(provinces)}}
              </el-col>

              <el-col :span="3" class="detailsTitle">城市：</el-col>
              <el-col :span="3" class="detailsBodle">
                <span v-if="detailsData.city == ''">无</span>
                {{detailsData.city | dicFilter(citys)}}
              </el-col>

              <el-col :span="3" class="detailsTitle">产品线：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.productLine | dicFilter(productLines)}}</el-col>

              <el-col :span="3" class="detailsTitle">型号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.model | dicFilter(models)}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.customer}}</el-col>

              <el-col :span="3" class="detailsTitle">客户级别：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.productLevel | dicFilter(productLevels)}}</el-col>

              <el-col :span="3" class="detailsTitle">产品名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.productName}}</el-col>

              <el-col :span="3" class="detailsTitle">序列号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.deviceId}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">科室：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.department | dicFilter(departments)}}</el-col>

              <el-col :span="3" class="detailsTitle">联系人：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.contacts}}</el-col>

              <el-col :span="3" class="detailsTitle">电话号码：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.phone}}</el-col>

              <el-col :span="3" class="detailsTitle">派工单号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.dispatchingOrder}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">申请类型：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.applyType | dicFilter(applyTypes)}}</el-col>

              <el-col :span="3" class="detailsTitle">保修开始日期：</el-col>
              <el-col :span="3" class="detailsBodle">
                <span v-if="detailsData.warrantyStartDate == ''">无</span>
                {{detailsData.warrantyStartDate}}
              </el-col>

              <el-col :span="3" class="detailsTitle">保修结束日期：</el-col>
              <el-col :span="3" class="detailsBodle">
                <span v-if="detailsData.warrantyEndDate == ''">无</span>
                {{detailsData.warrantyEndDate}}
              </el-col>

              <el-col :span="3" class="detailsTitle">安装日期：</el-col>
              <el-col :span="3" class="detailsBodle">
                <span v-if="detailsData.installTime == ''">无</span>
                {{detailsData.installTime}}
              </el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">备注：</el-col>
              <el-col :span="21" class="detailsBodle">
                <span v-if="detailsData.note == ''">无</span>
                {{detailsData.note}}
              </el-col>
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
// 查询产品档案详情
import { queryArchivesDetail } from "@/api/clientServe";

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
      // 所有省份
      provinces: [],
      // 所有城市
      citys: [],
      // 所有产品线
      productLines: [],
      // 所有型号
      models: [],
      // 所有终端客户级别
      productLevels: [],
      // 所有科室
      departments: [],
      // 所有申请类型
      applyTypes: [],

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
        "PROVINCE,CITY,PRODUCT_LINE,EQUI_MODEL,CUSTOMER_LEVEL,APPLY_TYPE,DEPARTMENT";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取所有终端客户级别
        this.productLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有申请类型
        this.applyTypes = res.data.APPLY_TYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
      });
    },
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryArchivesDetail(data).then(res => {
        this.detailsData = res.data;
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ProductHistory"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

