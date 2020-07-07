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
              style="width:900px"
            >
              <el-form-item label="生成序列号：" prop="deviceYear">
                <el-row>
                  <el-col :span="7" style="text-align: center;">
                    <span>产品线：</span>
                    <span class="searchItem">
                      <el-select
                        v-model="productLineLable"
                        @change="productLineLableChange"
                        placeholder="请选择"
                        size="small"
                        clearable
                      >
                        <el-option
                          v-for="item in productLines"
                          :key="item.id"
                          :label="item.lable"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </span>
                  </el-col>
                  <el-col :span="7" style="text-align: center;">
                    <span>型号：</span>
                    <span class="searchItem">
                      <el-select
                        v-model="modelLable"
                        :disabled="disabledLableModel"
                        placeholder="请选择"
                        size="small"
                        clearable
                      >
                        <el-option
                          v-for="item in models"
                          :key="item.id"
                          :label="item.lable"
                          :value="item.lable"
                        ></el-option>
                      </el-select>
                    </span>
                  </el-col>

                  <el-col :span="7" style="text-align: center;">
                    生产批号：
                    <el-input v-model="deviceYear" clearable style="width:120px" maxlength="9"></el-input>
                  </el-col>

                  <el-col :span="3" style="text-align: center;">
                    <el-button type="primary" @click="shengchengDeviceId">生成</el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="序列号：" >
                <el-input v-model="form.deviceId" @blur="deviceIdBlur" disabled clearable></el-input>
              </el-form-item>
              <!-- :disabled="deviceIdXG" -->
              <el-form-item label="机器保修日期：" >
                <!-- <el-input v-model="form.deviceId" @blur="deviceIdBlur" disabled clearable></el-input> -->
                  <span>
                <el-date-picker
                  v-model="form.guaranteeBeginDate"
                  style="width:200px"
                  type="date"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd"
                  size="small"
                  clearable
                ></el-date-picker>
              </span>
                    <span style="margin-left:30px;">        至  </span>
                    <span>
                <el-date-picker
                  v-model="form.guaranteeEndDate"
                   style="width:200px;margin-left:30px;"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束时间"
                  size="small"
                  clearable
                ></el-date-picker>
              </span>
              </el-form-item>
              <el-form-item
                label="选择客户："
                prop="customerId"
                :rules="[{ required: true, message: '请选择客户', trigger: 'change' }]"
              >
                <el-button type="primary" @click="selectClient">选择客户</el-button>

                <el-table :data="clientData">
                  <el-table-column property="customerCode" label="客户编码" align="center" width="160"></el-table-column>

                  <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>
                  <el-table-column property="contacts" label="联系人" align="center"></el-table-column>
                  <el-table-column property="phone" label="联系人电话" align="center"></el-table-column>

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

              <el-form-item
                label="选择产品："
                prop="deviceNo"
                :rules="[{ required: true, message: '请选择产品', trigger: 'change' }]"
              >
                <el-button type="primary" @click="selectProduct">选择产品</el-button>

                <el-table :data="productData">
                  <el-table-column property="deviceNo" label="产品代号" align="center" width="160"></el-table-column>

                  <el-table-column property="picUrls" label="产品图片" align="center">
                    <template slot-scope="scope">
                      <img 
                        v-show="scope.row.picUrls != ''"
                        :src="imgURL + scope.row.picUrls.split(',')[0]"
                        style="width:50px;height:50px"
                      />
                    </template>
                  </el-table-column>

                  <el-table-column property="productLine" label="产品线" align="center">
                    <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
                  </el-table-column>

                  <el-table-column property="productLine" label="型号" align="center">
                    <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
                  </el-table-column>

                  <el-table-column property="product" label="产品名称" align="center"></el-table-column>
                </el-table>
              </el-form-item>

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
              <span>客户类型：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-select v-model="pageQuery.userType" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in userTypes"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
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

    <!-- 选择产品弹框部分 -->
    <div class="tableRow">
      <el-dialog
        :visible.sync="dialogProductTableVisible"
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
              <span>产品线：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-select
                  v-model="pageQueryProduct.productLine"
                  @change="productLineChange"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in productLines"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <!-- <span>
              <span>型号：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-select
                  v-model="pageQueryProduct.model"
                  :disabled="disabledModel"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in models"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>-->

            <span class="searchCol">
              <span>产品名称：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQueryProduct.product" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <el-button
                @click="commonSearchProduct()"
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
              :data="productList"
              ref="productList"
              @selection-change="handleSelectionChangeProduct"
              @row-click="clickRowProduct"
              fit
              highlight-current-row
              height="320px"
            >
              <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

              <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

              <el-table-column property="deviceNo" label="产品代号" align="center" width="160"></el-table-column>

              <el-table-column property="picUrls" label="产品图片" align="center">
                <template slot-scope="scope">
                  <img
                    v-show="scope.row.picUrls != ''"
                    :src="imgURL + scope.row.picUrls.split(',')[0]"
                    style="width:50px;height:50px"
                  />
                </template>
              </el-table-column>

              <el-table-column property="productLine" label="产品线" align="center">
                <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
              </el-table-column>

              <template property="model" label="型号" align="center">
                <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
              </template>

              <el-table-column property="product" label="产品名称" align="center"></el-table-column>
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
                @size-change="handleSizeChangeProduct"
                @current-change="handleCurrentChangeProduct"
                :current-page="pageQueryProduct.page"
                :page-sizes="pageSizes"
                :page-size="pageQueryProduct.rows"
                layout="prev, pager, next, total, sizes, jumper"
                :total="pageQueryProduct.totalCount"
              ></el-pagination>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogProductTableVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogConfirmProduct" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取所有字典/省份对应的城市/产品线对应的型号
import { getAllDict, getCity, getModel } from "@/api/common";

// 查询客户管理列表/查询产品信息列表/查询修改产品档案/添加产品档案/修改产品档案保存/验证序列号是否存在
import {
  queryAdminCustomerList,
  queryProductInfoList,
  queryArchivesDetailNew,
  insertProductArchivesNew,
  updArchivesInfoNew,
  productArchivesExist
} from "@/api/clientServe";

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
    // 序列号验证规则
    let checkDeviceId = (rule, value, callback) => {
      const deviceIdReg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        return callback(new Error("序列号不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (deviceIdReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入4到16位字母、数字或下划线"));
      }
    };

    return {
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
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
      // 修改禁用序列号
      deviceIdXG: false,
      // 产品线
      productLineLable: "",

      // guaranteeBeginDate:"",

      // guaranteeEndDate:"",
      // 型号
      modelLable: "",
      // 禁用
      disabledLableModel: true,
      // 时间序列部分
      deviceYear: "",
      // //客户类型搜索
      // CustomerTypelist:[

      // ],

      // 客户弹框
      dialogTableVisible: false,
      // 所有客户数据
      productMessageList: [],
      // 选中的客户数据
      multipleSelection: [],
      // 显示选中客户数据
      clientData: [],

      // 产品弹框
      dialogProductTableVisible: false,
      // 所有产品数据
      productList: [],
      // 选中的产品数据
      multipleSelectionProduct: [],
      // 显示选中产品数据
      productData: [],

      //客户类型
      userTypes: [{ id: 301, lable:"全部", value: "0,2" }],
      // 表单数据
      form: {
        deviceId: "",
        deviceNo: "",
        customerId: ""
      },

      //   筛选客户数据
      pageQuery: {
        // 查询医院
        userType: "",
        customerCode: "",
        customerName: "",
        province: "",
        city: "",
      //  guaranteeBeginDate:"",
      //  guaranteeEndDate:"",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      //   筛选产品数据
      pageQueryProduct: {
        productLine: "",
        model: "",
        product: "",

        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30],

      // 表单验证
      rules: {
        // 序列号验证
        deviceId: [
          {
            required: true,
            validator: checkDeviceId,
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
        _this.title = "修产品档案客户";
        // 查询表单
        let data = {
          id: sendData
        };
        queryArchivesDetailNew(data).then(res => {
          // this.deviceIdXG = true;

          this.form.id = res.data.id;

          this.form.deviceId = res.data.deviceId;
          this.form.deviceNo = res.data.deviceNo;
          this.form.customerId = res.data.customerId;
          // 回显表格
          this.clientData.push(res.data);
          this.productData.push(res.data);
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加产品档案客户";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data1 = 'PRODUCT_LINE'
      getAllDict(data1).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
      });
      let data =
        "POSITION,DEPARTMENT,HOSPITAL_TYPE,PROVINCE,SEX,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,CITY,EQUI_MODEL,USERTYPE";
      getAllDict(data).then(res => {
        // 获取所有客户类型
        this.hospitalTypes = res.data.HOSPITAL_TYPE;
        // 获取所有性别
        this.sexs = res.data.SEX;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.POSITION;
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
        // this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        //客户类型
        for (let idnum = 0; idnum <= res.data.USERTYPE.length - 1; idnum++) {
          this.userTypes.push(res.data.USERTYPE[idnum]);
        }
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

    // 获取所有生产线对应的型号
    productLineLableChange(val) {
      // 清空型号
      this.modelLable = "";
      this.disabledLableModel = true;

      let obj = {};
      obj = this.productLines.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledLableModel = false;
        getModel(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.models = res.data.EQUI_MODEL;
          } else {
            this.models = [];
          }
        });
      }
    },
    // 验证序列号
    deviceIdBlur() {
      let data = {
        deviceId: this.form.deviceId
      };
      productArchivesExist(data)
        .then(res => {})
        .catch(err => {
          this.form.deviceId = "";
        });
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
      this.pageQuery.userType = "0,2";
      let data = this.pageQuery;
      console.log(data);
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

      console.log(this.multipleSelection);
      this.clientData = this.multipleSelection;

      this.dialogTableVisible = false;
    },

    // 打开选择产品弹框
    selectProduct() {
      this.dialogProductTableVisible = true;
      // 获取所有员工
      this.fetchProductListData();
    },
    // 查询员工列表
    fetchProductListData() {
      this.listLoading = true;
      let data = this.pageQueryProduct;
      queryProductInfoList(data).then(res => {
        this.productList = res.data.list;
        this.pageQueryProduct.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChangeProduct(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQueryProduct.page = 1;
      this.pageQueryProduct.rows = val;
      // 查询客户管理列表
      this.fetchProductListData();
    },
    // 当前页变化
    handleCurrentChangeProduct(val) {
      this.pageQueryProduct.page = val;
      // 查询客户管理列表
      this.fetchProductListData();
    },
    // 选中表格数据的方法
    handleSelectionChangeProduct(val) {
      this.multipleSelectionProduct = val;
    },
    // 点击整行选中
    clickRowProduct(row) {
      // this.$refs.singleTable.setCurrentRow(row);
      this.$refs.productList.clearSelection(row);
      this.$refs.productList.toggleRowSelection(row);
    },
    // 筛选的方法
    commonSearchProduct() {
      this.listLoading = true;
      let data = this.pageQueryProduct;
      queryProductInfoList(data).then(res => {
        this.productList = res.data.list;
        this.pageQueryProduct.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 弹框确定
    dialogConfirmProduct() {
      if (this.multipleSelectionProduct.length == 0) {
        this.$message.warning("请选择产品！");
        return;
      }
      // 产品代号
      this.form.deviceNo = this.multipleSelectionProduct[0].deviceNo;

      this.productData = this.multipleSelectionProduct;
      this.dialogProductTableVisible = false;
    },
    // 生成序列号
    shengchengDeviceId() {
      if (!this.modelLable ) {
        this.$message.warning("型号不能为空！");
        return;
      }
      if (!this.deviceYear) {
        this.$message.warning("生产批号不能为空！");
        return;
      }
      const deviceYearReg = /^[A-Z]{4}[0-9]{3,5}$/;
      //  const deviceYearReg = /^[A-Z]{4}([a-zA-Z0-9_-]){5}$/;
      if (!deviceYearReg.test(this.deviceYear)) {
        this.$message.warning("输入框只能输入4位大写字母和三至五位数字！");
        return;
      }
      this.form.deviceId = this.modelLable + this.deviceYear;
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;
          let sendData = _this.$route.query.sendData;
          if (sendData) {
            let data = _this.form;
            data.isUpdate = 'update';
            updArchivesInfoNew(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ProductRecord"
              });
            });
          } else {
            let data = _this.form;
            insertProductArchivesNew(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ProductRecord"
              });
            });
          }
        } else {
          return false;
        }
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
