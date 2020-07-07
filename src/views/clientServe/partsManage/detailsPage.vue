<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="配件详情" name="1">
          <div class="details">
            <el-row :gutter="10" class="detailsRow">
              <el-col :span="3" class="detailsTitle">一级类型：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.oneType | dicFilter(oneTypes)}}</el-col>

              <el-col :span="3" class="detailsTitle">二级产品：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.twoType | dicFilter(twoTypes)}}</el-col>

              <el-col :span="3" class="detailsTitle">三级型号：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.model | dicFilter(models)}}</el-col>

              <el-col :span="3" class="detailsTitle">配件名称：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.partsName}}</el-col>
              <el-col :span="3" class="detailsTitle">物料编码：</el-col>
              <el-col :span="3" class="detailsBodle">{{detailsData.materielCode}}</el-col>
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
              <el-col :span="3" class="detailsTitle">创建时间：</el-col>
              <el-col :span="21" class="detailsBodle">{{detailsData.buyTime}}</el-col>
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
// 查询配件详情
import { queryBuyInfoById } from "@/api/clientServe";

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
      // 所有一级类型
      oneTypes: [],
      // 所有二级类型
      twoTypes: [],
      // 所有三级型号
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
    // 回填数据
    backfillData() {
      let id = this.$route.query.sendData;
      let data = { id: id };
      queryBuyInfoById(data).then(res => {
        this.detailsData = res.data;
        this.imgList = res.data.picture.split(",");
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

