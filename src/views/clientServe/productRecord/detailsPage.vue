<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="产品档案详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">序列号：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.deviceId}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">产品代码：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.deviceNo}}</el-col>
            </el-row>

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

              <el-col :span="3" class="detailsTitle">产品备注：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.productNotes}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">客户编码：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.customerCode}}</el-col>
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
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">电话：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.phone}}</el-col>

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

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">备注：</el-col>
              <el-col :span="21" class="detailsBodle">
                <span v-if="detailsData.city == ''">无</span>
                {{detailsData.note}}
              </el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">图片：</el-col>
              <el-col :span="21" class="detailsBodle">
                <img
                  v-for="item in imgList"
                  :key="item.id"
                  :src="imgURL + item"
                  style="width: 200px;height: 200px;margin-right: 50px;"
                >
              </el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">视频：</el-col>
              <el-col :span="9" class="detailsBodle">
                <span v-if="detailsData.videoUrl ==''">暂无视频</span>
                <video
                  v-if="detailsData.videoUrl !=''"
                  style="width: 300px;"
                  :src="imgURL + detailsData.videoUrl"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
              </el-col>

              <el-col :span="3" class="detailsTitle">创建时间：</el-col>
              <el-col :span="9" class="detailsBodle">{{detailsData.createDate}}</el-col>
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
import { queryArchivesDetailNew } from "@/api/clientServe";

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
      // 回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 默认展开
      activeNames: ["1"],
      // 所有省份
      provinces: [],
      // 所有城市
      citys: [],
      // 所有产品线
      productLines: [],
      // 产品线对应的型号下拉
      models: [],
      // 所有客户级别
      customerLevels: [],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有国家
      countrys: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有科室
      departments: [],

      // 详情数据
      detailsData: {},
      // 图片列表
      imgList: []
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
        "CITY,PROVINCE,PRODUCT_LINE,EQUI_MODEL,CUSTOMER_LEVEL,DEPARTMENT,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,COUNTRY";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取客户级别
        this.customerLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有客户服务等级
        this.customerServiceLevels = res.data.CUSTOMER_SERVICE_LEVEL;
        // 获取所有终端客户类型
        this.customerTypes = res.data.CUSTOMER_TYPE;
        // 获取所有国家
        this.countrys = res.data.COUNTRY;
      });
    },
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryArchivesDetailNew(data).then(res => {
        this.detailsData = res.data;
        this.imgList = res.data.picUrls.split(",");
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ProductRecord"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

