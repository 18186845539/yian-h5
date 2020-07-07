<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>产品线：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.productLine"
                  @change="productLineChange"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="(item,ide) in productLines"
                    :key="ide"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>型号：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.model"
                  :disabled="disabledModel"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in models"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.lable"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <!-- <span>
              <span>年份：</span>
              <span class="searchItem">
                <el-date-picker
                  v-model="pageQuery.year"
                  size="small"
                  type="datatime"
                  value-format="yyyy"
                  placeholder="选择年"
                ></el-date-picker>
              </span>
              <span>年份：</span>
              <span class="searchItem">
                <el-date-picker
                  v-model="pageQuery.year"
                  size="small"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年"
                ></el-date-picker>
              </span>
            </span>-->

            <span>
              <span>开始时间：</span>
              <span>
                <el-date-picker
                  v-model="pageQuery.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始时间"
                  size="small"
                ></el-date-picker>
              </span>
            </span>

            <span>
              <span>结束时间：</span>
              <span>
                <el-date-picker
                  v-model="pageQuery.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束时间"
                  size="small"
                ></el-date-picker>
              </span>
            </span>

            <span>
              <el-button
                @click="commonSearch()"
                type="primary"
                icon="el-icon-search"
                size="small"
              >筛选</el-button>
              <el-button @click="excelBtn()" type="primary" size="small">批量导出</el-button>
              <el-button @click="returnBtn()" size="small">返回</el-button>
            </span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 数据表格部分 -->
    <div class="tableRow">
      <!-- 表格标题部分 -->
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>产品线-列表统计</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="数据查询中请稍后。。。"
          :data="productLineStatisList"
          ref="productLineStatisList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <!-- <el-table-column property="year" label="年份" align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.year">全部年份</span>
              <span v-if="scope.row.year">{{scope.row.year}}</span>
            </template>
          </el-table-column>-->

          <el-table-column property="productLine" label="产品线" align="center"></el-table-column>

          <el-table-column property="AZ" label="安装数量" align="center"></el-table-column>

          <el-table-column property="WX" label="维修数量" align="center"></el-table-column>

          <el-table-column property="HF" label="回访数量" align="center"></el-table-column>

          <el-table-column property="PX" label="培训数量" align="center"></el-table-column>

          <el-table-column property="ZX" label="专项数量" align="center"></el-table-column>

          <el-table-column property="WL" label="物料领用" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(productLineStatisList)" type="primary" size="mini">反选</el-button>
          <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>-->
        </div>
        <div ref="paginationContainer" class="paginationContainer">
          <el-pagination
            small
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageQuery.page"
            :page-sizes="pageSizes"
            :page-size="pageQuery.rows"
            layout="prev, pager, next, total, sizes, jumper"
            :total="pageQuery.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 查询产品线-列表统计数据
import { queryProductlineCountForm } from "@/api/dataStatis";

// 获取所有字典值/产品线对应的型号
import { getAllDict, getModel } from "@/api/common";

import XLSX from "xlsx";

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
      // 表格数据
      productLineStatisList: [],
      productLineStatisList1: [],
      // 选中表格数据
      multipleSelection: [],
      //   筛选数据
      pageQuery: {
        productLine: "",
        model: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        startTime: "",
        endTime: ""
      },

      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 查询产品线-列表统计数据
    this.fetchListData();

    //获取字典表
    this.fetchAllDict();
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
    // 获取所有生产线对应的型号
    productLineChange(val) {
      // 清空型号
      this.pageQuery.model = "";
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

    // 查询产品线-列表统计数据
    fetchListData() {
      this.listLoading = true;

      queryProductlineCountForm(this.pageQuery).then(res => {
        console.log(res);
        this.productLineStatisList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询医院/家庭客户表格数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      this.pageQuery.productLine = '';
      // 查询医院/家庭客户表格数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      if (this.pageQuery.productLine == "") {
        this.pageQuery.page = 1;
      } else {
        delete this.pageQuery.page;
      }
      queryProductlineCountForm(data).then(res => {
        this.productLineStatisList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.productLineStatisList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.productLineStatisList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.productLineStatisList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      let data = {}

      if (this.pageQuery.productLine == "") {
        data = {
          productLine: this.pageQuery.productLine ,
          model: this.pageQuery.model ,
          totalCount: 0,
          page: 1,
          rows: 1000000
        };
      } else {
        data = {
          productLine: this.pageQuery.productLine ,
          model:  this.pageQuery.model,
          totalCount: 0,
          rows: 1000000
        };
      }
      queryProductlineCountForm(data).then(res => {
        this.productLineStatisList1 = res.data.list;
        if (this.productLineStatisList1.length == 0) {
          this.$message.warning("没有要导出的数据");
        } else {
          let o = [
            [
              // "年份",
              "产品线",
              "安装数量",
              "维修数量",
              "回访数量",
              "培训数量",
              "专项数量",
              "物料领用"
            ]
          ];

          this.productLineStatisList1.map(item => {
            let arr = [];
            // arr.push(item.year);
            arr.push(item.productLine);
            arr.push(item.AZ);
            arr.push(item.WX);
            arr.push(item.HF);
            arr.push(item.PX);
            arr.push(item.ZX);
            arr.push(item.WL);
            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "产品线-列表统计");
          XLSX.writeFile(wb, "产品线-列表统计.xlsx");
        }
      });
    },
    // 返回按钮
    returnBtn() {
      this.$router.push({
        name: "ProductLineStatis"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

