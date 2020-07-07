<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>用户类型：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.userType" placeholder="请选择" size="small" clearable>
                  <el-option label="员工" value="1"></el-option>
                  <el-option label="医院" value="2"></el-option>
                  <el-option label="渠道" value="3"></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>用户名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.staffName" size="small" clearable></el-input>
              </span>
            </span>

            <span class="kaishi">
              <span>开始时间：</span>
              <span class="searchItem">
                <el-date-picker
                  v-model="pageQuery.startTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  size="small"
                ></el-date-picker>
              </span>
            </span>

            <span class="kaishi">
              <span>结束时间：</span>
              <span class="searchItem">
                <el-date-picker
                  v-model="pageQuery.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  size="small"
                ></el-date-picker>
              </span>
            </span>

            <span class="anniu">
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
          <span>用户上线-列表统计</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="userOnlineStatisList"
          ref="userOnlineStatisList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="userType" label="用户类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.userType == 1">员工</span>
              <span v-if="scope.row.userType == 2">医院</span>
              <span v-if="scope.row.userType == 3">渠道</span>
            </template>
          </el-table-column>

          <el-table-column property="staffName" label="用户名称" align="center"></el-table-column>

          <el-table-column property="onlineCount" label="上线次数" align="center"></el-table-column>

          <el-table-column property="onlineTime" label="上线时间" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(userOnlineStatisList)" type="primary" size="mini">反选</el-button>
          <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button> -->
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
// 查询用户上线-列表统计数据
import { queryOnlineForm } from "@/api/dataStatis";

import XLSX from "xlsx";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 表格数据
      userOnlineStatisList: [],
      //   筛选数据
      pageQuery: {
        userType: "",
        staffName: "",
        startTime: "",
        endTime: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },
      usernametype: [
        {
          id: 1,
          name: "员工"
        },
        {
          id: 2,
          name: "医院"
        },
        {
          id: 3,
          name: "渠道"
        }
      ],

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 查询用户上线-列表统计数据
    this.fetchListData();
  },
  methods: {
    // 查询用户上线-列表统计数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryOnlineForm(data).then(res => {
        this.userOnlineStatisList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询用户上线-列表统计数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询用户上线-列表统计数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryOnlineForm(data).then(res => {
        this.userOnlineStatisList = res.data.list;
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
      this.$refs.userOnlineStatisList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.userOnlineStatisList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.userOnlineStatisList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      
      this.pageQuery.rows = 100000

      queryOnlineForm(this.pageQuery).then(res => {
        this.pageQuery.rows = 10
        if (res.data.list.length == 0) {
          this.$message.warning("没有要导出的数据");
        } else {
          for (let i = 0; i <= res.data.list.length - 1; i++) {
            for (let im = 0; im <= this.usernametype.length - 1; im++) {
              if (res.data.list[i].userType == this.usernametype[im].id) {
                res.data.list[i].userType = this.usernametype[im].name;
              }
            }
          }

          let o = [["用户类型", "用户名称", "上线次数", "上线时间"]];

          res.data.list.map(item => {
            let arr = [];
            arr.push(item.userType);

            arr.push(item.staffName);

            arr.push(item.onlineCount);

            arr.push(item.onlineTime);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "用户上线-列表统计");
          XLSX.writeFile(wb, "用户上线-列表统计.xlsx");
        }
      });
    },
    // 返回按钮
    returnBtn() {
      this.$router.push({
        name: "UserOnlineStatis"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
<style scoped>
.searchRow {
  width: 100%;
}
.searchRow span{
  width: 175px;
}
.searchRow .kaishi{
  width: 200px;
}
.searchRow  .anniu {
  width: 300px;
}
</style>
