<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>操作用户：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.userName" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>操作类型：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.moduleType" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>操作开始时间：</span>
              <span>
                <el-date-picker
                  v-model="pageQuery.starttime"
                  type="date"
                  placeholder="请选择"
                  size="small"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </span>
            </span>

            <span>
              <span>操作结束时间：</span>
              <span>
                <el-date-picker
                  v-model="pageQuery.endtime"
                  type="date"
                  placeholder="请选择"
                  size="small"
                  value-format="yyyy-MM-dd"
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
              <el-button @click="emptySearch()" type="primary" size="small">清空筛选</el-button>
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
          <span>操作日志列表</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="operationLogList"
          ref="operationLogList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="userName" label="操作用户" align="center" show-overflow-tooltip></el-table-column>

          <el-table-column property="moduleType" label="操作类型" align="center"></el-table-column>

          <el-table-column property="moduleDesc" label="具体内容" align="center"></el-table-column>

          <el-table-column property="createDate" label="操作时间" align="center"></el-table-column>

          <el-table-column align="center" label="管理" width="150">
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.row)"
                size="mini"
                type="warning"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(operationLogList)" type="primary" size="mini">反选</el-button>
          <el-button @click="cancelSelect()" type="primary" size="mini">全不选</el-button>
          <el-button @click="batchHandleDelete()" type="primary" size="mini">批量删除</el-button>
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
// 查询操作日志列表/删除日志信息
import { querySysAopLogList, delSysAopLog } from "@/api/logManage";

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
      operationLogList: [],
      // 选中表格数据
      multipleSelection: [],
      // 筛选数据
      pageQuery: {
        userName: "",
        moduleType: "",
        starttime: "",
        endtime: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        starttime: "",
        endtime: ""
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 查询操作日志列表
    this.fetchListData();
  },
  methods: {
    // 查询操作日志列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      querySysAopLogList(data).then(res => {
        this.operationLogList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询操作日志列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询操作日志列表
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      querySysAopLogList(data).then(res => {
        this.operationLogList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        userName: "",
        moduleType: "",
        starttime: "",
        endtime: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        starttime: "",
        endtime: ""
      };
      // 查询操作日志列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.operationLogList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.operationLogList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.operationLogList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除日志信息
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          delSysAopLog(data).then(res => {
            this.$message.success(res.msg);
            // 查询操作日志列表
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除医院/家庭客户信息
    batchHandleDelete() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择要删除的数据");
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let arr = [];
            this.multipleSelection.forEach(item => {
              arr.push(item.id);
            });
            let idData = arr.toString();
            delSysAopLog(idData).then(res => {
              this.$message.success(res.msg);
              // 查询操作日志列表
              this.fetchListData();
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },
    // 批量导出
    excelBtn() {
      let o = [["操作用户", "操作类型", "具体内容", "操作时间"]];

      if (this.multipleSelection.length == 0) {
         this.pageQuery.rows = 100000;
        querySysAopLogList( this.pageQuery).then(res => {
           this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];
            arr.push(item.userName);

            arr.push(item.moduleType);

            arr.push(item.moduleDesc);

            arr.push(item.createDate);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "操作日志列表");
          XLSX.writeFile(wb, "操作日志列表.xlsx");
        });
      } else {

        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(item.userName);

          arr.push(item.moduleType);

          arr.push(item.moduleDesc);

          arr.push(item.createDate);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "操作日志列表");
        XLSX.writeFile(wb, "操作日志列表.xlsx");
      }
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

