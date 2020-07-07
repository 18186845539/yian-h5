<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="工单流程详情" name="1">
          <div style="padding: 20px 50px">
            <div>工单-客户信息</div>
            <ul style="margin:20px 0 10px;padding:0">
              <li
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:20px"
              >
                <div style="width:260px">
                  <div class="divlist">工单号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.assignId}}</div>
                </div>
                <div style="width:260px">
                  <div class="divlist">工单类型：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.applyType | dicFilter(applyTypes) }}</div>
                </div>

                <!-- <div style="width:260px">
                  <div class="divlist">产品线：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{workOrders1.productLine | dicFilter(productLines)}}</div>
                </div>-->

                <!-- <div style="width:260px">
                  <div class="divlist">型号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.model | dicFilter(models)}}</div>
                </div>-->

                <div style="width:420px">
                  <div class="divlist">客户名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.customerName}}</div>
                </div>

                <div style="width:150px">
                  <div class="divlist">联系人：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.contacts}}</div>
                </div>

                <div style="width:200px">
                  <div class="divlist">电话：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.phone}}</div>
                </div>

                <div style="width:260px" v-show="workOrders1.department != '' ">
                  <div class="divlist">科室：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{workOrders1.department | dicFilter(departments)}}</div>
                </div>

                <div style="width:260px" v-show="workOrders1.position !='' ">
                  <div class="divlist">职务：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{workOrders1.position | dicFilter(positions)}}</div>
                </div>

                <div style="width:260px">
                  <div class="divlist">物料编码：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.materiel_code}}</div>
                </div>

                <div style="width:260px">
                  <div class="divlist">预约时间：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.appointmentDate | timeslce(workOrders1.appointmentDate)}}</div>
                </div>
                <div style="width:260px" v-show="workOrders1.refuseReason != ''">
                  <div class="divlist">拒绝原因：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{workOrders1.refuseReason | dicFilter(refuseReason)}}</div>
                </div>

                <div style="width:260px" v-show="workOrders1.refuseReasonRemarks != ''">
                  <div class="divlist">拒绝备注：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.refuseReasonRemarks}}</div>
                </div>

                <!-- <div style="width:260px">
                  <div class="divlist">故障类型：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.faultType | dicFilter(faultTypes)}}</div>
                </div>-->

                <!-- <div style="width:260px">
                  <div class="divlist">故障描述：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.faultDescribe}}</div>
                </div>-->

                <div style="width:260px;" v-show="staffInfo != ''">
                  <div class="divlist">员工ID：</div>
                  <div
                    style="margin-left:30px;color:#429EFD ; overflow: hidden;"
                  >{{staffInfo.userName}}</div>
                </div>
                <div style="width:260px" v-show="staffInfo != ''">
                  <div class="divlist">员工名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{staffInfo.staffName}}</div>
                </div>
              </li>
            </ul>
            <div v-show="workOrders1.image != ''">工单-报修图片</div>
            <ul style="margin:20px 0 10px;padding:0" v-show="workOrders1.image != ''">
              <li
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);"
              >
                <div class="divlist">报修图片：</div>
                <div style="    width: 570px;padding: 20px;">
                  <img
                    :src="img"
                    alt
                    v-for="(img,i) in workOrders1.image"
                    :key="i"
                    style="    width: 200px;margin-left:20px "
                  />
                </div>
                <div style="width:260px" v-show="workOrders1.video!= ''">
                  <div class="divlist">报修视频：</div>
                  <div style="margin-left:30px;color:#429EFD">
                    <video
                      width="450"
                      height="340"
                      :src="workOrders1.video"
                      controls
                    >{{workOrders1.video}}</video>
                  </div>
                </div>
              </li>
            </ul>

            <div>工单-产品信息</div>
            <ul style="margin:20px 0 10px;padding:0">
              <li
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);"
              >
                <el-table :data="detailsList">
                  <el-table-column property="assignId" label="工单编号" align="center" width="200"></el-table-column>

                  <el-table-column property="productLine" label="产品线" align="center">
                    <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
                  </el-table-column>
                   <el-table-column property="faultType" label="序列号" align="center" width="200">
                    <template slot-scope="scope">{{scope.row.deviceId | dicFilter(faultTypes)}}</template>
                  </el-table-column>
                  <el-table-column property="model" label="型号" align="center">
                    <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
                  </el-table-column>

                  <el-table-column property="faultType" label="故障类型" align="center" width="200">
                    <template slot-scope="scope">{{scope.row.faultType | dicFilter(faultTypes)}}</template>
                  </el-table-column>

                  <el-table-column property="faultDescribe" label="故障描述" align="center" width="200"></el-table-column>
                    
                </el-table>
              </li>
            </ul>

            <!-- <div>接单员工信息</div>
            <ul style="margin:20px 0 10px;padding:0">
              <li
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:20px"
              >
                
                
              </li>
            </ul>-->
            <div>工单-操作流程</div>
            <ul style="margin:20px 0 10px;padding:0">
              <li
                v-for="item1 in Processdata"
                :key="item1.id"
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:10px;    margin: 10px 0;"
              >
                <div style="width:130px;">
                  <div class="divlist">类型：</div>
                  <div style="margin-left:30px;color:#429EFD ; overflow: hidden;">{{item1.type}}</div>
                </div>
                <div style="width:130px">
                  <div class="divlist">名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item1.name}}</div>
                </div>
                <div style="width:180px">
                  <div class="divlist">操作：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item1.operation}}</div>
                </div>
                <div style="width:260px" v-show="item1.examine != ''">
                  <div class="divlist">操作结果：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item1.examine }}</div>
                </div>
                <!-- 111 -->
                   <div style="width:260px" v-show="item1.staffName != ''">
                  <div class="divlist">指派员工：</div>
                  <div style="margin-left:30px;color:#429EFD">{{staffInfo.staffName}}</div>
                </div>
                <div style="width:300px" v-show="item1.examineRemarks != ''">
                  <div class="divlist">审核备注：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item1.examineRemarks}}</div>
                </div>
                <div style="width:200px">
                  <div class="divlist">操作时间：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item1.createDate | timeslce(item1.createDate)}}</div>
                </div>
              </li>
            </ul>
            <div style="margin-top:20px">
              <el-button @click="returnBtn()">返回</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// import Cookies from "js-cookie";
// 获取所有字典值
import { getAllDict, Monitoringoperation } from "@/api/common";
// 查询派工单信息/修改派工单信息（其中包括审核派单撤单结束）
import {
  queryApplyJob,
  updApplyJob,
  Processdetailapi,
  Processdata
} from "@/api/clientServe";

import { constants } from "crypto";

export default {
  // 过滤显示
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
    }
  },

  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 回填的数据
      workOrders: [],
      // 回填的数据
      workOrders1: [],
      baserImg: this.$store.state.settings.imgURL,
      //员工信息
      staffInfo: [],
      // 所有故障类型
      faultTypes: [],
      // 所有职务
      positions: [],

      refuseReason: [],
      // 所有科室
      departments: [],
      // 所有产品线
      productLines: [],
      // 产品线对应的型号下拉
      models: [],

      //流程操作
      Processdata: [],

      // 详情弹框表格数据
      detailsList: [],
      applyTypes: [
        {
          id: "0",
          lable: "安装",
          value: "AZ"
        },{
          id: "1",
          lable: "维修",
          value: "WX"
        },{
          id: "2",
          lable: "培训",
          value: "PX"
        },{
          id: "3",
          lable: "回访",
          value: "HF"
        },{
          id: "4",
          lable: "专项",
          value: "ZX"
        }
      ],
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   Cookies.set("Processdetails", from.name);
  //   next();
  // },
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
        "FAULT_TYPE,POSITION,DEPARTMENT,PRODUCT_LINE,EQUI_MODEL,REFUSE_REASON,CHANNEL_POSITION";
      getAllDict(data).then(res => {
        // 获取所有故障类型
        this.faultTypes = res.data.FAULT_TYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.POSITION;
        let CHANNEL_POSITION = res.data.CHANNEL_POSITION;
        for(let i =0 ; i < CHANNEL_POSITION.length;i++){
          this.positions.push(CHANNEL_POSITION[i])
        }
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        //拒绝理由
        this.refuseReason = res.data.REFUSE_REASON;
      });
    },
    // 回填数据
    backfillData() {
      let groupId = this.$route.query.groupId;
      let staffName1=this.$route.query.staffName;
      this.staffName=staffName1;

      let data = { groupId: groupId };
      queryApplyJob(data).then(res => {
        // this.workOrders = res.data;
        this.detailsList = res.data;
      });
      //工单信息 - 接单员工信息
      Processdetailapi(data).then(res => {
        if (res.data.groupInfo) {
          let data = res.data.groupInfo.image.split(",");
          let arr = [];
          for (let i = 0; i < data.length; i++) {

            if (data[i]) {
              arr.push(this.baserImg + data[i].replace("undefined", ""));
            }
          }
          res.data.groupInfo.image = arr;
          this.workOrders1 = res.data.groupInfo;

          if (res.data.groupInfo.video != "") {
            this.workOrders1.video = this.baserImg + res.data.groupInfo.video;
          }
        }
        if (res.data.staffInfo != null) {
          this.staffInfo = res.data.staffInfo;
        }
      });
      //流程记录数据
      Processdata(data).then(res => {
        this.Processdata = res.data;
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.go(-1);
      // let a = Cookies.get("Processdetails");
      // if (a) {
      //   this.$router.push({
      //     name: a
      //   });
      // }else{
      //   this.$router.go(-1)
      // }
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style scoped>
.divlist {
  width: 76px;
  float: left;
  text-align: right;
}
</style>

