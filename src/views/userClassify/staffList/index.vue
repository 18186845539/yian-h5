<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>用户名：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.userName" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>员工名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.staffName" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>电话：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>

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
              <span>产品线：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.productLine" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in productLines"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <!-- <span>
              <span>城市：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.city"
                  :disabled="disabledCity"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in citys"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>-->
            <transition name="fade">
              <div v-show="advancedSearch" transiton="fade" class="searchRow">
                <span>
                  <span>邮箱：</span>
                  <span class="searchItem">
                    <el-input v-model="pageQuery.email" size="small" clearable></el-input>
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
          <span>员工用户列表</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toAddPage()">添加员工用户</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="staffList"
          ref="staffList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column property="userName" label="用户名" align="center"></el-table-column>

          <el-table-column property="staffName" label="员工名称" align="center"></el-table-column>

          <el-table-column property="phone" label="电话" align="center"></el-table-column>

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
                  v-show="scope.row.province.length-1==index1"
                  style="    display: inline-block;
    vertical-align: top;"
                >{{name}}</div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column property="city" label="城市" align="center">
            <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
          </el-table-column>-->

          <el-table-column property="email" label="邮箱" align="center" width="180"></el-table-column>
          <el-table-column property="createDate" label="创建时间" align="center" width="180">
            <template slot-scope="scope">{{scope.row.createDate | timeslce(scope.row.createDate)}}</template>
          </el-table-column>

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetailsPage(scope.row)" size="mini">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="管理" width="230">
            <template slot-scope="scope">
              <el-button
                @click="toEditPage(scope.row)"
                size="mini"
                type="primary"
                icon="el-icon-edit-outline"
              ></el-button>
              <el-button @click="resetPasswordBtn(scope.row)" size="mini" type="primary">重置密码</el-button>
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
          <el-button @click="reverseSelect(staffList)" type="primary" size="mini">反选</el-button>
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
            :current-page="pageQuery.currentPage"
            :page-sizes="pageSizes"
            :page-size="pageQuery.pageSize"
            layout="prev, pager, next, total, sizes, jumper"
            :total="pageQuery.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 获取所有字典值/获取省份对应的城市
import { getAllDict, getCity } from "@/api/common";
// 查询员工列表表格数据/删除员工信息/重置员工密码
import {
  queryStaffList,
  delStaffInfo,
  resetPassword
} from "@/api/userClassify";

import XLSX from "xlsx";

export default {
  // 过滤显示
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d, n) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
    }
  },

  data() {
    return {
      // 高级筛选显示隐藏控制
      advancedSearch: false,
      // 默认展开
      activeNames: ["1"],
      // 所有省份
      provinces: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 所有产品线
      productLines: [],
      // 省份对应的城市下拉
      citys: [],
      // 所有城市
      cityes: [],
      // 表格数据
      staffList: [],
      // 选中表格数据
      multipleSelection: [],
      // 筛选数据
      pageQuery: {
        userName: "",
        productLine: "",
        staffName: "",
        phone: "",
        province: "",
        city: "",
        email: "",
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
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "CITY,PROVINCE,PRODUCT_LINE";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有市
        this.cityes = res.data.CITY;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;

        // 查询员工列表表格数据
        this.fetchListData();
      });
    },
    // 获取所有省份对应的城市
    provinceChange(val) {
      // 清空城市
      this.pageQuery.city = "";
      this.disabledCity = true;

      let obj = {};
      obj = this.provinces.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledCity = false;
        getCity(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.citys = res.data.CITY;
          } else {
            this.citys = [];
          }
        });
      }
    },
    // 查询员工列表表格数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
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
        this.staffList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询员工列表表格数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询员工列表表格数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
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
        this.staffList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        userName: "",
        productLine: "",
        staffName: "",
        phone: "",
        province: "",
        city: "",
        email: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        startTime: "",
        endTime: ""
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
      // 查询员工列表表格数据
      this.fetchListData();
    },
    // 重置员工密码
    resetPasswordBtn(rowData) {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z0-9_-]{4,16}$/,
        inputErrorMessage: "请输入正确的4-16位，数组、字母、下划线密码！"
      })
        .then(({ value }) => {
          let data = { staffId: rowData.staffId, password: value };
          resetPassword(data).then(res => {
            this.$message.success(res.msg);
            // 查询员工列表表格数据
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消重置密码");
        });
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.staffList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.staffList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.staffList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除删除员工信息
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          delStaffInfo(data).then(res => {
            this.$message.success(res.msg);
            // 查询员工列表表格数据
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除删除员工信息
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
            delStaffInfo(idData).then(res => {
              this.$message.success(res.msg);
              // 查询员工列表表格数据
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
      let o = [["用户名", "员工名称", "电话", "省", "邮箱", "创建时间"]];

      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryStaffList(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];

            arr.push(item.userName);
            arr.push(item.staffName);
            arr.push(item.phone);
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
            // arr.push(this.$options.filters.dicFilter(item.city, this.cityes));
            arr.push(item.email);
            arr.push(item.createDate);
            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "员工列表");
          XLSX.writeFile(wb, "员工列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(item.userName);
          arr.push(item.staffName);
          arr.push(item.phone);
          let arrstr = "";
          for (let i = 0; i < item.province.length; i++) {
            if (item.province.length - 1 == i) {
              arrstr += item.province[i];
            } else {
              arrstr += item.province[i] + ",";
            }
          }
          arr.push(arrstr);
          // arr.push(item.province);
          // arr.push(this.$options.filters.dicFilter(item.city, this.cityes));
          arr.push(item.email);
          arr.push(item.createDate);
          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "员工列表");
        XLSX.writeFile(wb, "员工列表.xlsx");
      }
    },
    // 跳转到添加页面
    toAddPage() {
      this.$router.push({
        name: "AddStaffList"
      });
    },
    // 跳转到编辑页
    toEditPage(data) {
      let staffId = data.staffId;
      this.$router.push({
        name: "EditStaffList",
        query: {
          sendData: staffId
        }
      });
    },
    // 跳转到详情页
    toDetailsPage(data) {
      let staffId = data.staffId;
      this.$router.push({
        name: "DetailsPageSL",
        query: {
          sendData: staffId
        }
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

