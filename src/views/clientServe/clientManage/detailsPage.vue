<template>
  <div class="pageContainer daxiong" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="客户信息详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户类型：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.userType | dicFilter(userTypes)}}</el-col>

              <el-col :span="3" class="detailsTitle">客户编码：</el-col>
              <el-col :span="15" class="detailsBodle">{{detailsData.customerCode}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.customerName}}</el-col>

              <el-col :span="3" class="detailsTitle">省份：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.province | dicFilter(provinces)}}</el-col>

              <el-col :span="3" class="detailsTitle">城市：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.city | dicFilter(citys)}}</el-col>

              <el-col :span="3" class="detailsTitle">联系人：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.contacts}}</el-col>
               <el-col :span="3" class="detailsTitle">电话：</el-col>
              <el-col :span="3" class="detailsBodle" style="width: 100px;">{{detailsData.phone}}</el-col>
            </el-row>
            <el-row :gutter="10" class="detailsRow">
              <div v-for="(lianxir,ind) in detailsData.contactList" :key="ind">
                <el-col :span="3" class="detailsTitle">副联系人：</el-col>
                <el-col :span="3" class="detailsBodle">{{lianxir.contacts+' - '+ lianxir.phone}}</el-col>
              </div>
            </el-row>
            <el-row :gutter="10" class="detailsRow">
             

              <el-col :span="3" class="detailsTitle">地址：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.address}}</el-col>

              <el-col :span="3" class="detailsTitle">邮编：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.zipCode}}</el-col>

              <el-col :span="3" class="detailsTitle">使用科室：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.useDepartment | dicFilter(departments)}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">终端客户级别：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.customerLevel | dicFilter(customerLevels)}}</el-col>

              <el-col :span="3" class="detailsTitle">客户服务等级：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.customerServiceLevel | dicFilter(customerServiceLevels)}}</el-col>

              <el-col :span="3" class="detailsTitle">终端客户类型：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.customerType | dicFilter(customerTypes)}}</el-col>

              <el-col :span="3" class="detailsTitle">国家：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.country | dicFilter(countrys)}}</el-col>
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
// 查询客户信息详情
import { queryCustomernfoById } from "@/api/clientServe";

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
      userTypes: [],
      // 所有省份
      provinces: [],
      // 所有城市
      citys: [],
      // 所有科室
      departments: [],
      // 所有终端客户级别
      customerLevels: [],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有国家
      countrys: [],

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
        "USERTYPE,DEPARTMENT,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,PROVINCE,CITY";
      getAllDict(data).then(res => {
        // 获取所有客户类型
        this.userTypes = res.data.USERTYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有客户服务等级
        this.customerServiceLevels = res.data.CUSTOMER_SERVICE_LEVEL;
        // 获取所有终端客户类型
        this.customerTypes = res.data.CUSTOMER_TYPE;
        // 获取所有终端客户级别
        this.customerLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有国家
        this.countrys = res.data.COUNTRY;
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
      });
    },
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryCustomernfoById(data).then(res => {
        this.detailsData = res.data;
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ClientManage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
<style >
.daxiong .el-col-3 {
      width: 9.5%;
}
</style>

