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
                  <el-form-item label="用户名：" prop="userName">
                    <el-input v-model="form.userName" :disabled="disabledHR"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item v-if="editShow" label="密码：" prop="password">
                    <el-input v-model="form.password" show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="员工姓名：" prop="staffName">
                    <el-input v-model="form.staffName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话：" prop="phone">
                    <el-input v-model="form.phone" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="员工等级：" prop="level">
                    <el-select v-model="form.level" placeholder="请选择">
                      <el-option
                        v-for="item in levels"
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
                  <el-form-item label="省份：" prop="province1">
                    <el-select
                      v-model="form.province1"
                      @change="provinceChange"
                      placeholder="请选择"
                      multiple
                      collapse-tags
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
                <!-- <el-col :span="12">
                  <el-form-item label="城市：" prop="city">
                    <el-select v-model="form.city" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in citys"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>-->
                <el-col :span="12">
                  <el-form-item v-if="editShow" label="创建人：">
                    <el-input v-model="form.createName" style="width:200px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="产品线：" prop="productLine1">
                    <el-select v-model="form.productLine1" placeholder="请选择" multiple collapse-tags>
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
                  <!-- <el-form-item v-if="editShow" label="创建人：" prop="createName">
                    <el-input v-model="form.createName" style="width:200px"></el-input>
                  </el-form-item>-->
                </el-col>
              </el-row>

              <!-- 图片相关 -->
              <el-form-item label="上传签名：">
                <el-upload
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="image/jpeg, image/png"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <P class="text">请保证图片格式正确(PNG、JPEG)</P>
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
import { getToken } from "@/utils/auth";

// 获取所有字典/省份对应的城市
import { getAllDict, getCity } from "@/api/common";
// 注册员工信息/查询修改员工信息/修改员工信息保存
import { addStaff, queryStaff, updStaff } from "@/api/userClassify";
export default {
  data() {
    // 用户名验证规则
    let checkUserName = (rule, value, callback) => {
      const userNameReg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (userNameReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入4到16位字母、数字或下划线"));
      }
    };
    // 密码证规则
    let checkPassword = (rule, value, callback) => {
      const passwordReg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (passwordReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入4到16位字母、数字或下划线"));
      }
    };
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

    return {
      // 图片上传地址
      imgHttp: this.$store.state.settings.socketURL + "/upload/image",
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      imageUrl: "",

      token: getToken(),

      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 所有省份
      provinces: [],
      // 所有产品线
      productLines: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      // 所有员工等级
      levels: [],
      // 修改时隐藏
      editShow: true,
      // 重置和客户类型禁用
      disabledHR: false,

      form: {
        userName: "",
        password: "",
        createName: "",
        province: "",
        province1: "",
        city: "",
        staffName: "",
        phone: "",
        email: "",
        level: "",
        productLine: "",
        productLine1: "",
        signPic: ""
      },
      // 表单验证
      rules: {
        // 用户名验证
        userName: [
          { required: true, validator: checkUserName, trigger: "blur" }
        ],
        // 密码验证
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        // 创建人验证
        createName: [
          { required: true, message: "请输入创建人", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 省份验证
        province1: [{ required: true, message: "请选择省份", trigger: "blur" }],
        // 城市验证
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        // 员工名称验证
        staffName: [
          { required: true, message: "请输入员工名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 电话验证
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 邮箱验证
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        // 员工等级
        level: [
          { required: true, message: "请选择员工等级", trigger: "change" }
        ],
        // 产品线
        productLine1: [
          { required: true, message: "请选择产品线", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 判断修改新增还是新增
    this.addOrEdit();
  },
  methods: {
    //判断修改新增还是新增
    addOrEdit() {
      let _this = this;
      let sendData = _this.$route.query.sendData;
      if (sendData) {
        // 修改标题
        _this.title = "修改员工用户";
        // 隐藏密码和创建人
        _this.editShow = false;
        // 查询表单
        let data = { staffId: sendData };
        queryStaff(data).then(res => {
          _this.form.staffId = res.data.staffId;
          _this.form.userName = res.data.userName;
          // _this.form.province = res.data.province.split(",");
          _this.form.province1 = res.data.province.split(",");

          _this.form.city = res.data.city;
          _this.form.staffName = res.data.staffName;
          _this.form.phone = res.data.phone;
          _this.form.email = res.data.email;
          _this.form.level = res.data.level;

          // _this.form.productLine = res.data.productLine.split(",");
          _this.form.productLine1 = res.data.productLine.split(",");
          
          _this.form.signPic = res.data.signPic;

          if (res.data.signPic) {
            _this.imageUrl = _this.imgURL + res.data.signPic;
          }
          // 获取所有字典值
          this.fetchAllDict();
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加员工用户";
        // 启用重置按钮
        _this.disabledHR = false;

        // 获取所有字典值
        this.fetchAllDict();
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data = "PROVINCE,CITY,STAFF_LEVEL,PRODUCT_LINE";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        let sendData = this.$route.query.sendData;
        if (sendData) {
          getCity(this.form.province).then(res => {
            if (JSON.stringify(res.data) != "{}") {
              this.citys = res.data.CITY;
            } else {
              this.citys = [];
            }
          });
        } else {
          this.citys = res.data.CITY;
        }
        // 获取所有员工等级
        this.levels = res.data.STAFF_LEVEL;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
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
      // if (obj != undefined) {
      //   let data = obj.id;
      //   this.disabledCity = false;
      //   getCity(data).then(res => {
      //     if (JSON.stringify(res.data) != "{}") {
      //       this.citys = res.data.CITY;
      //     } else {
      //       this.citys = [];
      //     }
      //   });
      // }
    },
    // 图片相关
    handleAvatarSuccess(res, file) {
      this.form.signPic = res.data[0];
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (["image/jpeg", "image/jpg", "image/png"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的图片格式哦!");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过10MB哦!");
        return false;
      }
      return true;
    },
    // 重置的方法
    resetForm() {
      this.form = {
        userName: "",
        password: "",
        createName: "",
        province: "",
        city: "",
        staffName: "",
        phone: "",
        email: "",
        level: ""
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;
          let sendData = _this.$route.query.sendData;
          if (sendData) {

            _this.form.province = _this.form.province1.join(",");
            _this.form.productLine = _this.form.productLine1.join(",");
             delete _this.form['productLine1'];
             delete _this.form['province1'];
            let data = _this.form;
          
            updStaff(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "StaffList"
              });
            });
          } else {
            _this.form.province = _this.form.province1.join(",");
            _this.form.productLine = _this.form.productLine1.join(",");
             delete _this.form['productLine1'];
             delete _this.form['province1'];
            let data = _this.form;
            addStaff(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "StaffList"
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
        name: "StaffList"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>