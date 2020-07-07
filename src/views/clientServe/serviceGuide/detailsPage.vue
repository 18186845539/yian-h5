<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="维修技能指引详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">拥有者：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.owner | dicFilter(owners)}}</el-col>

              <el-col :span="3" class="detailsTitle">指引类型：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.type | dicFilter(types)}}</el-col>

              <el-col :span="3" class="detailsTitle">产品线：</el-col>
              <el-col
                :span="3"
                class="detailsBodle"
              >{{detailsData.productLine | dicFilter(productLines)}}</el-col>

              <el-col :span="3" class="detailsTitle">型号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.model | dicFilter(models)}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">文件格式：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.format | dicFilter(formats)}}</el-col>

              <el-col :span="3" class="detailsTitle">是否还可以下载：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.isDown | dicFilter(isDowns)}}</el-col>

              <el-col :span="3" class="detailsTitle">标题：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.title}}</el-col>

              <el-col :span="3" class="detailsTitle">描述：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.describe}}</el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">内容：</el-col>
              <el-col :span="21" class="detailsBodle">
                <span v-html="detailsData.content"></span>
              </el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">图片：</el-col>
              <el-col :span="21" class="detailsBodle">
                <img
                  v-for="item in imgList"
                  :key="item.id"
                  :src="imgURL + item"
                  style="width: 200px;height: 200px;margin-right: 50px;"
                >
              </el-col>
            </el-row>

            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">视频：</el-col>
              <el-col :span="9" class="detailsBodle">
                <span v-if="detailsData.video ==''">暂无视频</span>
                <video
                  v-if="detailsData.video !=''"
                  style="width: 300px;"
                  :src="imgURL + detailsData.video"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
              </el-col>

              <el-col :span="3" class="detailsTitle">附件：</el-col>
              <el-col :span="3" class="detailsBodle">
                <span v-if="detailsData.fileName ==''">暂无附件</span>
                <span v-if="detailsData.fileName !=''">{{detailsData.fileName}}</span>
              </el-col>

              <el-col :span="3" class="detailsTitle">创建时间：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.addTime}}</el-col>
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
// 查询维修技术指引详情
import { queryGuidanceInfoById } from "@/api/clientServe";

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
      // 所有拥有者
      owners: [],
      //所有指引类型
      types: [],
      //所有文件格式
      formats: [],
      // 所有是否信息
      isDowns: [],
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
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryGuidanceInfoById(data).then(res => {
        this.detailsData = res.data;
        this.imgList = res.data.picture.split(",");
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

<style  scoped>
.detailsBodle span >>> p img{
  width:100%
}
</style>

