<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="产品信息详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">产品线：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.productLine | dicFilter(productLines)}}</el-col>

              <el-col :span="3" class="detailsTitle">型号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.model | dicFilter(models)}}</el-col>

              <el-col :span="3" class="detailsTitle">产品名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.product}}</el-col>

              <el-col :span="3" class="detailsTitle">产品备注：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.productNotes}}</el-col>

              
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">图片：</el-col>
              <el-col :span="21" class="detailsBodle" v-show="imgList != ''">
                <img
                  v-for="item in imgList"
                  :key="item.id"
                  :src="imgURL + item"
                  style="width: 200px;height: 200px;margin-right: 50px;"
                >
              </el-col>
              <el-col :span="3" class="detailsTitle">物料编码：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.deviceNo}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">视频：</el-col>
              <el-col :span="9" class="detailsBodle">
                <span v-if="detailsData.videoUrl ==''">暂无视频</span>
                <video
                  v-if="detailsData.videoUrl !=''"
                  style="width: 300px;"
                  :src="imgURL + detailsData.videoUrl"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
              </el-col>

              <el-col :span="3" class="detailsTitle">创建时间：</el-col>
              <el-col :span="9" class="detailsBodle">{{detailsData.createDate}}</el-col>
            </el-row>
          </div>

          <div style="margin:20px;text-align: center;">
            <el-button @click="returnBtn()" size="small">返回</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 获取所有字典值
import { getAllDict } from "@/api/common";
// 查询产品信息详情
import { queryProductInfoById } from "@/api/clientServe";

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
    return {
      // 默认展开
      activeNames: ["1"],
      // 回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 所有产品线
      productLines: [],
      // 所有型号
      models: [],
      // 详情数据
      detailsData: {},
      // 图片列表
      imgList: []
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 回填数据
    this.backfillData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE,EQUI_MODEL";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
      });
    },
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryProductInfoById(data).then(res => {
        this.detailsData = res.data;
        this.imgList = res.data.picUrls.split(",");
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

