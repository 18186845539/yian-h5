<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="审核员工工单11" name="1">
          <div style="padding: 20px 50px">
            <ul style="margin:20px 0 10px;padding:0">
              <li
                v-for="item in workOrders"
                :key="item.id"
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:20px"
              >
                <!-- <div style="width:230px">
                  <div class="divlist">序列号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.deviceId}}</div>
                </div> -->
                <div style="width:230px">
                  <div class="divlist">工单类型：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.applyType | dicFilter(applyTypes)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">产品线：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.productLine | dicFilter(productLines)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">型 号：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.model | dicFilter(models)}}</div>
                </div>

                <div style="width:400px">
                  <div class="divlist">客户名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.customerName}}</div>
                </div>

                <div style="width:130px">
                  <div class="divlist">联系人：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.contacts}}</div>
                </div>

                <div style="width:180px">
                  <div class="divlist">电 话：</div>
                  <div style="margin-left:30px;color:#429EFD" >{{item.phone}}</div>
                </div>

                  <div style="width:180px">
                  <div class="divlist">服务内容：</div>
                  <div style="margin-left:30px;color:#429EFD" >{{item.serviceContent}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">科 室：</div>
                  <div
                    style="margin-left:30px;color:#429EFD"
                  >{{item.department | dicFilter(departments)}}</div>
                </div>

                <div style="width:230px">
                  <div class="divlist">职 务：</div>
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
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.appointmentDate | timeslce(workOrders1.appointmentDate)}}</div>
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
                <div style="width:230px;">
                  <div class="divlist">员 工 ID：</div>
                  <div
                    style="color:#429EFD;    width: 65%;
    float: left;overflow: hidden;"
                  >{{staffInfo.userName}}</div>
                </div>
                <div style="width:230px">
                  <div class="divlist">员工名称：</div>
                  <div style="margin-left:30px;color:#429EFD">{{item.staffName}}</div>
                </div>

                <div style="width:230px" v-show="workOrders1.refuseReasonRemarks !=''">
                  <div class="divlist">拒绝原因：</div>
                  <div style="margin-left:30px;color:#429EFD">{{workOrders1.refuseReasonRemarks}}</div>
                </div>
                <!-- <div style="width:230px" v-show="workOrders1.video !=''">
                  <div class="divlist">报修视频：</div>
                  <div style="margin-left:30px;color:#429EFD" >{{workOrders1.video}}<video :src="baserImg+video"></video></div>
                </div>-->
              </li>
            </ul>

            <ul style="margin:20px 0 10px;padding:0" v-show="workOrders1.image !='' || workOrders1.video != ''">
              <li
                v-for="item in workOrders"
                :key="item.id"
                style="display: flex;flex-wrap:wrap;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:20px"
              >
                <div style="width:570px" v-show="workOrders1.image !=''">
                  <div class="divlist">报修图片：</div>
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
                    <video width="450" height="340" :src="workOrders1.video" controls>
                      {{workOrders1.video}}
                    </video>
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
              >
                <el-form-item label="优先级：" prop="priority">
                  <el-select v-model="form.priority" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in prioritys"
                      :key="item.id"
                      :label="item.lable"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="审核备注：" prop="examineRemarks">
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
                  <el-button
                    type="primary"
                    @click="Monitoringoperationis('form','通过')"
                    size="small "
                  >通过并派单</el-button>
                  <el-button @click="returnBtn()" size="small ">返回</el-button>
                  <el-button
                    type="primary"
                    @click="Monitoringoperationis('form','拒绝')"
                    size="small "
                  >拒绝</el-button>
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
import {
  queryApplyJob,
  updApplyJob,
  Processdetailapi
} from "@/api/clientServe";

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
      baserImg: this.$store.state.settings.imgURL,
      // 回填的数据
      workOrders: [],
      workOrders1: [],
      staffInfo: [],
      // 所有故障类型
      faultTypes: [],
      // 所有职务
      positions: [],
      // 所有科室
      departments: [],
      // 所有产品线
      productLines: [],
      // 产品线对应的型号下拉
      models: [],
      // 所有优先级
      prioritys: [],
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
      // 表单数据
      form: {
        id: "",
        examineRemarks: "",
        priority: ""
      },
      rules: {
        examineRemarks: [
          { required: true, message: "请填写审核备注", trigger: "blur" }
        ],
        // 优先级验证
        priority: [{ required: true, message: "请选优先级", trigger: "change" }]
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
        "FAULT_TYPE,POSITION,DEPARTMENT,PRODUCT_LINE,EQUI_MODEL,PRIORITY";
      getAllDict(data).then(res => {
        // 获取所有故障类型
        this.faultTypes = res.data.FAULT_TYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.POSITION;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取所有优先级
        this.prioritys = res.data.PRIORITY;
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
        for (let i = 0; i < data.length; i++) {
          if (data[i]) {
            arr.push(this.baserImg + data[i].replace("undefined", ""));
          }
        }
        res.data[0].image = arr;
        if(res.data[0].video != ''){
         res.data[0].video =  this.baserImg+res.data[0].video
        }
        this.workOrders1 = res.data[0];
      });
      Processdetailapi(data).then(res => {
        if (res.data.staffInfo) {
          this.staffInfo = res.data.staffInfo;
        }
      });
    },
    // 审核通过
    auditPassForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.form.id = this.$route.query.id;

          let data = {
            id: this.form.id,
            groupId: this.$route.query.groupId,
            status: "4",
            examineRemarks: this.form.examineRemarks,
            priority: this.form.priority
          };
          updApplyJob(data).then(res => {
            this.$message.success('派单成功');
            this.$router.push({
              name: "StaffRepairs"
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
          this.form.id = this.$route.query.id;
          let data = {
            id: this.form.id,
            groupId: this.$route.query.groupId,
            status: "8",
            examineRemarks: this.form.examineRemarks
          };

          updApplyJob(data).then(res => {
            this.$message.success('拒绝成功');
            this.$router.push({
              name: "StaffRepairs"
            });
          });
        } else {
          return false;
        }
      });
    },
    //操作流程 监控
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

      if (issta == "通过") {
        pagt.operation = "派单";
        pagt.examine = "审核通过";
      } else if (issta == "拒绝") {
        pagt.operation = "审核";
        pagt.examine = "拒绝";
      }
      Monitoringoperation(pagt).then(res => {
        if (issta == "通过") {
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
        name: "StaffRepairs"
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