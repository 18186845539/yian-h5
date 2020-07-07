<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>客户：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.customerName" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>产品线：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.productLine" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in productLines"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.lable"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>拥有者：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.owner" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>派工单号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.orderNum" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>产品名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.productName" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>型号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.model" size="small" clearable></el-input>
              </span>
            </span>
            <transition name="fade">
              <div v-show="advancedSearch" transiton="fade" class="searchRow">
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
              </div>
            </transition>

            <span>
              <el-button
                @click="commonSearch()"
                type="primary"
                icon="el-icon-search"
                size="small"
              >筛选</el-button>
              <el-button
                @click="advancedSearch = !advancedSearch"
                type="primary"
                icon="el-icon-search"
                size="small"
              >更多</el-button>
              <el-button @click="excelBtn()" type="primary" size="small">批量导出</el-button>
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
          <span>查询培训记录</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="peixunList"
          ref="peixunList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <!-- <el-table-column property="theme" label="主题" align="center"></el-table-column> -->

          <el-table-column property="customerName" label="客户" align="center">
            <template slot-scope="scope">
              <span
                @click="toCustomerdetails(scope.row)"
                class="workOrder"
              >{{scope.row.customerName}}</span>
            </template>
          </el-table-column>

          <el-table-column property="productLine" label="产品线" align="center"></el-table-column>

          <el-table-column property="productName" label="产品" align="center"></el-table-column>

          <el-table-column property="model" label="型号" align="center"></el-table-column>

          <el-table-column property="orderNum" label="派工单号" align="center"></el-table-column>

          <el-table-column property="trainNum" label="培训台数" align="center"></el-table-column>

          <el-table-column property="note" label="备注" align="center"></el-table-column>

          <el-table-column property="owner" label="拥有者" align="center"></el-table-column>

          <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(peixunList)" type="primary" size="mini">反选</el-button>
          <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>
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
// 获取所有字典值
import { getAllDict } from "@/api/common";
// 查询故障与配件-列表统计数据
import { queryPeiXunData } from "@/api/CRMdata";

import XLSX from "xlsx";

export default {
  data() {
    return {
      //高级搜索
      advancedSearch: false,
      // 默认展开
      activeNames: ["1"],
      // 所有产品线
      productLines: [],
      // 表格数据
      peixunList: [],
      // 选中表格数据
      multipleSelection: [],
      //   筛选数据
      pageQuery: {
        customerName: "",
        productLine: "",
        owner: "",
        orderNum: "",
        productName: "",
        model: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        startTime: "",
        endTime: ""
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 查询培训记录
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
      });
    },
    // 查询培训记录
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryPeiXunData(data).then(res => {
        this.peixunList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询故障与配件-列表统计数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryPeiXunData(data).then(res => {
        this.peixunList = res.data.list;
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
      this.$refs.peixunList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.peixunList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.peixunList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      let o = [
        [
          "客户",
          "产品线",
          "产品",
          "型号",
          "派工单号",
          "培训台数",
          "备注",
          "拥有者",
          "创建时间"
        ]
      ];

      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryPeiXunData(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];
            arr.push(item.customerName);
            arr.push(item.productLine);
            arr.push(item.productName);
            arr.push(item.model);
            arr.push(item.orderNum);
            arr.push(item.trainNum);
            arr.push(item.note);
            arr.push(item.owner);
            arr.push(item.createDate);
            o.push(arr);
          });
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "培训记录列表");
          XLSX.writeFile(wb, "培训记录列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(item.customerName);
          arr.push(item.productLine);
          arr.push(item.productName);
          arr.push(item.model);
          arr.push(item.orderNum);
          arr.push(item.trainNum);
          arr.push(item.note);
          arr.push(item.owner);
          arr.push(item.createDate);
          o.push(arr);
        });
        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "培训记录列表");
        XLSX.writeFile(wb, "培训记录列表.xlsx");
      }
    },
    // 跳转客户 - 产品记录
    toCustomerdetails(rows) {
      this.$router.push({
        name: "customerdetail",
        query: {
          id: rows.customerId
        }
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

