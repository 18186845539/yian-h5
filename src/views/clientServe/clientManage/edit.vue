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
                <el-col :span="14">
                  <el-form-item label="客户类型：" prop="userType">
                    <el-radio-group v-model="form.userType">
                      <el-radio
                        v-for="item in userTypes"
                        :key="item.id"
                        :label="item.value"
                      >{{item.lable}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="客户名称：" prop="customerName" v-if="form.userType != 2">
                    <el-input v-model="form.customerName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="14">
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
                <el-col :span="10">
                  <el-form-item label="城市：" prop="city">
                    <el-select
                      v-model="form.city"
                      :disabled="disabledCity"
                        @change="cityChange"
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
              <el-form-item label="区域：" prop="district">
                    <el-select
                      v-model="form.district"
                      :disabled="disabledDistrict"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in districts"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="14">
                  <el-form-item label="主联系人：" prop="contacts">
                    <el-input v-model="form.contacts"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="电话：" prop="phone">
                    <el-input v-model="form.phone" maxlength="11"></el-input>
                  </el-form-item>
                  <i class="el-icon-plus clolos" @click="addContacts"></i>
                </el-col>
              </el-row>

              <el-row
                type="flex"
                class="row-bg"
                justify="space-around"
                v-for="(name,index) in form.contactList"
                :key="index"
              >
                <el-col :span="14">
                  <el-form-item label="副联系人：">
                    <el-input v-model="name.contacts"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="电话：">
                    <el-input v-model="name.phone" maxlength="11"></el-input>
                  </el-form-item>
                  <i class="el-icon-delete clolos clolos1" @click="delContacts(index)"></i>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="14">
                  <el-form-item label="地址：" prop="address">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="邮编：" prop="zipCode" v-if="form.userType != 2">
                    <el-input v-model="form.zipCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around" v-if="form.userType != 2">
                <el-col :span="14">
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
                <el-col :span="10">
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
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around" v-if="form.userType != 2">
                <el-col :span="14">
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
                <el-col :span="10">
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

              <!-- <el-form-item label="客户编码：" prop="customerCode">
                <el-input v-model="form.customerCode"></el-input>
              </el-form-item>-->

              <!-- <el-form-item label="科室：" prop="department">
                <el-select v-model="form.department" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in departments"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>-->

              <el-form-item label="国家：" prop="country" v-if="form.userType != 2">
                <el-select v-model="form.country" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in countrys"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
// 获取所有字典/省份对应的城市
import { getAllDict, getCity,getDistrict} from "@/api/common";
// 添加客户信息/查询修改客户信息/修改客户信息保存
import {
  addCustomerInfoById,
  queryCustomernfoById,
  updCustomerInfoById
} from "@/api/clientServe";

export default {
  data() {
    // 手机号验证规则
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^[0-9]*$/;
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
          callback(new Error("邮政编码格式不正确"));
        }
      }
    };

    // 客户名称验证规则
    let checkCustomerName = (rule, value, callback) => {
      const customerNameReg = /^[\u4E00-\u9FA5A-Za-z].{0,50}$/;
      if (!value) {
        return callback(new Error("客户名称不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (customerNameReg.test(value)) {
        callback();
      } else {
        callback(new Error("首位只能是字母或汉字"));
      }
    };

    return {
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 所有客户类型
      userTypes: [],
      // 所有科室
      departments: [],
      // 所有省份
      provinces: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      disabledDistrict:true,
      //城市对应区域下拉
      districts:[],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有终端客户级别
      customerLevels: [],
      // 所有国家
      countrys: [],
      // 重置和客户类型禁用
      disabledHR: false,
      // 表单数据
      form: {
        userType: "",
        customerCode: "",
        customerName: "",
        contactList: [],
        province: "",
        city: "",
        district:"",
        contacts: "",
        phone: "",
        customerLevel: "",
        customerType: "",
        customerServiceLevel: "",
        address: "",
        zipCode: "",
        useDepartment: "",
        department: "",
        country: ""
      },
      // 表单验证
      rules: {
        // 客户类型验证
        userType: [
          { required: true, message: "请选择客户类型", trigger: "change" }
        ],
        // 客户名称验证
        customerName: [
          { required: true, validator: checkCustomerName, trigger: "blur" }
        ],
        // 省份验证
        province: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        // 城市验证
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
         //区域验证
        district: [{ required: true, message: "请选择区域", trigger: "change" }],
        // 联系人验证
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        // 电话
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
        // 地址验证
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        // 邮政编码验证
        // zipCode: [{ required: true, validator: checkZipCode, trigger: "blur" }],
        // 使用科室验证
        useDepartment: [
          { required: true, message: "请选择使用科室", trigger: "change" }
        ],
        // 国家验证
        country: [{ required: true, message: "请选择国家", trigger: "change" }]
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
    // 客户类型变化
    hospitalTypeChange(res) {
      this.form = {
        userType: res,
        customerCode: "",
        customerName: "",
        province: "",
        contactList: [],
        city: "",
        district:"",
        contacts: "",
        phone: "",
        customerLevel: "",
        customerType: "",
        customerServiceLevel: "",
        address: "",
        zipCode: "",
        useDepartment: "",
        department: "",
        country: ""
      };
      this.clientData = [];
    },

    //添加联系人
    addContacts(){
      this.form.contactList.push({ contacts: "", phone: "" })
    },
    //删除联系人
    delContacts(n){
      this.form.contactList.splice(n,1)
    },

    //判断修改新增还是新增
    addOrEdit() {
      let _this = this;
      let id = _this.$route.query.sendData;
      if (id) {
        // 修改标题
        _this.title = "修改客户信息";
        // 查询表单
        let data = { id: id };
        queryCustomernfoById(data).then(res => {
          _this.form.id = res.data.id;
          _this.form.userType = res.data.userType;
          _this.form.customerCode = res.data.customerCode;
          _this.form.customerName = res.data.customerName;
          _this.form.province = res.data.province;
          _this.form.contactList = res.data.contactList;
          _this.form.city = res.data.city;
          _this.form.district = res.data.district;
          _this.form.contacts = res.data.contacts;
          _this.form.phone = res.data.phone;
          _this.form.customerLevel = res.data.customerLevel;
          _this.form.customerType = res.data.customerType;
          _this.form.customerServiceLevel = res.data.customerServiceLevel;
          _this.form.address = res.data.address;
          _this.form.zipCode = res.data.zipCode;
          _this.form.useDepartment = res.data.useDepartment;
          _this.form.department = res.data.department;
          _this.form.country = res.data.country;
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加客户信息";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "DEPARTMENT,USERTYPE,PROVINCE,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,CITY,district";
      getAllDict(data).then(res => {
        // 获取所有客户类型
        this.userTypes = res.data.USERTYPE;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
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
        this.citys = res.data.CITY;
        //获取所有区域
        this.districts = res.data.district;
     
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
     // 获取所有城市对应的区域
    cityChange(val) {
      // 清空城市
      this.form.district = "";
      this.disabledDistrict = true;

      let obj = {};
      obj = this.citys.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
   
        this.disabledDistrict = false;
        getDistrict(data).then(res => {
        
          if (JSON.stringify(res.data) != "{}") {
            this.districts = res.data.district;
           
          } else {
            this.districts = [];
          }
        });
      }
    },
    // 重置的方法
    resetForm() {
      this.form = {
        userType: "",
        customerCode: "",
        customerName: "",
        province: "",
        city: "",
        district:"",
        contacts: "",
        phone: "",
        customerLevel: "",
        customerType: "",
        customerServiceLevel: "",
        address: "",
        zipCode: "",
        useDepartment: "",
        department: "",
        country: ""
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
       // 是否禁用区域下拉
      this.disabledDistrict = true;
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;
          let id = _this.$route.query.sendData;
          if (id) {
            let data = _this.form;
            for(let i = 0 ; i < data.contactList.length;i++){
              if(data.contactList[i].createDate){
                delete data.contactList[i].createDate;
              }
              if(data.contactList[i].page){
                delete data.contactList[i].page;
              }
              if(data.contactList[i].rows){
                 delete data.contactList[i].rows;
              }
            }
            // 删除时间
            // delete data.createDate;
            // delete data.contactList[0].createDate;
            // delete data.contactList[0].page;
            // delete data.contactList[0].contactId;
            // delete data.contactList[0].rows;
            console.log(data);

            updCustomerInfoById(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ClientManage"
              });
            });
          } else {
            let data = _this.form;
            
            addCustomerInfoById(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ClientManage"
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
        name: "ClientManage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
<style scoped>
.clolos {
  width: 32px;
  height: 30px;
  background: #29affb;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 15px;
  color: #fff;
  position: absolute;
  top: 0;
  right: -43px;
}
.clolos1 {
  background: red;
}
</style>

