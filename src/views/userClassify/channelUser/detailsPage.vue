<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="渠道用户详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户编码：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.customerCode}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">代理商名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.channelName}}</el-col>

              <el-col :span="3" class="detailsTitle">地址：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.address | dicFilter(sexs)}}</el-col>

              <el-col :span="3" class="detailsTitle">省份：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.province | dicFilter(provinces)}}</el-col>

              <el-col :span="3" class="detailsTitle">城市：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.city | dicFilter(citys)}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">联系人：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.contactsName}}</el-col>

              <el-col :span="3" class="detailsTitle">电话号码：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.phone}}</el-col>

              <el-col :span="3" class="detailsTitle">终端客户级别：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.customerLevel | dicFilter(customerLevels)}}</el-col>

              <el-col :span="3" class="detailsTitle">终端客户类型：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.customerType | dicFilter(customerTypes)}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户服务等级：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.customerServiceLevel | dicFilter(customerServiceLevels)}}</el-col>

              <el-col :span="3" class="detailsTitle">代理级别：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.channelLevel | dicFilter(channelLevels)}}</el-col>

              <el-col :span="3" class="detailsTitle">使用科室：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.useDepartment | dicFilter(departments)}}</el-col>

              <el-col :span="3" class="detailsTitle">职务：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.position | dicFilter(positions)}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">性别：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.sex | dicFilter(sexs)}}</el-col>

              <el-col :span="3" class="detailsTitle">是否签约：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.isSigning | dicFilter(isSignings)}}</el-col>

              <el-col :span="3" class="detailsTitle">邮政编码：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.zipCode}}</el-col>

              <el-col :span="3" class="detailsTitle">创建时间：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.createDate | timeslce(detailsData.createDate)}}</el-col>
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
// 查询渠道用户详情
import { queryChannel } from "@/api/userClassify";

export default {
  // 过滤显示
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d, n) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
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
      // 所有终端客户级别
      customerLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有代理级别
      channelLevels: [],
      // 所有科室
      departments: [],
      // 所有职务
      positions: [],
      // 所有性别
      sexs: [],
      // 是否签约
      isSignings: [],
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
        "PROVINCE,CITY,CUSTOMER_LEVEL,CUSTOMER_TYPE,CUSTOMER_SERVICE_LEVEL,CHANNEL_TYPE,DEPARTMENT,CHANNEL_POSITION,SEX,WHETHER";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
        // 获取所有终端客户级别
        this.customerLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有终端客户类型
        this.customerTypes = res.data.CUSTOMER_TYPE;
        // 获取所有客户服务等级
        this.customerServiceLevels = res.data.CUSTOMER_SERVICE_LEVEL;
        // 获取所有代理级别
        this.channelLevels = res.data.CHANNEL_TYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.CHANNEL_POSITION;
        // 获取所有性别
        this.sexs = res.data.SEX;
        //获取是否签约
        this.isSignings = res.data.WHETHER;
      });
    },
    // 回填数据
    backfillData() {
      let userId = this.$route.query.sendData;
      let data = { userId: userId };
      queryChannel(data).then(res => {
        this.detailsData = res.data;
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ChannelUser"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

