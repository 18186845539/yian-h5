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
                  <el-form-item label="产品名称：" prop="product">
                    <el-input v-model="form.product"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品代码：" prop="deviceNo">
                    <el-input v-model="form.deviceNo"  maxlength="9"></el-input>
                    <!-- <el-input v-model="form.deviceNo" maxlength="9"></el-input> -->
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
                      @change="changeImg"
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

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="产品名称：" prop="product">
                    <el-input v-model="form.product"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="省份：" prop="province">
                    <el-select v-model="form.province" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in provinces"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12"></el-col>
                <el-col :span="12">
                  <el-form-item label="安装人：" prop="installer">
                    <el-input v-model="form.installer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="contactsPhone">
                    <el-input v-model="form.contactsPhone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="安装日期：" prop="installDate">
                    <el-date-picker
                      v-model="form.installDate"
                      value-format="yyyy-MM-dd"
                      style="width:200px"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="保修开始日期：" prop="guaranteeBeginDate">
                    <el-date-picker
                      v-model="form.guaranteeBeginDate"
                      value-format="yyyy-MM-dd"
                      style="width:200px"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="保修结束日期：" prop="guaranteeEndDate">
                    <el-date-picker
                      v-model="form.guaranteeEndDate"
                      value-format="yyyy-MM-dd"
                      style="width:200px"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <el-form-item label="产品备注：">
                <el-input
                  v-model="form.productNotes"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                  :rows="3"
                ></el-input>
              </el-form-item>

              <!-- 图片相关 -->
              <!-- <el-form-item
                prop="pictureFlag"
                label="上传图片："
                :rules="[{required: true, message: '请选择图片',trigger: ['change']}]"
              >
                <el-upload
                  :action="imgHttp"
                  :headers="{token:'123456789kkkk'}"
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
              </el-form-item> -->

              <el-form-item label="图片：" v-show="form.picUrls">
                <img :src="imageUrl" alt style="width: 150px;display: block;" />
              </el-form-item>



                <!-- action必选参数, 上传的地址 -->

              <!-- <el-form-item label="视频上传：" prop="videoUrl">
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
                    v-if="form.videoUrl !='' && videoFlag == false"
                    :src="imgURL+form.videoUrl"
                    class="avatar"
                    controls="controls"
                  >您的浏览器不支持视频播放</video>

                  <el-button
                    v-else-if="form.videoUrl =='' && videoFlag == false"
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
                <el-button v-if="form.videoUrl !=''" type="warning" @click="delVideo">移除当前视频</el-button>
                <P class="text">请保证视频格式正确(mp4、ogg、flv、avi、wmv、rmvb)，且不超过50M</P>
              </el-form-item> -->

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
// 添加产品信息/查询修改产品信息/修改产品信息保存/验证产品代号是否存在
import {
  addProductInfo,
  queryProductInfoById,
  updProductInfoById,
  productInfoIsExist
} from "@/api/clientServe";

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
          callback(new Error("电话号码格式不正确"));
        }
      }
    };
    // 产品代号      -》 现在改为   物料编码
    let checkDeviceNo = (rule, value, callback) => {
      const deviceNoReg = /^[0-9]{9}$/;
      if (!value) {
        return callback(new Error("物料编码不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (deviceNoReg.test(value)) {
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
      //回显
      imageUrl: "",
      token:getToken(),
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
      // 默认展开
      activeNames: ["1"],
      // 标题数据
      title: "",
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      // 所有省份
      provinces: [],
      // 重置禁用
      disabledHR: false,
      // 提交的禁用按钮
      disabledSB: false,
      // 表单数据
      form: {
        // 产品代号      -》 现在改为   物料编码
        deviceNo: "",

        videoUrl: "",
        picUrls: "",
        productLine: "",
        model: "",
        product: "",
        province: "",
        // installer: "",
        // contactsPhone: "",
        // installDate: "",
        // guaranteeBeginDate: "",
        // guaranteeEndDate: "",
        productNotes: "",
        // 图片相关
        hasNew: false,
        pictureFlag: "",
        lastRemoveUid: ""
      },
      // 表单验证
      rules: {
        // 产品代号      -》 现在改为   物料编码
        deviceNo: [
          { required: true, validator: checkDeviceNo, trigger: "blur" }
        ],
        // 产品线验证
        productLine: [
          { required: true, message: "请选择产品线", trigger: "change" }
        ],
        // 型号验证
        model: [
          {
            required: true,
            message: "请选择型号",
            trigger: "change"
          }
        ],
        // 产品名称验证
        product: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        // 安装人验证
        installer: [
          { required: true, message: "请输入安装人", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        // 联系电话验证
        contactsPhone: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        // 安装日期验证
        installDate: [
          { required: true, message: "请选择安装日期", trigger: "change" }
        ],
        // 保修开始日期验证
        guaranteeBeginDate: [
          { required: true, message: "请选择保修开始日期", trigger: "change" }
        ],
        // 保修结束日期验证
        guaranteeEndDate: [
          { required: true, message: "请选择保修结束日期", trigger: "change" }
        ]
        // // 产品备注验证
        // productNotes: [
        //   { required: true, message: "请输入产品备注", trigger: "blur" },
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
        _this.title = "修改产品";
        // 查询表单
        let data = { id: sendData };
        queryProductInfoById(data).then(res => {
          _this.form.id = res.data.id;
          //   图片相关
          _this.form.picUrls = res.data.picUrls;
          _this.form.pictureFlag = "1";
          // 图片回显
          // for (let s of res.data.picUrls.split(",")) {
          //   if (s) {
          //     _this.imagesList.push({
          //       name: s,
          //       url: _this.imgURL + s
          //     });
          //     _this.imgURLList.push(s);
          //   }
          // }
          if (res.data.picUrls) {
            _this.imageUrl = _this.imgURL + res.data.picUrls;
            _this.form.picUrls = res.data.picUrls;
          }
          // 视频回显
          _this.form.videoUrl = res.data.videoUrl;

          _this.form.deviceNo = res.data.deviceNo;

          _this.form.installer = res.data.installer;
          _this.form.productLine = res.data.productLine;
          _this.form.model = res.data.model;
          _this.form.product = res.data.product;
          _this.form.productNotes = res.data.productNotes;
          _this.form.province = res.data.province;
          // _this.form.contactsPhone = res.data.contactsPhone;
          // _this.form.installDate = res.data.installDate.substr(0, 10);
          // _this.form.guaranteeBeginDate = res.data.guaranteeBeginDate.substr(
          //   0,
          //   10
          // );
          // _this.form.guaranteeEndDate = res.data.guaranteeEndDate.substr(0, 10);
        });
        // 禁用重置按钮
        _this.disabledHR = true;
      } else {
        // 修改标题
        _this.title = "添加产品";
        // 启用重置按钮
        _this.disabledHR = false;
      }
    },
    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE,EQUI_MODEL,PROVINCE";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
      });
    },

    changeImg(val) {
      let obj = {};
      obj = this.models.find(item => {
        console.log(item.value , val)
        return item.value === val;
      });
      if (obj != undefined) {
        this.imageUrl = this.imgURL + obj.defaultImage;
        this.form.picUrls = obj.defaultImage;
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
    // 重置的方法
    resetForm() {
      this.form = {
        picUrls: "",
        productLine: "",
        model: "",
        product: "",
        // installer: "",
        // contactsPhone: "",
        // installDate: "",
        // guaranteeBeginDate: "",
        // guaranteeEndDate: "",
        productNotes: "",
        // 图片相关
        hasNew: false,
        pictureFlag: ""
      };
      // 是否禁用型号下拉
      this.disabledModel = true;
    },
    // // 验证产品代号
    // deviceNoBlur() {
    //   let data = {
    //     deviceNo: this.form.deviceNo
    //   };
    //   productInfoIsExist(data)
    //     .then(res => {})
    //     .catch(err => {
    //       this.form.deviceNo = "";
    //     });
    // },
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
        this.form.picUrls = this.imgURLList.join(",");
        this.submitInfo(this.form);
      }
    },

    // 视频上传成功
    handleVideoSuccess(res, file, fileList) {
      // 禁用上传按钮
      this.disabledSB = false;
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.code == 200) {
        this.form.videoUrl = res.data[0];
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
          this.form.videoUrl = "";
          this.disabledSB = false;
          this.videoFlag = false;
          this.vidoList = [];
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    // // 表单提交的方法
    // submitForm(form) {
    //   // let _this = this;
    //   // this.$refs[form].validate(valid => {
    //   //   if (valid) {
    //   //     if (_this.form.hasNew) {
    //   //       _this.$refs.upload.submit();
    //   //     } else {
    //   //       let arr = [];
    //   //       for (let x of _this.$refs.upload.fileList) {
    //   //         arr.push(x.name);
    //   //       }
    //   //       _this.form.picUrls = arr.join(",");
    //   //       _this.submitInfo(_this.form);
    //   //     }
    //   //   } else {
    //   //     return false;
    //   //   }
    //   // });
    // },
    submitForm(form) {
      let _this = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          
          let sendData = _this.$route.query.sendData;
          let method = null;
          if (sendData) {
            method = updProductInfoById;
          } else {
            method = addProductInfo;
          }
          // delete data["pictureFlag"];

          let data = _this.form;
          method(data).then(res => {
            _this.$message.success(res.msg);
            _this.$router.push({
              name: "ProductMessage"
            });
          });
        } else {
          return false;
        }
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ProductMessage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

