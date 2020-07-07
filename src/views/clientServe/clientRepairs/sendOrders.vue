<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="派单" name="1">
          <div class="searchRow">
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="250px"
              size="small"
              class="demo-ruleForm"
              style="width: 800px;"
            >
              <!-- <el-form-item label="选择省份：" prop="province">
                <el-select
                  v-model="form.province"
                  @change="provinceChange"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="选择城市：" prop="city">
                <el-select
                  v-model="form.city"
                  @change="cityChange"
                  :disabled="disabledCity"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in citys"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="选择人员：" prop="staffId">
                <el-select
                  v-model="form.staffId"
                  @change="staffIdChange"
                  :disabled="disabledCity"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in staffs"
                    :key="item.id"
                    :label="item.staffName"
                    :value="item.staffId"
                  ></el-option>
                </el-select>
              </el-form-item>-->

              <el-form-item label="指派员工：" prop="staffId">
                <el-button type="primary" @click="selectStaff">选择员工</el-button>

                <el-table :data="staffData">
                  <el-table-column property="staffName" label="员工姓名" align="center"></el-table-column>

                  <el-table-column property="phone" label="电话" align="center"></el-table-column>

                  <el-table-column property="province" label="省份" align="center">
                    <template slot-scope="scope">
                      <div style="width:100% ;height: 25px;
    overflow: hidden;">
                        <div
                          v-for="(name,index) in scope.row.province1"
                          :key="index"
                          v-show="scope.row.province1.length -1 != index"
                          style="    display: inline-block;
    vertical-align: top;"
                        >{{name+","}}</div>
                        <div
                          v-for="(name,index1) in scope.row.province1"
                          :key="index1"
                          v-show="scope.row.province1.length-1==index1"
                          style="    display: inline-block;
    vertical-align: top;"
                        >{{name}}</div>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column property="city" label="城市" align="center">
                    <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
                  </el-table-column>
                </el-table>
              </el-form-item>

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

              <el-form-item>
                <el-button
                  v-if="ifStatus != 2"
                  type="primary"
                  @click="Monitoringoperationis('form' , '派单')"
                >派单</el-button>
                <el-button
                  v-if="ifStatus == 2"
                  type="primary"
                  @click="Monitoringoperationis('form','再次派单')"
                >再次派单</el-button>
                <el-button @click="returnBtn()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!-- 选择员工框部分 -->
          <div class="tableRow">
            <el-dialog
              :visible.sync="dialogStaffTableVisible"
              width="70%"
              top="5vh"
              :modal-append-to-body="false"
            >
              <div>
                <!-- 筛选部分 -->
                <div
                  style=" display: flex;justify-content: space-between;flex-wrap: wrap;margin-bottom:20px;"
                >
                  <!-- <span>
                    <span>员工用户名：</span>
                    <span style="display: inline-block;max-width: 100px;">
                      <el-input v-model="pageQueryStaff.userName" size="small" clearable></el-input>
                    </span>
                  </span>-->
                  <span>
                    <span>员工名称：</span>
                    <span style="display: inline-block;max-width: 100px;">
                      <el-input v-model="pageQueryStaff.staffName" size="small" clearable></el-input>
                    </span>
                  </span>

                  <span>
                    <span>电话：</span>
                    <span style="display: inline-block;max-width: 100px;">
                      <el-input v-model="pageQueryStaff.phone" size="small" clearable></el-input>
                    </span>
                  </span>

                  <span class="searchCol">
                    <span>省份：</span>
                    <span style="display: inline-block;max-width: 100px;">
                      <el-select
                        v-model="pageQueryStaff.province"
                        @change="provinceChange"
                        placeholder="请选择"
                        size="small"
                        clearable
                      >
                        <el-option
                          v-for="item in provinces"
                          :key="item.id"
                          :label="item.lable"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </span>
                  </span>

                  <span>
                    <span>城市：</span>
                    <span style="display: inline-block;max-width: 100px;">
                      <el-select
                        v-model="pageQueryStaff.city"
                        :disabled="disabledCity"
                        placeholder="请选择"
                        size="small"
                        clearable
                      >
                        <el-option
                          v-for="item in citys"
                          :key="item.id"
                          :label="item.lable"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </span>
                  </span>

                  <span>
                    <el-button
                      @click="commonSearchStaff()"
                      type="primary"
                      icon="el-icon-search"
                      size="small"
                    >筛选</el-button>
                  </span>
                </div>
                <!-- 表格部分 -->
                <div>
                  <el-table
                    v-loading="listLoading"
                    element-loading-text="Loading"
                    :data="staffList"
                    ref="staffList"
                    @selection-change="handleSelectionChangeStaff"
                    @row-click="clickRowStaff"
                    fit
                    highlight-current-row
                    height="320px"
                  >
                    <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

                    <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

                    <el-table-column property="staffName" label="员工名称" align="center"></el-table-column>

                    <el-table-column property="phone" label="电话" align="center"></el-table-column>

                    <!-- <template slot-scope="scope">{{scope.row.province | dicFilter(provinces)}}</template> -->

                    <el-table-column property="province" label="省份" align="center">
                      <template slot-scope="scope">
                        <div style="width:100% ;height: 25px;
    overflow: hidden;">
                          <div
                            v-for="(name,index) in scope.row.province1"
                            :key="index"
                            v-show="scope.row.province1.length -1 != index"
                            style="    display: inline-block;
    vertical-align: top;"
                          >{{name+","}}</div>
                          <div
                            v-for="(name,index1) in scope.row.province1"
                            :key="index1"
                            v-show="scope.row.province1.length-1==index1"
                            style="    display: inline-block;
    vertical-align: top;"
                          >{{name}}</div>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column property="city" label="城市" align="center">
                      <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
                    </el-table-column>

                    <el-table-column property="email" label="邮箱" align="center" width="180"></el-table-column>
                  </el-table>
                </div>
                <!-- 分页部分 -->
                <div class="tableBottom">
                  <div ref="paginationContainer" class="paginationContainer">
                    <el-pagination
                      small
                      background
                      prev-text="上一页"
                      next-text="下一页"
                      @size-change="handleSizeChangeStaff"
                      @current-change="handleCurrentChangeStaff"
                      :current-page="pageQueryStaff.page"
                      :page-sizes="pageSizes"
                      :page-size="pageQueryStaff.rows"
                      layout="prev, pager, next, total, sizes, jumper"
                      :total="pageQueryStaff.totalCount"
                    ></el-pagination>
                  </div>
                </div>
              </div>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogStaffTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogConfirmStaff" size="small">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 获取所有字典/省份对应的城市
import { getAllDict, getCity, Monitoringoperation } from "@/api/common";
// 获取所有员工
import { queryStaffList } from "@/api/userClassify";
// 修改派工单信息（其中包括审核派单撤单结束）
import { updApplyJob } from "@/api/clientServe";

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
    // 手机号验证规则
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("电话号码格式不正确"));
        }
      }
    };

    return {
      // 默认展开
      activeNames: ["1"],
      // 所有省份
      provinces: [],
      // 所有城市
      cityes: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      // 所有员工
      staffs: [],
      // 所有优先级
      prioritys: [],
      // 接收状态判断是否再次派单
      ifStatus: "",

      // 员工弹框
      dialogStaffTableVisible: false,
      // 所有员工数据
      staffList: [],
      // 选中的员工数据
      multipleSelectionStaff: [],
      // 显示选中员工数据
      staffData: [],

      // 表单数据
      form: {
        id: "",
        status: "4",
        province: "",
        city: "",
        applyType: "",
        staffId: "",
        staffName: "",
        priority: ""
      },

      //   筛选员工数据
      pageQueryStaff: {
        // 查询员工
        staffName: "",
        phone: "",
        province: "",
        city: "",
        userName: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30],

      // 表单验证
      rules: {
        // 省份验证
        province: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        // 城市验证
        city: [{ required: false, message: "请选择城市", trigger: "change" }],
        // 人员验证
        staffId: [{ required: true, message: "请选择人员", trigger: "change" }],
        // 优先级验证
        priority: [{ required: true, message: "请选优先级", trigger: "change" }]
      }
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 表格带过来的值赋值给表单
    this.getsendData();
  },
  methods: {
    // 表格带过来的值赋值给表单
    getsendData() {
      this.form.id = this.$route.query.id;
      this.form.applyType = this.$route.query.applyType;
      // 接收状态判断是否再次派单
      this.ifStatus = this.$route.query.status;
    },
    // 获取所有字典值
    fetchAllDict() {
      let data = "PROVINCE,CITY,PRIORITY";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.cityes = res.data.CITY;
        // 获取所有优先级
        this.prioritys = res.data.PRIORITY;
      });
    },
    // 获取所有省份对应的城市/省份变化获取所有员工
    provinceChange(val) {
      // 清空省份
      this.form.city = "";

      let obj = {};
      obj = this.provinces.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledCity = false;
        getCity(data).then(res => {
          this.citys = res.data.CITY;
        });
      } else {
        this.form.staffId = "";
        this.form.staffName = "";
        this.form.priority = "";
        this.disabledCity = true;
      }

      let data = {
        province: this.form.province,
        city: this.form.city
      };
      queryStaffList(data).then(res => {
        this.staffs = res.data.list;
      });
    },
    // 城市变化获取所有员工
    cityChange() {
      let data = {
        province: this.form.province,
        city: this.form.city
      };
      queryStaffList(data).then(res => {
        this.staffs = res.data.list;
      });
    },
    // 获取选中员工的信息
    staffIdChange(val) {
      let obj = {};
      obj = this.staffs.find(item => {
        return item.staffId === val;
      });
      if (obj != undefined) {
        this.form.staffId = obj.staffId;
        this.form.staffName = obj.staffName;
      } else {
        this.form.staffId = "";
        this.form.staffName = "";
      }
    },
    // 打开选择员工弹框
    selectStaff() {
      this.dialogStaffTableVisible = true;
      // 获取所有员工
      this.fetchStaffListData();
    },
    // 查询员工列表
    fetchStaffListData() {
      this.listLoading = true;
      let data = this.pageQueryStaff;
      queryStaffList(data).then(res => {
        console.log(res);
        let data = res.data.list;
        for (let i = 0; i <= data.length - 1; i++) {
          let arr = [];
          for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
            for (let m = 0; m <= this.provinces.length - 1; m++) {
              if (data[i].province.split(",")[j] == this.provinces[m].value) {
                arr.push(this.provinces[m].lable);
              }
            }
          }
          data[i].province1 = arr;
        }

        this.staffList = res.data.list;
        this.pageQueryStaff.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChangeStaff(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQueryStaff.page = 1;
      this.pageQueryStaff.rows = val;
      // 查询客户管理列表
      this.fetchStaffListData();
    },
    // 当前页变化
    handleCurrentChangeStaff(val) {
      this.pageQueryStaff.page = val;
      // 查询客户管理列表
      this.fetchStaffListData();
    },
    // 选中表格数据的方法
    handleSelectionChangeStaff(val) {
      this.multipleSelectionStaff = val;
    },
    // 点击整行选中
    clickRowStaff(row) {
      // this.$refs.singleTable.setCurrentRow(row);
      this.$refs.staffList.clearSelection(row);
      this.$refs.staffList.toggleRowSelection(row);
    },
    // 筛选的方法
    commonSearchStaff() {
      this.listLoading = true;
      let data = this.pageQueryStaff;
      queryStaffList(data).then(res => {
        let data = res.data.list;
        for (let i = 0; i <= data.length - 1; i++) {
          let arr = [];
          for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
            for (let m = 0; m <= this.provinces.length - 1; m++) {
              if (data[i].province.split(",")[j] == this.provinces[m].value) {
                arr.push(this.provinces[m].lable);
              }
            }
          }
          data[i].province1 = arr;
        }
        this.staffList = res.data.list;
        this.pageQueryStaff.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 弹框确定
    dialogConfirmStaff() {
      if (this.multipleSelectionStaff.length == 0) {
        this.$message.warning("请选择员工！");
        return;
      }
      // 客户id
      this.form.staffId = this.multipleSelectionStaff[0].staffId;
      this.form.staffName = this.multipleSelectionStaff[0].staffName;
      this.form.province = this.multipleSelectionStaff[0].province;
      this.form.city = this.multipleSelectionStaff[0].city;

      this.staffData = this.multipleSelectionStaff;
      this.dialogStaffTableVisible = false;
    },
    // 派单
    submitForm(form, issta) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let data = this.form;
        
          updApplyJob(data).then(res => {
            if (issta == "派单") {
              this.$message.success("派单成功");
            } else if (issta == "再次派单") {
              this.$message.success("再次派单成功");
            }
            this.$router.push({
              name: "StaffRepairs"
            });
          });
        } else {
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
        examineRemarks: "", //审核备注
        staffId:this.form.staffId
      };

      if (issta == "派单") {
        pagt.operation = "派单";
        pagt.examine = "派单";
      } else if (issta == "再次派单") {
        pagt.operation = "再次派单";
        pagt.examine = "再次派单";
      }

      Monitoringoperation(pagt).then(res => {
        this.submitForm(rows, issta);
        // 查询派单表格数据
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.go(-1);
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

