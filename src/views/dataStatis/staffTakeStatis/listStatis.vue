<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>省份：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.province"
                  @change="provinceChange"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>员工：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.staffName" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in staffNames"
                    :key="item.id"
                    :label="item.staffName"
                    :value="item.staffName"
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
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd"
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
          <span>员工接单-列表统计</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="staffTakeStatisList"
          ref="staffTakeStatisList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="staffName" label="员工" align="center"></el-table-column>

          <el-table-column property="province" label="省份" align="center">
            <template slot-scope="scope">
              <div style="width:100%   ;  height: 25px;
    overflow: hidden;">
                <div
                  v-for="(name,index) in scope.row.province"
                  :key="index"
                  v-show="scope.row.province.length -1 != index"
                  style="    display: inline-block;
    vertical-align: top;"
                >{{name+","}}</div>
                <div
                  v-for="(name,index1) in scope.row.province"
                  :key="index1"
                  v-show="scope.row.province.length-1==index1"
                  style="    display: inline-block;
    vertical-align: top;"
                >{{name}}</div>
              </div>
            </template>
            <!-- <template slot-scope="scope">{{scope.row.province | dicFilter(provinces)}}</template> -->
          </el-table-column>

          <el-table-column property="receipt" label="接单数量" align="center"></el-table-column>

          <el-table-column property="refusal" label="拒单数量" align="center"></el-table-column>

          <el-table-column property="timeOut" label="接单超时数量" align="center"></el-table-column>

          <el-table-column property="acceptAndRefusal" label="接单后拒单数量" align="center"></el-table-column>
          <el-table-column property="createTime" label="创建时间" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(staffTakeStatisList)" type="primary" size="mini">反选</el-button>
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
// 获取所有字典值
import { getAllDict } from "@/api/common";
// 获取所有员工
import { queryStaffList } from "@/api/userClassify";
// 查询员工接单-列表统计数据
import { queryOrderForm } from "@/api/dataStatis";

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
      // 所有省份
      provinces: [],
      // 所有员工
      staffNames: [],
      // 表格数据
      staffTakeStatisList: [],
      staffTakeStatisList1: [],
      // 选中表格数据
      multipleSelection: [],
      //   筛选数据
      pageQuery: {
        province: "",
        staffName: "",
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
    // 获取所有员工
    // this.fetchStaffListData();
    
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PROVINCE";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 查询员工接单-列表统计数据
        this.fetchListData();
      });
    },
    // 获取所有省份对应的员工
    provinceChange(val) {
      let obj = {};
      obj = this.provinces.find(item => {
        return item.value === val;
      });

      if (obj != undefined) {
        let data = { province: obj.id ,rows:100000};
        queryStaffList(data).then(res => {
          let data = res.data.list;
          for (let i = 0; i <= data.length - 1; i++) {
            let arr = [];
            for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
              for (let m = 0; m <= this.provinces.length - 1; m++) {
                if (data[i].province.split(",")[j] == this.provinces[m].value) {
                  arr.push(this.provinces[m].lable);
                }
              }
            }
            data[i].province = arr;
          }

          this.staffNames = res.data.list;
        });
      } else {
        this.fetchStaffListData();
      }
    },
    // 获取所有员工
    fetchStaffListData() {
      let data = { province: this.pageQuery.province };
      queryStaffList(data).then(res => {
        let data = res.data.list;
        for (let i = 0; i <= data.length - 1; i++) {
          let arr = [];
          for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
            for (let m = 0; m <= this.provinces.length - 1; m++) {
              if (data[i].province.split(",")[j] == this.provinces[m].value) {
                arr.push(this.provinces[m].lable);
              }
            }
          }
          data[i].province = arr;
        }

        console.log('1213')
        this.staffNames = res.data.list;
      });
    },
    // 查询员工接单-列表统计数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryOrderForm(data).then(res => {
        let data = res.data.list;
        for (let i = 0; i <= data.length - 1; i++) {
          let arr = [];
          for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
            for (let m = 0; m <= this.provinces.length - 1; m++) {
              if (data[i].province.split(",")[j] == this.provinces[m].value) {
                arr.push(this.provinces[m].lable);
              }
            }
          }
          data[i].province = arr;
        }

        this.staffTakeStatisList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询员工接单-列表统计数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询员工接单-列表统计数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryOrderForm(data).then(res => {
        let data = res.data.list;
        for (let i = 0; i <= data.length - 1; i++) {
          let arr = [];
          for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
            for (let m = 0; m <= this.provinces.length - 1; m++) {
              if (data[i].province.split(",")[j] == this.provinces[m].value) {
                arr.push(this.provinces[m].lable);
              }
            }
          }
          data[i].province = arr;
        }

        this.staffTakeStatisList = res.data.list;
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
      this.$refs.staffTakeStatisList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.staffTakeStatisList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.staffTakeStatisList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      this.pageQuery.rows = 100000;
      queryOrderForm(this.pageQuery).then(res => {
        this.pageQuery.rows = 10;
        if (res.data.list.length == 0) {
          this.$message.warning("没有要导出的数据");
        } else {
          let o = [
            [
              "员工",
              "省份",
              "接单数量",
              "拒单数量",
              "接单超时数量",
              "接单后拒单数量"
            ]
          ];

          res.data.list.map(item => {
            let arr = [];
            arr.push(item.staffName);

            // arr.push(
            //   this.$options.filters.dicFilter(item.province, this.provinces)
            // );

            let arrstr = "";
            for (let i = 0; i < item.province.split(",").length; i++) {
              if (item.province.split(",").length - 1 == i) {
                arrstr += this.$options.filters.dicFilter(
                  item.province.split(",")[i],
                  this.provinces
                );
              } else {
                arrstr +=
                  this.$options.filters.dicFilter(
                    item.province.split(",")[i],
                    this.provinces
                  ) + ",";
              }
            }
            arr.push(arrstr);

            arr.push(item.receipt);

            arr.push(item.refusal);

            arr.push(item.timeOut);

            arr.push(item.acceptAndRefusal);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "员工接单-列表统计");
          XLSX.writeFile(wb, "员工接单-列表统计.xlsx");
        }
      });
    },
    // 返回按钮
    returnBtn() {
      this.$router.push({
        name: "StaffTakeStatis"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

