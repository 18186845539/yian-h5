<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="审核客户工单" name="1">
          <div style="padding: 20px 50px">
            <ul style="margin:20px 0 10px;padding:0">
              <li
                v-for="item in workOrders"
                :key="item.id"
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:20px"
              >
                <div style="width:230px">
                  <div class="divlist">工单号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.assignId}}</div>
                </div>
                <div style="width:230px">
                  <div class="divlist">序列号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.deviceId}}</div>
                </div>
                <div style="width:230px">
                  <div class="divlist">工单类型：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.applyType | dicFilter(applyTypes)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">产品线：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.productLine | dicFilter(productLines)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">型号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.model | dicFilter(models)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">客户名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.customerName}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">联系人：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.contacts}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">电话：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.phone}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">科室：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.department | dicFilter(departments)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">职务：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.position | dicFilter(positions)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">物料编码：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.materiel_code}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">预约时间：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{workOrders1.appointmentDate | timeslce(workOrders1.appointmentDate)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">故障类型：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.faultType | dicFilter(faultTypes)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">故障描述：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.faultDescribe}}</div>
                </div>
                <div style="width:230px;" v-show="item.staffId != ''">
                  <div class="divlist">员工ID：</div>
                  <div style="margin-left:30px;color:#429EFD ; overflow: hidden;">{{item.staffId}}</div>
                </div>
                <div style="width:230px" v-show="item.staffName != ''">
                  <div class="divlist">员工名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.staffName}}</div>
                </div>
                <div style="width:230px" v-show="workOrders1.refuseReasonRemarks!=''">
                  <div class="divlist">拒绝原因：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.refuseReasonRemarks}}</div>
                </div>
              </li>
              <li
                v-for="item in workOrders"
                :key="item.id"
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:20px;margin-top:20px"
                v-show="workOrders1.image != '' || workOrders1.video !='' "
              >
                <div style="width:570px" v-show="workOrders1.image !=''">
                  <div class="divlist" style="height:100%">报修图片：</div>
                  <div style="    width: 570px;">
                    <img
                      :src="img"
                      alt
                      v-for="(img,i) in workOrders1.image"
                      :key="i"
                      style="    width: 200px;margin-left:20px"
                    />
                  </div>
                </div>

                <div style="width:450px" v-show="workOrders1.video !=''">
                  <div class="divlist">报修视频：</div>
                  <div style="    width: 570px;">
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

            <div style="margin-top:20px">
              <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                class="demo-ruleForm"
                size="small"
              >
                <el-form-item label="批复意见：">
                  <el-radio-group v-model="shortcut" @change="changeShortcut">
                    <el-radio label="审核通过"></el-radio>
                    <el-radio label="审核未通过"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="审核备注：" :prop="examineRemarksarr">
                  <el-input
                    v-model="form.examineRemarks"
                    type="textarea"
                    resize="none"
                    placeholder="请输入内容"
                    maxlength="200"
                    :rows="3"
                    show-word-limit
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="Monitoringoperationis('form','审核通过')">派单</el-button>
                  <el-button @click="returnBtn()">返回</el-button>
                  <el-button type="primary" @click="Monitoringoperationis('form','拒绝')">拒绝</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 获取所有字典值
import {
  getAllDict,
  Monitoringoperation,
  queryApplyJobGroupchaxun
} from "@/api/common";
// 查询派工单信息/修改派工单信息（其中包括审核派单撤单结束）
import { queryApplyJob, updApplyJob } from "@/api/clientServe";
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
      // 回填的数据
      workOrders: [],
      workOrders1: [],
      baserImg: this.$store.state.settings.imgURL,

      // 所有故障类型
      faultTypes: [],
      // 所有职务
      positions: [],
      // 所有科室
      departments: [],
      // 所有产品线
      productLines: [],
      applyTypes: [
        {
          id: "0",
          lable: "安装",
          value: "AZ"
        },
        {
          id: "1",
          lable: "维修",
          value: "WX"
        },
        {
          id: "2",
          lable: "培训",
          value: "PX"
        },
        {
          id: "3",
          lable: "回访",
          value: "HF"
        },
        {
          id: "4",
          lable: "专项",
          value: "ZX"
        }
      ],

      // 产品线对应的型号下拉
      models: [],
      examineRemarksarr: "",
      // 快捷语句
      shortcut: "",
      // 表单数据
      form: {
        examineRemarks: ""
      },
      rules: {
        examineRemarks: [
          { required: true, message: "请填写审核备注", trigger: "blur" }
        ]
      }
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
        "FAULT_TYPE,POSITION,DEPARTMENT,PRODUCT_LINE,EQUI_MODEL,CHANNEL_POSITION";
      getAllDict(data).then(res => {
        // 获取所有故障类型
        this.faultTypes = res.data.FAULT_TYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.POSITION;
        let CHANNEL_POSITION = res.data.CHANNEL_POSITION;
        for (let i = 0; i < CHANNEL_POSITION.length; i++) {
          this.positions.push(CHANNEL_POSITION[i]);
        }
        // this.positions = res.data.POSITION;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
      });
    },
    // 回填数据
    backfillData() {
      let groupId = this.$route.query.groupId;
      let data = { groupId: groupId };
      queryApplyJob(data).then(res => {
        this.workOrders = res.data;
      });
      queryApplyJobGroupchaxun(data).then(res => {
        let data = res.data[0].image.split(",");
        let arr = [];

        for (let i = 0; i < data.length ; i++) {
          if (data[i]) {
            arr.push(this.baserImg + data[i].replace("undefined", ""));
          }
        }
        res.data[0].image = arr;

        if (res.data[0].video != "") {
          res.data[0].video = this.baserImg + res.data[0].video;
        }
        this.workOrders1 = res.data[0];
      });
    },
    // 快捷语句
    changeShortcut(label) {
      if (label == "审核未通过") {
        this.examineRemarksarr = "examineRemarks";
      } else {
        this.examineRemarksarr = "";
      }
      this.form.examineRemarks = label;
    },
    // 审核通过
    auditPassForm(form) {
      this.$refs[form].validate(valid => {
        if (this.shortcut == "审核未通过") {
          if (this.form.examineRemarks == "") {
            this.$message.error("请填写备注");
            return;
          }
        }

        if (valid) {
          let id = this.$route.query.id;
          let data = {
            id: id,
            groupId: this.$route.query.groupId,
            examineRemarks: this.form.examineRemarks,
            status: "1"
          };

          updApplyJob(data).then(res => {

            this.$message.success('审核成功');
            this.$router.push({
              name: "ClientRepairs"
            });
          });
        } else {
          return false;
        }
      });
    },
    // 拒绝
    refuseBtn(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let sendData = this.$route.query;
          let data = {
            id: sendData.id,
            groupId: this.$route.query.groupId,
            examineRemarks: this.form.examineRemarks,
            status: "8"
          };

          updApplyJob(data).then(res => {
            this.$message.success('拒绝成功');
            this.$router.push({
              name: "ClientRepairs"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    Monitoringoperationis(rows, issta) {
      let pagt = {
        groupId: this.$route.query.groupId, //添加派工单历史记录   必填
        name: this.$store.state.user.name, //操作人姓名   姓名
        type: this.$store.state.user.roles[0], //操作人类型   员工   还是管理员
        operation: "", //具体操作  审核  ，  撤销 ，  通过    派单
        operationRemarks: "", //操作备注
        examine: "", //审核是否通过
        examineRemarks: this.form.examineRemarks //审核备注
      };

      if (issta == "审核通过") {
        pagt.operation = "审核";
        pagt.examine = "审核通过";
      } else if (issta == "拒绝") {
        pagt.operation = "审核";
        pagt.examine = "拒绝";
      }

      Monitoringoperation(pagt).then(res => {
        if (issta == "审核通过") {
          this.auditPassForm(rows);
        } else if (issta == "拒绝") {
          this.refuseBtn(rows);
        }
        // 查询派单表格数据
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ClientRepairs"
      });
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

