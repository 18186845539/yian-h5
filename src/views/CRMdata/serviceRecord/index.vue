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
              <span>联系人：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.contact" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>电话：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.contactPhone" size="small" clearable></el-input>
              </span>
            </span>
            <transition name="fade">
              <div v-show="advancedSearch" transiton="fade" class="searchRow">
                <span>
                  <span>产品名称：</span>
                  <span class="searchItem">
                    <el-input v-model="pageQuery.productName" size="small" clearable></el-input>
                  </span>
                </span>
                <span>
                  <span>机器编号（序列号）：</span>
                  <span class="searchItem">
                    <el-input v-model="pageQuery.deviceNo" size="small" clearable></el-input>
                  </span>
                </span>

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
          <span>维修记录列表</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="weixiuList"
          ref="weixiuList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="orderNum" label="派工单号" align="center"></el-table-column>

          <!-- <el-table-column property="theme" label="主题" align="center"></el-table-column> -->

          <el-table-column property="customerName" label="客户" align="center">
            <template slot-scope="scope">
              <span
                @click="toCustomerdetails(scope.row)"
                class="workOrder"
              >{{scope.row.customerName}}</span>
            </template>
          </el-table-column>

          <el-table-column property="contact" label="联系人" align="center"></el-table-column>

          <el-table-column property="contactPhone" label="联系电话" align="center"></el-table-column>

          <el-table-column property="productLine" label="产品线" align="center"></el-table-column>

          <el-table-column property="productName" label="产品" align="center"></el-table-column>

          <el-table-column property="model" label="型号" align="center"></el-table-column>

          <el-table-column property="deviceNo" label="机器编号(序列号)" align="center"></el-table-column>

          <el-table-column property="maintenanceType" label="维修类别" align="center"></el-table-column>

          <el-table-column property="owner" label="拥有者" align="center"></el-table-column>

          <el-table-column property="yuanYin" label="故障原因分析" align="center"></el-table-column>

          <el-table-column property="clear" label="产品故障是否消除" align="center"></el-table-column>

          <el-table-column property="phenomenon" label="故障现象" align="center"></el-table-column>

          <el-table-column property="infor" label="故障信息" align="center" show-overflow-tooltip></el-table-column>
          
          <el-table-column property="note" label="解决办法" align="center" ></el-table-column>

          <el-table-column property="editUser" label="编辑人" align="center"></el-table-column>

          <el-table-column property="maintenanceDate" label="维修日期" align="center"></el-table-column>

          <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(weixiuList)" type="primary" size="mini">反选</el-button>
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
import { queryWeiXiuData } from "@/api/CRMdata";

import XLSX from "xlsx";

export default {
  data() {
    return {
      // 高级搜索
      advancedSearch: false,
      // 默认展开
      activeNames: ["1"],
      // 所有产品线
      productLines: [],
      // 表格数据
      weixiuList: [],
      // 选中表格数据
      multipleSelection: [],
      //   筛选数据
      pageQuery: {
        customerName: "",
        productLine: "",
        owner: "",
        orderNum: "",
        contact: "",
        contactPhone: "",
        productName: "",
        deviceNo: "",
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
    // 查询专项记录
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
    // 查询专项记录
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryWeiXiuData(data).then(res => {
        this.weixiuList = res.data.list;
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
      queryWeiXiuData(data).then(res => {
        this.weixiuList = res.data.list;
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
      this.$refs.weixiuList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.weixiuList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.weixiuList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      let o = [
        [
          "派工单号",
          "客户",
          "联系人",
          "联系电话",
          "产品线",
          "产品",
          "型号",
          "机器编号(序列号)",
          "维修类别",
          "拥有者",
          "故障原因分析",
          "产品故障是否消除",
          "故障现象",
          "故障信息",
          "编辑人",
          "维修日期",
          "创建时间"
        ]
      ];

      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryWeiXiuData(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];
            arr.push(item.orderNum);
            arr.push(item.customerName);
            arr.push(item.contact);
            arr.push(item.contactPhone);
            arr.push(item.productLine);
            arr.push(item.productName);
            arr.push(item.model);
            arr.push(item.deviceNo);
            arr.push(item.maintenanceType);
            arr.push(item.owner);
            arr.push(item.yuanYin);
            arr.push(item.clear);
            arr.push(item.phenomenon);
            arr.push(item.infor);
            arr.push(item.editUser);
            arr.push(item.maintenanceDate);
            arr.push(item.createDate);

            o.push(arr);
          });
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "维修记录列表");
          XLSX.writeFile(wb, "维修记录列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(item.orderNum);
          arr.push(item.customerName);
          arr.push(item.contact);
          arr.push(item.contactPhone);
          arr.push(item.productLine);
          arr.push(item.productName);
          arr.push(item.model);
          arr.push(item.deviceNo);
          arr.push(item.maintenanceType);
          arr.push(item.owner);
          arr.push(item.yuanYin);
          arr.push(item.clear);
          arr.push(item.phenomenon);
          arr.push(item.infor);
          arr.push(item.editUser);
          arr.push(item.maintenanceDate);
          arr.push(item.createDate);

          o.push(arr);
        });
        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "维修记录列表");
        XLSX.writeFile(wb, "维修记录列表.xlsx");
      }
    },
    // 跳转客户 - 产品记录
    toCustomerdetails(rows) {
      console.log(rows);
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

