<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="员工用户详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">用户名：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.userName}}</el-col>

              <el-col :span="3" class="detailsTitle">员工姓名：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.staffName}}</el-col>

              <el-col :span="3" class="detailsTitle">电话：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.phone}}</el-col>

              <el-col :span="3" class="detailsTitle">邮箱：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.email}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">员工等级：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.level | dicFilter(levels)}}</el-col>

              <el-col :span="3" class="detailsTitle">省份：</el-col>
              <el-col :span="3" class="detailsBodle">
                <div style="width:100%  ;  height: 25px;
    overflow: hidden;">
                  <div
                    v-for="(name,index) in detailsData.province"
                    :key="index"
                    v-show="detailsData.province.length-1 != index"
                    style="    display: inline-block;
    vertical-align: top;"
                  >{{name+","}}</div>
                  <div
                    v-for="(name,index) in detailsData.province"
                    :key="index"
                    v-show="detailsData.province.length-1==index"
                    style="    display: inline-block;
    vertical-align: top;"
                  >{{name}}</div>
                </div>
              </el-col>

              <el-col :span="3" class="detailsTitle">城市：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.city | dicFilter(citys)}}</el-col>

              <el-col :span="3" class="detailsTitle">创建人：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.createName}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">创建时间：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.createDate | timeslce(detailsData.createDate)}}</el-col>
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
// 查询员工详情
import { queryStaff } from "@/api/userClassify";

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
      // 所有员工等级
      levels: [],
      // 所有省份
      provinces: [],
      // 所有城市
      citys: [],
      // 详情数据
      detailsData: {}
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PROVINCE,CITY,STAFF_LEVEL";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
        // 获取所有员工等级
        this.levels = res.data.STAFF_LEVEL;

        // 回填数据
        this.backfillData();
      });
    },
    // 回填数据
    backfillData() {
      let staffId = this.$route.query.sendData;
      let data = { staffId: staffId };
      queryStaff(data).then(res => {
        let data = res.data.province.split(",");
        let arr = [];
        for (let j = 0; j <= data.length - 1; j++) {
          for (let m = 0; m <= this.provinces.length - 1; m++) {
            if (data[j] == this.provinces[m].value) {
              arr.push(this.provinces[m].lable);
            }
          }
        }
        res.data.province = arr;
        this.detailsData = res.data;
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "StaffList"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

