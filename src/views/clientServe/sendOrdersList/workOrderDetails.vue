<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="工单详情" name="1">
          <div style="padding: 20px 50px">
            <!-- <div
              v-for="item in pdfList"
              :key="item.id"
              style="margin-bottom: 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
            >
              <pdf style="width:50%" v-for="i in numPages" :key="i" :page="i" :src="item"></pdf>
            </div>-->

            <img :src="imgrul" alt style="    display: block;  width: 65%;  height: 100%;" />
            </div>
          <div style="padding: 10px 0;display: flex;justify-content: center; z-index:9999">
            <a :href="pdfURL + '/' + item1" target="_blank" style="margin-right:10px">
              <el-button type="primary" size="small">查看并下载</el-button>
            </a>
            <el-button @click="returnBtn()" size="small">返回</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 查看工单详情/导出PDF文件
import { queryReportByGroupId, download } from "@/api/clientServe";
import pdf from "vue-pdf";
export default {
  components: {
    pdf
  },
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // PDF列表
      pdfList: [],
      numPages: [],
      imgrul: "",
      item1: "",
      // PDF查看并下载地址
      imgURL: this.$store.state.settings.imgURL,
      pdfURL: this.$store.state.settings.pdfURL
    };
  },
  mounted() {
    // 页面加载获取PDF文件
    this.getPdf();
  },
  methods: {
    // 页面加载获取PDF文件
    getPdf() {
      let groupId = this.$route.query.sendData;
      queryReportByGroupId(groupId).then(res => {
        let psdArr = res.data.split(";");
        this.item1 = psdArr[0];
        // this.pdfList = psdArr.filter(item => {
        //   return item && item.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        // });
        this.pdfimglist = res.data;
        var random = Math.ceil(Math.random() * 100000);
        let uurl = this.pdfimglist.slice(4, this.pdfimglist.indexOf("."));
        if (uurl != "") {
          this.imgrul =
            this.pdfURL+"/images/" +
            uurl +
            ".jpg" +
            "?" +
            random;
        } else {
          this.imgrul = "";
        }
        // for (let i = 0; i < this.pdfList.length; i++) {
        // this.preUrl = pdf.createLoadingTask(this.pdfList[0]);
        // this.preUrl.then(pdf => {
        this.numPages = 2;
        // });
        // }
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "SendOrdersList"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>