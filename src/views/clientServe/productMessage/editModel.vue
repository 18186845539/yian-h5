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
              label-width="250px"
              size="small"
              class="demo-ruleForm"
            >
              <el-form-item label="型号名称：" prop="lable">
                <el-input v-model="form.lable"></el-input>
              </el-form-item>

              <!-- <el-form-item label="类型：" prop="value">
                <el-input v-model="form.value" @blur="queryValue()"></el-input>
              </el-form-item> -->

              <el-form-item label="型号备注：" >
                <el-input
                  v-model="form.remarks"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <!-- 图片相关 -->
              <el-form-item label="配件配图：" >
                <el-upload
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="image/jpeg, image/png"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar"  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <P class="text">请保证图片格式正确(PNG、JPEG)</P>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <!-- <el-button @click="resetForm()" :disabled="disabledHR">重置</el-button> -->
                <el-button @click="returnBtn()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
// 添加生产线字典/根据id查询字典数据/修改字典信息保存/根据type查询value是否存在
import {
  addDicCode,
  queryDicById,
  updateDicCode,
  queryDicValueByType
} from "@/api/common";

export default {
  data() {
    // value验证规则
    let checkValue = (rule, value, callback) => {
      const valueReg = /^[\u4e00-\u9fa5A-Za-z0-9-\_]+$/;
      if (!value) {
        return callback(new Error("类型不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (valueReg.test(value)) {
        callback();
      } else {
        callback(new Error("类型格式不正确"));
      }
    };

    return {
      // 图片上传地址
      imgHttp: this.$store.state.settings.socketURL + "/upload/image",
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      //回显
      imageUrl: "",
      token:getToken(),
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 重置禁用
      disabledHR: false,
      // 表单数据
      form: {
        type: "EQUI_MODEL",
        lable: "",
        value: "",
        remarks: "",
        defaultImage: ""
      },
      // 表单验证
      rules: {
        // 型号名称名称验证
        lable: [
          { required: true, message: "请输入型号名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        // value验证
        value: [{ required: true, validator: checkValue, trigger: "blur" }],
        // 型号名称验证
        // remarks: [
        //   { required: true, message: "请输入型号名称", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 200,
        //     message: "长度在 1 到 200 个字符",
        //     trigger: "blur"
        //   }
        // ],
        // defaultImage: [
        //   { required: true, message: "图片不能为空", trigger: "blur" }
        // ]
      }
    };
  },
  mounted() {
    //判断修改新增还是新增
    this.addOrEdit();
  },
  methods: {
    //判断修改新增还是新增
    addOrEdit() {
      let _this = this;
      let id = _this.$route.query.id;
      if (id) {
        // 修改标题
        _this.title = "修改型号";
        // 查询表单
        let data = { id: id };
        queryDicById(data).then(res => {
          _this.form.id = res.data.id;
          _this.form.type = "EQUI_MODEL";
          _this.form.lable = res.data.lable;
          _this.form.value = res.data.value;
          _this.form.remarks = res.data.remarks;
          _this.form.defaultImage = res.data.defaultImage;
          if (res.data.defaultImage) {
            _this.imageUrl = _this.imgURL + res.data.defaultImage;
          }
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加型号";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 查询value值是否存在
    queryValue() {
      if (this.form.value) {
        let data = {
          type: "EQUI_MODEL",
          value: this.form.value
        };
        queryDicValueByType(data).then(res => {
          console.log(res)
          if (res.msg == "value可以使用") {
            this.$message.success("类型可以使用");
          }
        });
      }
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;
          let id = _this.$route.query.id;
          if (id) {
            let data = _this.form;

            updateDicCode(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ProductLine"
              });
            });
          } else {
            // 给parentId赋值
            _this.form.parentId = _this.$route.query.parentId;
            let data = _this.form;

            addDicCode(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ProductLine"
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ProductLine"
      });
    },

    // 图片上传相关
    handleAvatarSuccess(res, file) {
      this.form.defaultImage = res.data[0];
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

