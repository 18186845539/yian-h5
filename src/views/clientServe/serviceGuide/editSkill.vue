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
                  <el-form-item label="拥有者：" prop="owner">
                    <el-select v-model="form.owner" placeholder="请选择" size="small" clearable>
                      <el-option
                        v-for="item in owners"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="指引类型：" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" size="small" clearable>
                      <el-option
                        v-for="item in types"
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
                  <el-form-item label="产品线：" prop="productLine">
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
                  <el-form-item label="型号：" prop="model">
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

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="文件格式：" prop="format">
                    <el-select v-model="form.format" placeholder="请选择" size="small" clearable>
                      <el-option
                        v-for="item in formats"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否还可以下载：" prop="isDown">
                    <el-radio-group v-model="form.isDown">
                      <el-radio
                        v-for="item in isDowns"
                        :key="item.id"
                        :label="item.value"
                      >{{item.lable}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="标题：" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>

              <el-form-item label="内容：">
                <quill-editor
                  v-model="form.content"
                  ref="myQuillEditor"
                  style="width: 600px;"
                  :options="editorOption"
                ></quill-editor>

                <!-- <el-input
                  v-model="form.content"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="5000"
                  :rows="10"
                  show-word-limit
                ></el-input>-->
              </el-form-item>

              <el-form-item label="描述：">
                <el-input
                  v-model="form.describe"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="200"
                  :rows="3"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <!-- 图片相关 -->
              <!-- <el-form-item
                prop="pictureFlag"
                label="上传图片："
                :rules="[{required: true, message: '请选择图片',trigger: ['change']}]"
              >-->
              <el-form-item prop="pictureFlag" label="上传图片：">
                <el-upload
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="image/jpeg, image/png"
                  :auto-upload="false"
                  :multiple="true"
                  list-type="picture-card"
                  :file-list="imagesList"
                  :on-remove="removeImg"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUploadImg"
                  :on-change="fileChange"
                  :on-success="fileUploadSuccess"
                  :on-exceed="exceedAstrict"
                  :limit="1"
                  ref="upload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <P class="text">请保证图片格式正确(PNG、JPEG)，且不超过10M,最多上传一张</P>
              </el-form-item>

              <el-form-item label="视频上传：" prop="video">
                <!-- action必选参数, 上传的地址 -->
                <el-upload
                  class="avatar-uploader el-upload--text"
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="video/mp4, video/ogg, video/flv, video/avi, video/wmv, video/rmvb"
                  :show-file-list="false"
                  :file-list="vidoList"
                  :on-success="handleVideoSuccess"
                  :before-upload="beforeUploadVideo"
                  :on-progress="uploadVideoProcess"
                  :limit="1"
                >
                  <video
                    style="width: 500px;"
                    v-if="form.video !='' && videoFlag == false"
                    :src="imgURL+form.video"
                    class="avatar"
                    controls="controls"
                  >您的浏览器不支持视频播放</video>
                  <el-button
                    v-else-if="form.video =='' && videoFlag == false"
                    slot="trigger"
                    size="small"
                    type="primary"
                  >选取视频文件</el-button>
                  <el-progress
                    v-if="videoFlag == true"
                    type="circle"
                    :percentage="videoUploadPercent"
                    style="margin-top:30px;"
                  ></el-progress>
                </el-upload>
                <el-button v-if="form.video !=''" type="warning" @click="delVideo">移除当前视频</el-button>
                <P class="text">请保证视频格式正确(mp4、ogg、flv、avi、wmv、rmvb)，且不超过50M</P>
              </el-form-item>

              <el-form-item label="附件上传：" prop="file">
                <el-upload
                  class="upload-demo"
                  :action="imgHttp"
                  :headers="{token:token}"
                  :on-success="handleFileSuccess"
                  :before-upload="beforeUploadFile"
                  :file-list="fileList"
                  :on-remove="removeFile"
                  accept="application/zip, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  :on-exceed="exceedFile"
                  :limit="1"
                >
                  <el-button size="small" type="primary">选择上传附件</el-button>
                </el-upload>
                <P class="text">请保证文件格式正确(.zip,docx,pdf,xlsx)，且不超过50M</P>
              </el-form-item>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" :disabled="disabledSB">提交</el-button>
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
// 获取所有字典/产品线对应的型号/图片上传
import { getAllDict, getModel, uploading } from "@/api/common";
// 添加维修技术指引信息/查询修改维修技术指引信息/修改维修技术指引信息保存
import {
  insertGuidance,
  queryGuidanceInfoById,
  updateGuidance
} from "@/api/clientServe";

// 引入富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  // 富文本编辑器
  name: "FuncFormsEdit",
  components: {
    quillEditor
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
      token: getToken(),
      // 文件上传总大小
      fileSumSize: 0,
      // 富文本编辑器
      editorOption: {},
      // 图片上传地址
      imgHttp: this.$store.state.settings.socketURL + "/upload/image",
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 图片列表
      imagesList: [],
      // 接收图片路径的数组
      imgURLList: [],
      // 视频标志
      videoFlag: false,
      // 视频列表
      vidoList: [],
      // 上传进度
      videoUploadPercent: 0,
      // 文件列表
      fileList: [],
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 所有拥有者
      owners: [],
      //所有指引类型
      types: [],
      //所有文件格式
      formats: [],
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      // 所有是否信息
      isDowns: [],
      // 重置和客户类型禁用
      disabledHR: false,
      // 重置
      disabledHR: false,
      // 提交的禁用按钮
      disabledSB: false,
      // 表单数据
      form: {
        video: "",
        picture: "",
        file: "",
        // 附件名
        fileName: "",
        owner: "",
        productLine: "",
        model: "",
        type: "",
        format: "",
        title: "",
        content: "",
        describe: "",
        isDown: "",
        // 图片相关
        hasNew: false,
        pictureFlag: "",
        lastRemoveUid: ""
      },
      // 表单验证
      rules: {
        // 拥有者验证
        owner: [{ required: true, message: "请选择拥有者", trigger: "change" }],
        // 产品线验证
        productLine: [
          { required: true, message: "请选择产品线", trigger: "change" }
        ],
        // 型号验证
        model: [{ required: true, message: "请选择型号", trigger: "blur" }],
        // 指引类型验证
        type: [
          { required: true, message: "请选择指引类型", trigger: "change" }
        ],
        // 文件格式验证
        format: [
          { required: true, message: "请选择文件格式", trigger: "change" }
        ],
        // 标题验证
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        // 内容验证
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        // 描述验证
        describe: [
          { required: true, message: "请输入描述", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        // 是否还可以下载验证
        isDown: [
          { required: true, message: "请选择是否还可以下载", trigger: "change" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
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
        _this.title = "修改技能指导";
        // 查询表单
        let data = { id: sendData };
        queryGuidanceInfoById(data).then(res => {
          _this.form.id = res.data.id;
          //   图片相关
          _this.form.pictureFlag = "1";
          _this.form.picture = res.data.picture;
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

          // 附件回显
          if (res.data.file == "") {
            _this.form.file = "";
            _this.form.fileName = "";
          } else {
            _this.form.file = res.data.file;
            _this.form.fileName = res.data.fileName;
            _this.fileList.push({
              name: res.data.fileName,
              url: _this.imgURL + res.data.file
            });
          }
          // 视频回显
          _this.form.video = res.data.video;

          _this.form.owner = res.data.owner;
          _this.form.productLine = res.data.productLine;
          _this.form.model = res.data.model;
          _this.form.type = res.data.type;
          _this.form.format = res.data.format;
          _this.form.title = res.data.title;
          _this.form.content = res.data.content;
          _this.form.describe = res.data.describe;
          _this.form.isDown = res.data.isDown;
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加技能指导";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "PRODUCT_LINE,EQUI_MODEL,OWNER,DIRECT_TYPE,FORMAT_TYPE,WHETHER";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 所有拥有者
        this.owners = res.data.OWNER;
        // 所有指引类型
        this.types = res.data.DIRECT_TYPE;
        // 所有文件格式
        this.formats = res.data.FORMAT_TYPE;
        // 所有是否信息
        this.isDowns = res.data.WHETHER;
      });
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
            // this.models = [];

            // this.models.push({
            //   children: [],
            //   defaultImage: "",
            //   id: "999999",
            //   lable: "全部",
            //   page: 1,
            //   parentId: "10",
            //   remarks: "设备机型",
            //   rows: 10,
            //   sort: "1",
            //   type: "EQUI_MODEL",
            //   value: ""
            // });

            // for (let i = 0; i < res.data.EQUI_MODEL.length; i++) {
            //   this.models.push(res.data.EQUI_MODEL[i]);
            // }

            this.models = res.data.EQUI_MODEL;
          } else {
            this.models = [];
          }
        });
      }
    },
    // 重置的方法
    resetForm() {
      this.form = {
        video: "",
        picture: "",
        file: "",
        // 附件名
        fileName: "",
        owner: "",
        productLine: "",
        model: "",
        type: "",
        format: "",
        title: "",
        content: "",
        describe: "",
        isDown: "",

        // 图片相关
        hasNew: false,
        pictureFlag: ""
      };
      // 是否禁用型号下拉
      this.disabledModel = true;
    },
    // 移除图片前
    beforeRemove(file, filelist) {
      if (file.uid == this.lastRemoveUid) {
        return false;
      }
      this.lastRemoveUid = file.uid;
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
    // 图片超出限制
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
        this.form.picture = this.imgURLList.join(",");
        this.submitInfo(this.form);
      }
    },
    // 视频上传成功
    handleVideoSuccess(res, file) {
      // 禁用上传按钮
      this.disabledSB = false;
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.code == 200) {
        this.form.video = res.data[0];
        this.videoFlag = false;
        this.vidoList = [];
      } else {
        this.$message.error("视频上传失败，请重新上传！");
        return false;
      }
    },
    // 验证上传视频文件
    beforeUploadVideo(file) {
      // 禁用上传按钮
      this.disabledSB = true;

      const isLt50M = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式哦!");
        // 禁用上传按钮
        this.disabledSB = false;
        return false;
      }
      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过50MB哦!");
        // 禁用上传按钮
        this.disabledSB = false;
        return false;
      }
    },
    // 上传进度显示
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = Number(file.percentage.toFixed(0));
    },
    // 移除当前视频
    delVideo() {
      this.$confirm("此操作将移除当前视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.video = "";
          this.videoFlag = false;
          this.vidoList = [];
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 文件上传成功
    handleFileSuccess(res, file) {
      // 禁用上传按钮
      this.disabledSB = false;
      if (res.code == 200) {
        this.form.file = res.data[0];
      } else {
        this.$message.error("文件上传失败，请重新上传！");
        return false;
      }
    },
    // 验证上传文件
    beforeUploadFile(file) {
      // 禁用上传按钮
      this.disabledSB = true;
      const isLt50M = file.size / 1024 / 1024 < 50;
      let typelist = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/pdf",
        "application/x-zip-compressed",
      ];
      if (typelist.indexOf(file.type) == -1) {
        this.$message.error("请上传正确的.zip,.docx,.xlsx,.pdf文件格式哦!");
        // 禁用上传按钮
        this.disabledSB = false;
        return false;
      }
      if (!isLt50M) {
        this.$message.error("上传文件大小不能超过50MB哦!");
        // 禁用上传按钮
        this.disabledSB = false;
        return false;
      }
      this.form.fileName = file.name;
    },
    // 文件超出限制
    exceedFile() {
      this.$message.warning("最多只能上传1个文件哦!");
    },
    // 移除附件
    removeFile() {
      this.form.file = "";
      this.form.fileName = "";
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
        method = updateGuidance;
      } else {
        method = insertGuidance;
      }
      delete data["pictureFlag"];
      method(data).then(res => {
        _this.$message.success(res.data);
        _this.$router.push({
          name: "ServiceGuide"
        });
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ServiceGuide"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style>
.ql-editor {
  height: 300px;
}
</style>
