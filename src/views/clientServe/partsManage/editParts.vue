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
                  <el-form-item label="一级类型：" prop="oneType">
                    <el-select
                      v-model="form.oneType"
                      @change="provinceChange"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in oneTypes"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="二级产品：" prop="twoType">
                    <el-select
                      v-model="form.twoType"
                      @change="twoTypeChange"
                      :disabled="disabledTwoType"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in twoTypes"
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
                  <el-form-item label="三级型号：" prop="model">
                    <el-select
                      v-model="form.model"
                      :disabled="disabledThreeType"
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
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="配件名称：" prop="partsName">
                    <el-input v-model="form.partsName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="物料编码：" prop="materielCode">
                    <el-input v-model="form.materielCode" maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>

              <!-- 图片相关 -->
              <el-form-item
                prop="pictureFlag"
                label="上传图片："
                :rules="[{required: true, message: '请选择图片',trigger: ['change']}]"
              >
                <el-upload
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="image/jpeg, image/png"
                  :auto-upload="false"
                  :multiple="true"
                  list-type="picture-card"
                  :file-list="imagesList"
                  :on-remove="removeImg"
                  :before-upload="beforeUploadImg"
                  :on-change="fileChange"
                  :on-success="fileUploadSuccess"
                  :on-exceed="exceedAstrict"
                  :limit="3"
                  ref="upload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <P class="text">请保证图片格式正确(PNG、JPEG)，且不超过10M,最多上传三张</P>
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
// 获取所有字典值/获取一级类型对应的二级类型/获取二级类型对应的三级型号/图片上传
import { getAllDict, getTwoTyep, getThreeTyep, uploading } from "@/api/common";
// 添加配件信息/查询修改配件信息/修改配件信息保存
import {
  insertPartsBuy,
  queryBuyInfoById,
  updatePartsBuyById
} from "@/api/clientServe";

export default {
  data() {
     // 序列号验证规则
    let checkDeviceId = (rule, value, callback) => {
      const deviceIdReg = /^[0-9]{9}$/;
      if (!value) {
        return callback(new Error("物料编码不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (deviceIdReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入9位数字的物料编码"));
      }
    };
    return {
      // 图片上传地址
      imgHttp: this.$store.state.settings.socketURL + "/upload/image",
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 图片列表
      imagesList: [],
      // 接收图片路径的数组
      imgURLList: [],

      token:getToken(),

      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 所有一级类型
      oneTypes: [],
      // 是否禁用二级类型
      disabledTwoType: true,
      // 一级类型对应的二级类型下拉
      twoTypes: [],
      // 是否禁用三级型号
      disabledThreeType: true,
      // 所有三级型号
      models: [],
      // 重置禁用
      disabledHR: false,

      // 表单数据
      form: {
        picture: "",
        oneType: "",
        twoType: "",
        partsName: "",
        model: "",
        //物料编码
        materielCode: "",
        // 图片相关
        hasNew: false,
        pictureFlag: ""
      },
      // 表单验证
      rules: {
        // 一级类型验证
        oneType: [
          {
            required: true,
            message: "请选择一级类型",
            trigger: "change"
          }
        ],
        // 二级产品验证
        twoType: [
          {
            required: true,
            message: "请选择二级产品",
            trigger: "change"
          }
        ],
        // 三级型号验证
        model: [
          {
            required: true,
            message: "请选择三级型号",
            trigger: "change"
          }
        ],
        // 物料编码
        materielCode: [
          {
            required: true,
            validator: checkDeviceId,
            trigger: "blur"
          }
        ],
        // 配件名称验证
        partsName: [
          {
            required: true,
            message: "请输入配件名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
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
    //判断修改还是新增
    addOrEdit() {
      let _this = this;
      let sendData = _this.$route.query.sendData;
      if (sendData) {
        // 修改标题
        _this.title = "修改配件";
        // 查询表单
        let data = {
          id: sendData
        };
        queryBuyInfoById(data).then(res => {
          _this.form.id = res.data.id;
          //   图片相关
          _this.form.picture = res.data.picture;
          _this.form.pictureFlag = "1";
          // 图片回显
          for (let s of res.data.picture.split(",")) {
            if (s) {
              _this.imagesList.push({
                name: s,
                url: _this.imgURL + s
              });
              _this.imgURLList.push(s);
            }
          }

          _this.form.materielCode = res.data.materielCode;
          _this.form.oneType = res.data.oneType;
          _this.form.twoType = res.data.twoType;
          _this.form.partsName = res.data.partsName;
          _this.form.model = res.data.model;
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加配件";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data = "PARTS_TYPE_ONE,PARTS_TYPE_TWO,PARTS_TYPE_THREE";
      getAllDict(data).then(res => {
        // 获取所有一级类型
        this.oneTypes = res.data.PARTS_TYPE_ONE;
        // 获取所有二级类型
        this.twoTypes = res.data.PARTS_TYPE_TWO;
        // 获取所有三级型号
        this.models = res.data.PARTS_TYPE_THREE;
      });
    },
    // 获取所有一级类型对应的二级类型
    provinceChange(val) {
      // 清空并禁用二级产品
      this.form.twoType = "";
      this.disabledTwoType = true;
      // 清空并禁用三级型号
      this.form.model = "";
      this.disabledThreeType = true;

      let obj = {};
      obj = this.oneTypes.find(item => {
        return item.value === val;
      });
      if (obj) {
        let data = obj.id;
        this.disabledTwoType = false;
        getTwoTyep(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.twoTypes = res.data.PARTS_TYPE_TWO;
          } else {
            this.twoTypes = [];
          }
        });
      }
    },
    // 获取所有二级类型对应的三级型号
    twoTypeChange(val) {
      // 清空并禁用三级型号
      this.form.model = "";
      this.disabledThreeType = true;

      let obj = {};
      obj = this.twoTypes.find(item => {
        return item.value === val;
      });
      if (obj) {
        let data = obj.id;
        this.disabledThreeType = false;
        getThreeTyep(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.models = res.data.PARTS_TYPE_THREE;
          } else {
            this.models = [];
          }
        });
      }
    },
    // 重置的方法
    resetForm() {
      this.form = {
        picture: "",
        oneType: "",
        twoType: "",
        partsName: "",
        model: "",
        // 图片相关
        hasNew: false,
        pictureFlag: ""
      };
    },

    // 移除图片
    removeImg(file, fileList) {
      this.form.pictureFlag = "";
      this.form.hasNew = false;
      for (let f of fileList) {
        this.form.pictureFlag = "1";
        if (f.status != "success") {
          this.form.hasNew = true;
          break;
        }
      }
      this.imagesList = fileList;
      if (this.imagesList.length == 0) {
        this.imgURLList = [];
      }
    },
    // 超出限制
    exceedAstrict() {
      this.$message.warning("最多只能上传3张图片哦!");
    },
    // 验证上传图片文件
    beforeUploadImg(file) {
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
    // 图片列表变化
    fileChange(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        file.name.lastIndexOf(".jpeg") == -1 &&
        file.name.lastIndexOf(".jpg") == -1 &&
        file.name.lastIndexOf(".png") == -1
      ) {
        this.$message.error("请上传正确的图片格式哦!");
        this.imagesList = [];
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过10MB哦!");
        this.imagesList = [];
        return false;
      }

      this.form.pictureFlag = "";
      this.form.hasNew = false;
      for (let f of fileList) {
        this.form.pictureFlag = "1";
        if (f.status != "success") {
          this.form.hasNew = true;
          break;
        }
      }
    },
    // 上传图片成功
    fileUploadSuccess(res, file, fileList) {
      this.imgURLList.push(res.data);
      if (this.imgURLList.length == fileList.length) {
        this.form.picture = this.imgURLList.join(",");
        this.submitInfo(this.form);
      }
    },

    // 表单提交的方法
    submitForm(form) {
      let _this = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          if (_this.form.hasNew) {
            _this.$refs.upload.submit();
          } else {
            let arr = [];
            for (let x of _this.$refs.upload.fileList) {
              arr.push(x.name);
            }
            _this.form.picture = arr.join(",");
            _this.submitInfo(_this.form);
          }
        } else {
          return false;
        }
      });
    },
    submitInfo(data) {
      let _this = this;
      let sendData = _this.$route.query.sendData;
      let method = null;
      if (sendData) {
        method = updatePartsBuyById;
      } else {
        method = insertPartsBuy;
      }
      delete data["pictureFlag"];
      method(data).then(res => {
        _this.$message.success(res.data);
        _this.$router.push({
          name: "PartsManage"
        });
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "PartsManage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
