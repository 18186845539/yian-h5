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
                  :limit="1"
                  ref="upload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <P class="text">请保证图片格式正确(PNG、JPEG)，且不超过10M,宽度为750px,最多上传1张</P>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
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
// 图片上传
import { uploading } from "@/api/common";
// 添加售后服务图片/查询售后服务图片/修改售后服务图片保存
import {
  addAfterService,
  queryAfterServiceInfoById,
  updAfterServiceInfoById
} from "@/api/clientServe";

export default {
  data() {
    return {
      token:getToken(),
      // 图片上传地址
      imgHttp: this.$store.state.settings.socketURL + "/upload/image",
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 图片列表
      imagesList: [],
      // 接收图片路径的数组
      imgURLList: [],
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",

      // 表单数据
      form: {
        picUrl: "",
        // 图片相关
        hasNew: false,
        pictureFlag: ""
      },
      // 表单验证
      rules: {}
    };
  },
  mounted() {
    // 判断修改新增还是新增
    this.addOrEdit();
  },
  methods: {
    //判断修改还是新增
    addOrEdit() {
      let _this = this;
      let sendData = _this.$route.query.sendData;
      if (sendData) {
        // 修改标题
        _this.title = "修改售后服务图片";
        // 查询表单
        let data = {
          id: sendData
        };
        queryAfterServiceInfoById(data).then(res => {
          _this.form.id = res.data.id;
          //   图片相关
          _this.form.picUrl = res.data.picUrl;
          _this.form.pictureFlag = "1";
          // 图片回显
          for (let s of res.data.picUrl.split(",")) {
            if (s) {
              _this.imagesList.push({
                name: s,
                url: _this.imgURL + s
              });
              _this.imgURLList.push(s);
            }
          }
        });
      } else {
        // 修改标题
        _this.title = "添加售后服务图片";
      }
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
      this.$message.warning("最多只能上传1张图片哦!");
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
        this.form.picUrl = this.imgURLList.join(",");
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
        method = updAfterServiceInfoById;
      } else {
        method = addAfterService;
      }
      delete data["pictureFlag"];
      method(data).then(res => {
        _this.$message.success(res.msg);
        _this.$router.push({
          name: "ServiceImage"
        });
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ServiceImage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
