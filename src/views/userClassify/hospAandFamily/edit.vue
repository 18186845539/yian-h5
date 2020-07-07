<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="title" name="1">
          <div class="searchRow">
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="200px"
              size="small"
              class="demo-ruleForm"
            >
              <el-form-item label="用户类型：" prop="hospitalType">
                <el-radio-group v-model="form.hospitalType" @change="hospitalTypeChange">
                  <el-radio
                    v-for="item in hospitalTypes"
                    :disabled="disabledHR"
                    :key="item.id"
                    :label="item.value"
                  >{{item.lable}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="联系人：" prop="name">
                    <el-input v-model="form.name" clearable ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别：" prop="sex">
                    <el-radio-group v-model="form.sex">
                      <el-radio
                        v-for="item in sexs"
                        :key="item.id"
                        :label="item.value"
                      >{{item.lable}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="联系人电话：" prop="phone">
                    <el-input v-model="form.phone" clearable maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地址：" prop="address">
                    <el-input v-model="form.address" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 显示医院类型表单 -->
              <transition name="fade">
                <div v-if="form.hospitalType == 0">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="科室："
                        prop="department"
                        :rules="[{ required: true, message: '请选择科室', trigger: 'change' }]"
                      >
                        <el-select v-model="form.department" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in departments"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="职务："
                        prop="position"
                        :rules="[{ required: true, message: '请选择职务', trigger: 'change' }]"
                      >
                        <el-select v-model="form.position" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in positions"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item
                    label="选择客户："
                    prop="hospitalName"
                    :rules="[{ required: true, message: '请选择客户', trigger: 'change' }]"
                  >
                    <el-button type="primary" @click="selectClient">选择客户</el-button>

                    <el-table :data="clientData">
                      <el-table-column
                        property="customerCode"
                        label="客户编码"
                        align="center"
                        width="160"
                      ></el-table-column>

                      <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

                      <el-table-column property="province" label="省份" align="center">
                        <template slot-scope="scope">{{scope.row.province | dicFilter(provinces)}}</template>
                      </el-table-column>

                      <el-table-column property="city" label="城市" align="center">
                        <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
                      </el-table-column>

                      <el-table-column property="customerLevel" label="终端客户级别" align="center">
                        <template
                          slot-scope="scope"
                        >{{scope.row.customerLevel | dicFilter(customerLevels)}}</template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>

                  <!-- <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="医院名称："
                        prop="hospitalName"
                        :rules="[{ required: true, message: '请输入医院名称', trigger: 'blur' },{min: 1, max: 50,message: '长度在 1 到 50 个字符',trigger: 'blur'}]"
                      >
                        <el-input v-model="form.hospitalName" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="邮政编码："
                        prop="zipCode"
                        :rules="[{required: true,validator: checkZipCode,trigger:'blur'}]"
                      >
                        <el-input v-model.number="form.zipCode" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="使用科室："
                        prop="useDepartment"
                        :rules="[{ required: true, message: '请选择使用科室', trigger: 'change' }]"
                      >
                        <el-select v-model="form.useDepartment" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in departments"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="科室："
                        prop="department"
                        :rules="[{ required: true, message: '请选择科室', trigger: 'change' }]"
                      >
                        <el-select v-model="form.department" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in departments"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="终端客户级别："
                        prop="customerLevel"
                        :rules="[{ required: true, message: '请选择终端客户级别', trigger: 'change' }]"
                      >
                        <el-select v-model="form.customerLevel" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in customerLevels"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="职务："
                        prop="position"
                        :rules="[{ required: true, message: '请选择职务', trigger: 'change' }]"
                      >
                        <el-select v-model="form.position" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in positions"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="客户服务等级："
                        prop="customerServiceLevel"
                        :rules="[{ required: true, message: '请选择客户服务等级', trigger: 'change' }]"
                      >
                        <el-select v-model="form.customerServiceLevel" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in customerServiceLevels"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="终端客户类型："
                        prop="customerType"
                        :rules="[{ required: true, message: '请选择终端客户类型', trigger: 'change' }]"
                      >
                        <el-select v-model="form.customerType" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in customerTypes"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="省份："
                        prop="province"
                        :rules="[{ required: true, message: '请选择省份', trigger: 'change' }]"
                      >
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
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="城市："
                        prop="city"
                        :rules="[{ required: true, message: '请选择城市', trigger: 'change' }]"
                      >
                        <el-select
                          v-model="form.city"
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
                    </el-col>
                  </el-row>

                  <el-form-item
                    label="国家："
                    prop="country"
                    :rules="[{ required: true, message: '请选择国家', trigger: 'change' }]"
                  >
                    <el-select v-model="form.country" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in countrys"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>-->
                </div>
              </transition>

              <!-- 显示个人类型表单 -->
              <transition name="fade">
                <div v-if="form.hospitalType == 1">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                      <el-form-item
                        label="产品线："
                        prop="productLine"
                        :rules="[{ required: true, message: '请选择产品线', trigger: 'change' }]"
                      >
                        <el-select
                          v-model="form.productLine"
                          @change="productLineChange"
                          placeholder="请选择"
                          clearable
                        >
                          <el-option
                            v-for="item in productLines"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="型号："
                        prop="model"
                        :rules="[{ required: true, message: '请选择型号', trigger: 'change' }]"
                      >
                        <el-select
                          v-model="form.model"
                          :disabled="disabledModel"
                          placeholder="请选择"
                          clearable
                        >
                          <el-option
                            v-for="item in models"
                            :key="item.id"
                            :label="item.lable"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item
                    label="购买时间："
                    prop="buyDate"
                    :rules="[{ required: true, message: '请选择购买时间', trigger: 'change' }]"
                  >
                    <el-date-picker
                      v-model="form.buyDate"
                      type="date"
                      style="width: 200px;"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </transition>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <!-- <el-button @click="resetForm()" :disabled="disabledHR">重置</el-button> -->
                    <el-button @click="returnBtn()">返回</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 选择客户框部分 -->
    <div class="tableRow">
      <el-dialog
        :visible.sync="dialogTableVisible"
        width="70%"
        top="5vh"
        :modal-append-to-body="false"
      >
        <div>
          <!-- 筛选部分 -->
          <div
            style=" display: flex;justify-content: space-between;flex-wrap: wrap;margin-bottom:20px;"
          >
            <span>
              <span>客户编码：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQuery.customerCode" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>客户名称：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQuery.customerName" size="small" clearable></el-input>
              </span>
            </span>

            <span class="searchCol">
              <span>省份：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-select
                  v-model="pageQuery.province"
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
                  v-model="pageQuery.city"
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
                @click="commonSearch()"
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
              :data="productMessageList"
              ref="productMessageList"
              @selection-change="handleSelectionChange"
              @row-click="clickRow"
              fit
              highlight-current-row
              height="320px"
            >
              <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

              <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

              <el-table-column property="customerCode" label="客户编码" align="center" width="160"></el-table-column>

              <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

              <el-table-column property="province" label="省份" align="center">
                <template slot-scope="scope">{{scope.row.province | dicFilter(provinces)}}</template>
              </el-table-column>

              <el-table-column property="city" label="城市" align="center">
                <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
              </el-table-column>

              <el-table-column property="contacts" label="联系人" align="center"></el-table-column>

              <el-table-column property="phone" label="电话" align="center"></el-table-column>

              <el-table-column property="useDepartment" label="科室" align="center">
                <template slot-scope="scope">{{scope.row.useDepartment | dicFilter(departments)}}</template>
              </el-table-column>
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageQuery.page"
                :page-sizes="pageSizes"
                :page-size="pageQuery.rows"
                layout="prev, pager, next, total, sizes, jumper"
                :total="pageQuery.totalCount"
              ></el-pagination>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取所有字典/省份对应的城市/产品线对应的型号
import { getAllDict, getCity, getModel } from "@/api/common";
// 注册医院家庭客户/查询修改医院家庭客户/修改医院家庭客户保存/验证用户是否存在(电话号码)
import {
  registerHospital,
  queryHospital,
  updHospital,
  adminIsExist
} from "@/api/userClassify";

// 查询客户管理列表
import { queryAdminCustomerList } from "@/api/clientServe";

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
      const phoneReg = /^1[34578]\d{9}$/;
      if (!value) {
        return callback(new Error("请输入电话号码"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的11位电话号码"));
        }
      }
    };

    return {
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 所有客户类型
      hospitalTypes: [],
      // 所有性别
      sexs: [],
      // 所有职务
      positions: [],
      // 所有科室
      departments: [],
      // 所有省份
      provinces: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      // 所有城市
      cityes: [],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有终端客户级别
      customerLevels: [],
      // 所有国家
      countrys: [],
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      // 重置和客户类型禁用
      disabledHR: false,
      // 验证手机号是否改变
      yanzhengPhone: "",

      // 客户弹框
      dialogTableVisible: false,
      // 所有客户数据
      productMessageList: [],
      // 选中的客户数据
      multipleSelection: [],
      // 显示选中客户数据
      clientData: [],

      // 表单数据
      form: {
        // 客户id
        customerId: "",

        hospitalType: "0",
        name: "",
        sex: "0",
        phone: "",
        address: "",

        hospitalName: "",
        department: "",
        useDepartment: "",
        position: "",
        zipCode: "",
        customerServiceLevel: "",
        customerType: "",
        customerLevel: "",
        province: "",
        city: "",
        country: "",

        productLine: "",
        model: "",
        buyDate: ""
      },

      //   筛选客户数据
      pageQuery: {
        // 查询医院
        userType: "0",
        customerCode: "",
        customerName: "",
        province: "",
        city: "",

        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30],

      // 邮政编码验证规则
      checkZipCode: (rule, value, callback) => {
        const zipCodeReg = /^[0-9]{6}$/;
        if (!value) {
          return callback(new Error("请输入邮政编码"));
        }
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (zipCodeReg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的6位邮政编码"));
          }
        }
      },
      // 表单验证
      rules: {
        // 客户类型验证
        hospitalType: [
          {
            required: true,
            message: "请选择客户类型",
            trigger: "change"
          }
        ],
        // 联系人名称验证
        name: [
          {
            required: true,
            message: "请输入联系人名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        // 性别验证
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        // 电话验证
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        // 地址验证
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // 判断修改新增还是新增
    this.addOrEdit();
    // 获取所有字典值
    this.fetchAllDict();
  },
  methods: {
    //判断修改新增还是新增
    addOrEdit() {
      let _this = this;
      let sendData = _this.$route.query.sendData;
      if (sendData) {
        // 修改标题
        _this.title = "修改医院/家庭用户";
        // 查询表单
        let data = {
          userId: sendData
        };
        queryHospital(data).then(res => {
          _this.form.userId = res.data.userId;
          _this.form.hospitalType = res.data.hospitalType;
          _this.form.name = res.data.name;
          _this.form.sex = res.data.sex;
          _this.form.phone = res.data.phone;
          _this.yanzhengPhone = res.data.phone;
          _this.form.address = res.data.address;
          _this.form.hospitalName = res.data.hospitalName;
          _this.form.department = res.data.department;
          _this.form.useDepartment = res.data.useDepartment;
          _this.form.position = res.data.position;
          _this.form.zipCode = res.data.zipCode;
          _this.form.customerServiceLevel = res.data.customerServiceLevel;
          _this.form.customerType = res.data.customerType;
          _this.form.customerLevel = res.data.customerLevel;
          _this.form.province = res.data.province;
          _this.form.city = res.data.city;
          _this.form.country = res.data.country;
          _this.form.productLine = res.data.productLine;
          _this.form.model = res.data.model;

          // 回显表格
          res.data.customerName = res.data.hospitalName;
          this.clientData.push(res.data);

          if (_this.form.hospitalType == "1") {
            _this.form.buyDate = res.data.buyDate.substring(0, 10);
          }
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加医院/家庭用户";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data1 = "POSITION";

      getAllDict(data1).then(res => {
        // 获取所有职务
        this.positions = res.data.POSITION;
      });

      let data =
        "DEPARTMENT,HOSPITAL_TYPE,PROVINCE,SEX,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,CITY,PRODUCT_LINE,EQUI_MODEL";
      getAllDict(data).then(res => {
        // 获取所有客户类型
        this.hospitalTypes = res.data.HOSPITAL_TYPE;
        // 获取所有性别
        this.sexs = res.data.SEX;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        // this.positions = res.data.POSITION;
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
        this.cityes = res.data.CITY;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
      });
    },
    // 获取所有省份对应的城市
    provinceChange(val) {
      // 清空城市
      this.form.city = "";
      this.disabledCity = true;

      let obj = {};
      obj = this.provinces.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledCity = false;
        getCity(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.citys = res.data.CITY;
          } else {
            this.citys = [];
          }
        });
      }
    },
    // 获取所有生产线对应的型号
    productLineChange(val) {
      // 清空型号
      this.form.model = "";
      this.disabledModel = true;

      let obj = {};
      obj = this.productLines.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledModel = false;
        getModel(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.models = res.data.EQUI_MODEL;
          } else {
            this.models = [];
          }
        });
      }
    },
    // 客户类型变化
    hospitalTypeChange(res) {
      console.log(res);
      this.form = {
        // 客户id
        customerId: "",

        hospitalType: res,
        name: "",
        sex: "0",
        phone: "",
        address: "",

        hospitalName: "",
        department: "",
        useDepartment: "",
        position: "",
        zipCode: "",
        customerServiceLevel: "",
        customerType: "",
        customerLevel: "",
        province: "",
        city: "",
        country: "",

        productLine: "",
        model: "",
        buyDate: ""
      };
      this.clientData = [];
    },

    // 打开选择客户弹框
    selectClient() {
      this.dialogTableVisible = true;
      // 获取所有医院以及对应的值
      this.fetchListData();
    },
    // 查询客户管理列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryAdminCustomerList(data).then(res => {
        this.productMessageList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询客户管理列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询客户管理列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 点击整行选中
    clickRow(row) {
      // this.$refs.singleTable.setCurrentRow(row);
      this.$refs.productMessageList.clearSelection(row);
      this.$refs.productMessageList.toggleRowSelection(row);
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryAdminCustomerList(data).then(res => {
        this.productMessageList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 弹框确定
    dialogConfirm() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择客户！");
        return;
      }
      // 客户id
      this.form.customerId = this.multipleSelection[0].id;
      this.form.customerCode = this.multipleSelection[0].customerCode;

      this.form.city = this.multipleSelection[0].city;
      this.form.country = this.multipleSelection[0].country;
      this.form.customerLevel = this.multipleSelection[0].customerLevel;
      this.form.customerServiceLevel = this.multipleSelection[0].customerServiceLevel;
      this.form.customerType = this.multipleSelection[0].customerType;
      this.form.hospitalName = this.multipleSelection[0].customerName;
      this.form.province = this.multipleSelection[0].province;
      this.form.useDepartment = this.multipleSelection[0].useDepartment;
      this.form.userType = this.multipleSelection[0].userType;
      this.form.zipCode = this.multipleSelection[0].zipCode;

      this.clientData = this.multipleSelection;
      this.dialogTableVisible = false;
    },

    // 重置的方法
    resetForm() {
      this.form = {
        hospitalType: "0",
        name: "",
        sex: "0",
        phone: "",
        address: "",
        hospitalName: "",
        department: "",
        useDepartment: "",
        position: "",
        zipCode: "",
        customerServiceLevel: "",
        customerType: "",
        customerLevel: "",
        province: "",
        city: "",
        country: "",
        productLine: "",
        model: "",
        buyDate: ""
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
      // 是否禁用型号下拉
      this.disabledModel = true;
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;

          if (_this.yanzhengPhone != _this.form.phone) {
            let data = {
              phone: _this.form.phone,
              userType: "0",
              hospitalType: _this.form.hospitalType
            };
            adminIsExist(data).then(res => {
              if (res.msg == "可以注册") {
                let sendData = _this.$route.query.sendData;
                if (sendData) {
                  let data = _this.form;
                  updHospital(data).then(res => {
                    _this.$message.success(res.msg);
                    _this.$router.push({
                      name: "HospAandFamily"
                    });
                  });
                } else {
                  let data = _this.form;
                  registerHospital(data).then(res => {
                    _this.$message.success(res.msg);
                    _this.$router.push({
                      name: "HospAandFamily"
                    });
                  });
                }
              } else {
                this.$message.warning(res.msg);
                this.form.phone = "";
                return false;
              }
            });
          } else {
            let sendData = _this.$route.query.sendData;
            if (sendData) {
              let data = _this.form;
              updHospital(data).then(res => {
                _this.$message.success(res.msg);
                _this.$router.push({
                  name: "HospAandFamily"
                });
              });
            } else {
              let data = _this.form;
              registerHospital(data).then(res => {
                _this.$message.success(res.msg);
                _this.$router.push({
                  name: "HospAandFamily"
                });
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "HospAandFamily"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
