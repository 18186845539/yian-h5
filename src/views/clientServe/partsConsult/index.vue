<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>客户名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.customerName" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>电话：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>咨询类型：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.oneType"
                  @change="provinceChange"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in oneTypes"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>咨询产品：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.twoType"
                  :disabled="disabledTwoType"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in twoTypes"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
                  clearable
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
                  clearable
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
          <span>配件购买与咨询列表</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="partsConsultList"
          ref="partsConsultList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

          <el-table-column property="phone" label="电话" align="center"></el-table-column>

          <el-table-column property="oneType" label="咨询类型" align="center">
            <template slot-scope="scope">{{scope.row.oneType | dicFilter(oneTypes)}}</template>
          </el-table-column>

          <el-table-column property="twoType" label="咨询产品" align="center">
            <template slot-scope="scope">{{scope.row.twoType | dicFilter(twoTypees)}}</template>
          </el-table-column>

          <el-table-column property="nameTitle" label="标题" align="center"></el-table-column>

          <el-table-column property="consultingTime" label="创建时间" align="center" width="150">
            <template slot-scope="scope">{{scope.row.consultingTime.slice(0,19)}}</template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-badge value="new" class="item" :hidden="!scope.row.serviceHaveMessage">
                <el-button @click="replyBtn(scope.row)" size="mini">回复</el-button>
              </el-badge>
            </template>
          </el-table-column>

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
          <el-button @click="reverseSelect(partsConsultList)" type="primary" size="mini">反选</el-button>
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
// 获取所有字典值/咨询类型对应的咨询产品下拉
import { getAllDict, getTwoTyep } from "@/api/common";
// 查询配件购买与咨询列表/删除配件购买与咨询列表
import { queryRecordsList, deteteConsulting } from "@/api/clientServe";

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
      // 所有咨询类型
      oneTypes: [],
      // 是否禁用咨询产品
      disabledTwoType: true,
      // 咨询类型对应的咨询产品下拉
      twoTypes: [],
      // 所有咨询产品
      twoTypees: [],
      // 表格数据
      partsConsultList: [],
      // 选中表格数据
      multipleSelection: [],
      // 筛选数据
      pageQuery: {
        customerName: "",
        phone: "",
        oneType: "",
        twoType: "",
        consultingType: "0",
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
    // 查询配件购买与咨询列表
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PARTS_TYPE_ONE,PARTS_TYPE_TWO";
      getAllDict(data).then(res => {
        // 获取所有一级类型
        this.oneTypes = res.data.PARTS_TYPE_ONE;
        // 获取所有二级类型
        this.twoTypees = res.data.PARTS_TYPE_TWO;
      });
    },
    // 获取所有一级类型对应的二级类型
    provinceChange(val) {
      // 清空二级产品
      this.pageQuery.twoType = "";
      this.disabledTwoType = true;

      let obj = {};
      obj = this.oneTypes.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledTwoType = false;
        getTwoTyep(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.twoTypes = res.data.PARTS_TYPE_TWO;
          } else {
            this.twoTypes = [];
          }
        });
      }
    },
    // 查询配件购买与咨询列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryRecordsList(data).then(res => {
        this.partsConsultList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询配件购买与咨询列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询配件购买与咨询列表
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryRecordsList(data).then(res => {
        this.partsConsultList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        customerName: "",
        phone: "",
        oneType: "",
        twoType: "",
        consultingType: "0",
        totalCount: 0,
        page: 1,
        rows: 10,
        startTime: "",
        endTime: ""
      };
      // 是否禁用咨询产品
      this.disabledTwoType = true;
      // 查询配件购买与咨询列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.partsConsultList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.partsConsultList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.partsConsultList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除配件购买与咨询列表
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          deteteConsulting(data).then(res => {
            this.$message.success(res.data);
            // 查询医院/家庭客户表格数据
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除配件购买与咨询列表
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
            deteteConsulting(idData).then(res => {
              this.$message.success(res.data);
              // 查询医院/家庭客户表格数据
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
      let o = [["客户名称", "电话", "咨询类型", "咨询产品", "标题","创建时间"]];

      if (this.multipleSelection.length == 0) {
         this.pageQuery.rows = 100000;
        queryRecordsList(this.pageQuery).then(res => {
           this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];

            arr.push(item.customerName);

            arr.push(item.phone);

            arr.push(
              this.$options.filters.dicFilter(item.oneType, this.oneTypes)
            );

            arr.push(
              this.$options.filters.dicFilter(item.twoType, this.twoTypees)
            );

            arr.push(item.nameTitle);
            arr.push(item.consultingTime);
            
            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "配件购买与咨询列表");
          XLSX.writeFile(wb, "配件购买与咨询列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];

          arr.push(item.customerName);

          arr.push(item.phone);

          arr.push(
            this.$options.filters.dicFilter(item.oneType, this.oneTypes)
          );

          arr.push(
            this.$options.filters.dicFilter(item.twoType, this.twoTypees)
          );

          arr.push(item.nameTitle);
            arr.push(item.consultingTime);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "配件购买与咨询列表");
        XLSX.writeFile(wb, "配件购买与咨询列表.xlsx");
      }
    },
    // 跳转到咨询回复页
    replyBtn(rows) {
      let id = rows.id;
      let userid = rows.customerId;
      this.$router.push({
        name: "Reply",
        query: {
          sendData: id,
          userid: userid
        }
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
