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
              <el-form-item label="产品线名称：" prop="lable">
                <el-input v-model="form.lable"></el-input>
              </el-form-item>

              <!-- <el-form-item label="类型：" prop="value">
                <el-input v-model="form.value" @blur="queryValue()"></el-input>
              </el-form-item> -->

              <el-form-item label="产品线备注：" >
                <el-input
                  v-model="form.remarks"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                ></el-input>
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
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 重置禁用
      disabledHR: false,
      // 表单数据
      form: {
        type: "PRODUCT_LINE",
        lable: "",
        value: "",
        remarks: ""
      },
      // 表单验证
      rules: {
        // 产品线名称验证
        lable: [
          { required: true, message: "请输入产品线名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        // value验证
        value: [{ required: true, validator: checkValue, trigger: "blur" }]
        // 产品线备注验证
        // remarks: [
        //   { required: true, message: "请输入产品线备注", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 200,
        //     message: "长度在 1 到 200 个字符",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  mounted() {
    //判断修改新增还是新增
    this.addOrEdit();
  },
  methods: {
    //判断修改还是新增
    addOrEdit() {
      let _this = this;
      let sendData = _this.$route.query.sendData;
      if (sendData) {
        // 修改标题
        _this.title = "修改产品线";
        // 查询表单
        let data = { id: sendData };
        queryDicById(data).then(res => {
          _this.form.id = res.data.id;
          _this.form.type = "PRODUCT_LINE";
          _this.form.lable = res.data.lable;
          _this.form.value = res.data.value;
          _this.form.remarks = res.data.remarks;
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加产品线";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 查询value值是否存在
    queryValue() {
      if (this.form.value) {
        let data = {
          type: "PRODUCT_LINE",
          value: this.form.value
        };
        queryDicValueByType(data).then(res => {
          console.log(res)
          this.$message.success("类型可以使用");
        });
      }
    },
    // 表单提交的方法
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let _this = this;
          let sendData = _this.$route.query.sendData;
          if (sendData) {
            let data = _this.form;
            updateDicCode(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ProductLine"
              });
            });
          } else {
            let data = _this.form;
            addDicCode(data).then(res => {
              _this.$message.success(res.msg);
              _this.$router.push({
                name: "ProductLine"
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
        name: "ProductLine"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

