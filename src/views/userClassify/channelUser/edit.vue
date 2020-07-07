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
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="代理商名称：" prop="channelName">
                    <el-input v-model="form.channelName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地址：" prop="address">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="省份：" prop="province">
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
                  <el-form-item label="城市：" prop="city">
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

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="联系人：" prop="contactsName">
                    <el-input v-model="form.contactsName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人电话：" prop="phone">
                    <el-input v-model="form.phone" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="终端客户级别：" prop="customerLevel">
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
                  <el-form-item label="终端客户类型：" prop="customerType">
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
                  <el-form-item label="客户服务等级：" prop="customerServiceLevel">
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
                  <el-form-item label="代理级别：" prop="channelLevel">
                    <el-select v-model="form.channelLevel" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in channelLevels"
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
                  <el-form-item label="使用科室：" prop="useDepartment">
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
                  <el-form-item label="职务：" prop="position">
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
                <el-col :span="12">
                  <el-form-item label="是否签约：" prop="isSigning">
                    <el-radio-group v-model="form.isSigning">
                      <el-radio
                        v-for="item in isSignings"
                        :key="item.id"
                        :label="item.value"
                      >{{item.lable}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="邮政编码：" prop="zipCode">
                <el-input v-model="form.zipCode" style="width: 200px;" maxlength="6"></el-input>
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
  </div>
</template>

<script>
// 获取所有客户类型/有省份/省份对应的城市
import { getAllDict, getCity } from "@/api/common";
// 注册渠道用户/查询修渠道用户/修改渠道用户保存/验证用户是否存在(电话号码)
import {
  registerChannel,
  queryChannel,
  updChannel,
  adminIsExist
} from "@/api/userClassify";

export default {
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
          callback(new Error("请输入正确的11位电话号码"));
        }
      }
    };
    // 邮政编码验证规则
    let checkZipCode = (rule, value, callback) => {
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
    };

    return {
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
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
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有终端客户级别
      customerLevels: [],
      // 是否签约
      isSignings: [],
      // 所有代理级别
      channelLevels: [],
      // 重置和客户类型禁用
      disabledHR: false,
      // 验证手机号是否改变
      yanzhengPhone: "",
      // 表单数据
      form: {
        channelName: "",
        province: "",
        city: "",
        contactsName: "",
        phone: "",
        customerLevel: "",
        customerType: "",
        customerServiceLevel: "",
        address: "",
        zipCode: "",
        useDepartment: "",
        channelLevel: "",
        isSigning: "",
        position: "",
        sex: ""
      },
      // 表单验证
      rules: {
        // 代理商名称验证
        channelName: [
          { required: true, message: "请输入代理商名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        // 省份验证
        province: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        // 城市验证
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        // 联系人验证
        contactsName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 电话验证
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 客户服务等级验证
        customerServiceLevel: [
          { required: true, message: "请选择客户服务等级", trigger: "change" }
        ],
        // 终端客户类型验证
        customerType: [
          { required: true, message: "请选择终端客户类型", trigger: "change" }
        ],
        // 终端客户级别验证
        customerLevel: [
          { required: true, message: "请选择终端客户级别", trigger: "change" }
        ],
        // 邮政编码验证
        zipCode: [{ required: true, validator: checkZipCode, trigger: "blur" }],
        // 地址验证
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        // 使用科室验证
        useDepartment: [
          { required: true, message: "请选择使用科室", trigger: "change" }
        ],
        // 代理级别验证
        channelLevel: [
          { required: true, message: "请选择代理级别", trigger: "change" }
        ],
        // 是否签约验证
        isSigning: [
          { required: true, message: "请选择是否签约", trigger: "change" }
        ],
        // 性别验证
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        // 职务验证
        position: [{ required: true, message: "请选择职务", trigger: "change" }]
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
        _this.title = "修改渠道用户";
        // 查询表单
        let data = {
          userId: sendData
        };
        queryChannel(data).then(res => {
          _this.form.userId = res.data.userId;
          _this.form.channelName = res.data.channelName;
          _this.form.province = res.data.province;
          _this.form.city = res.data.city;
          _this.form.contactsName = res.data.contactsName;
          _this.form.phone = res.data.phone;
          _this.yanzhengPhone = res.data.phone;
          _this.form.customerLevel = res.data.customerLevel;
          _this.form.customerType = res.data.customerType;
          _this.form.customerServiceLevel = res.data.customerServiceLevel;
          _this.form.address = res.data.address;
          _this.form.zipCode = res.data.zipCode;
          _this.form.useDepartment = res.data.useDepartment;
          _this.form.channelLevel = res.data.channelLevel;
          _this.form.isSigning = res.data.isSigning;
          _this.form.position = res.data.position;
          _this.form.sex = res.data.sex;
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加渠道用户";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {

       let data1 = "CHANNEL_POSITION";
      getAllDict(data1).then(res => {
        // 获取所有职务
        this.positions = res.data.CHANNEL_POSITION;
      });
      
      let data =
        "DEPARTMENT,PROVINCE,SEX,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,WHETHER,CHANNEL_TYPE,CITY";
      getAllDict(data).then(res => {
        // 获取所有性别
        this.sexs = res.data.SEX;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        // this.positions = res.data.CHANNEL_POSITION;
        // 获取所有客户服务等级
        this.customerServiceLevels = res.data.CUSTOMER_SERVICE_LEVEL;
        // 获取所有终端客户类型
        this.customerTypes = res.data.CUSTOMER_TYPE;
        // 获取所有终端客户级别
        this.customerLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.citys = res.data.CITY;
        //获取是否签约
        this.isSignings = res.data.WHETHER;
        // 获取所有代理级别
        this.channelLevels = res.data.CHANNEL_TYPE;
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
    // 重置的方法
    resetForm() {
      this.form = {
        channelName: "",
        province: "",
        city: "",
        contactsName: "",
        phone: "",
        customerLevel: "",
        customerType: "",
        customerServiceLevel: "",
        address: "",
        zipCode: "",
        useDepartment: "",
        channelLevel: "",
        isSigning: "",
        position: "",
        sex: ""
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;
          if (_this.yanzhengPhone != _this.form.phone) {
            let data = {
              phone: _this.form.phone,
              userType: "1"
            };
            adminIsExist(data).then(res => {
              if (res.msg == "可以注册") {
                let sendData = _this.$route.query.sendData;
                if (sendData) {
                  let data = _this.form;
                  updChannel(data).then(res => {
                    _this.$message.success(res.msg);
                    _this.$router.push({
                      name: "ChannelUser"
                    });
                  });
                } else {
                  let data = _this.form;
                  registerChannel(data).then(res => {
                    _this.$message.success(res.msg);
                    _this.$router.push({
                      name: "ChannelUser"
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
              updChannel(data).then(res => {
                _this.$message.success(res.msg);
                _this.$router.push({
                  name: "ChannelUser"
                });
              });
            } else {
              let data = _this.form;
              registerChannel(data).then(res => {
                _this.$message.success(res.msg);
                _this.$router.push({
                  name: "ChannelUser"
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
        name: "ChannelUser"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

