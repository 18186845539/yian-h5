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
                <el-input v-model="pageQuery.customer" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>序列号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.deviceId" size="small" clearable></el-input>
              </span>
            </span>

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
                    v-for="item in productLines"
                    :key="item.id"
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
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

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

          <transition name="fade">
            <div v-show="advancedSearch" transiton="fade" class="searchRow">
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
              </span>

              <span>
                <span>申请类型：</span>
                <span class="searchItem">
                  <el-select v-model="pageQuery.applyType" placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in applyTypes"
                      :key="item.id"
                      :label="item.lable"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </span>

              <span>
                <span>安装人：</span>
                <span class="searchItem">
                  <el-input v-model="pageQuery.installOne" size="small" clearable></el-input>
                </span>
              </span>

              <span>
                <span>开始时间：</span>
                <span>
                  <el-date-picker
                    v-model="pageQuery.installTimeStart"
                    type="date"
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
                    v-model="pageQuery.installTimeEnd"
                    type="date"
                    placeholder="结束时间"
                    size="small"
                    clearable
                  ></el-date-picker>
                </span>
              </span>
            </div>
          </transition>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 数据表格部分 -->
    <div class="tableRow">
      <!-- 表格标题部分 -->
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>产品历史列表</span>
        </span>
        <!-- <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toAddPage()">添加产品档案</el-button>
        </span>-->
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="productRecordList"
          ref="productRecordList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <!-- <el-table-column property="province" label="省份" align="center">
            <template slot-scope="scope">{{scope.row.province | dicFilter(provinces)}}</template>
          </el-table-column>-->

          <!-- <el-table-column property="city" label="城市" align="center">
            <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
          </el-table-column>-->

          <el-table-column property="productLine" label="产品线" align="center">
            <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
          </el-table-column>

          <el-table-column property="model" label="型号" align="center">
            <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
          </el-table-column>

          <el-table-column property="productName" label="产品名称" align="center"></el-table-column>

          <el-table-column property="deviceId" label="序列号" align="center"></el-table-column>

          <el-table-column property="customer" label="客户名称" align="center"></el-table-column>

          <!-- <el-table-column property="productLevel" label="客户级别" align="center">
            <template slot-scope="scope">{{scope.row.productLevel | dicFilter(productLevels)}}</template>
          </el-table-column>-->

          <!-- <el-table-column property="department" label="科室" align="center">
            <template slot-scope="scope">{{scope.row.department | dicFilter(departments)}}</template>
          </el-table-column>-->

          <el-table-column property="contacts" label="联系人" align="center"></el-table-column>

          <el-table-column property="phone" label="电话" align="center" width="120"></el-table-column>

          <el-table-column property="dispatchingOrder" label="派工单号" align="center"></el-table-column>

          <el-table-column property="applyType" label="申请类型" align="center">
            <template slot-scope="scope">{{scope.row.applyType | dicFilter(applyTypes)}}</template>
          </el-table-column>

          <!-- <el-table-column property="installOne" label="安装人" align="center"></el-table-column> -->

          <!-- <el-table-column property="installTime" label="安装日期" align="center"></el-table-column> -->

          <!-- <el-table-column property="warrantyStartDate" label="保修开始日期" align="center"></el-table-column> -->

          <!-- <el-table-column property="warrantyEndDate" label="保修结束日期" align="center"></el-table-column> -->

          <el-table-column property="createTime" label="创建时间" align="center" width="150">
            <template slot-scope="scope">{{scope.row.createTime.slice(0,19)}}</template>
          </el-table-column>

          <!-- <el-table-column property="note" label="备注" align="center"></el-table-column> -->

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetailsPage(scope.row)" size="mini">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="管理">
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
          <el-button @click="reverseSelect(productRecordList)" type="primary" size="mini">反选</el-button>
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
// 获取所有字典值/获取省份对应的城市/产品线对应的型号
import { getAllDict, getCity, getModel } from "@/api/common";
// 查询产品档案列表/批量删除产品档案列表
import { queryArchivesList, deleteProductArchives } from "@/api/clientServe";

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
      // 高级筛选显示隐藏控制
      advancedSearch: false,
      // 默认展开
      activeNames: ["1"],
      // 所有省份
      provinces: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      // 所有城市
      cityes: [],
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      // 所有客户级别
      productLevels: [],
      // 所有科室
      departments: [],
      // 所有申请类型
      applyTypes: [],
      // 表格数据
      productRecordList: [],
      // 选中表格数据
      multipleSelection: [],
      // 筛选数据
      pageQuery: {
        province: "",
        city: "",
        productLine: "",
        model: "",
        customer: "",
        deviceId: "",
        applyType: "",
        installOne: "",
        installTimeStart: "",
        installTimeEnd: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 查询员工列表表格数据
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "CITY,PROVINCE,PRODUCT_LINE,EQUI_MODEL,CUSTOMER_LEVEL,DEPARTMENT,APPLY_TYPE";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有市
        this.cityes = res.data.CITY;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取客户级别
        this.productLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有申请类型
        this.applyTypes = res.data.APPLY_TYPE;
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
    // 查询产品档案列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryArchivesList(data).then(res => {
        this.productRecordList = res.data.list;
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
      queryArchivesList(data).then(res => {
        this.productRecordList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        province: "",
        city: "",
        productLine: "",
        model: "",
        customer: "",
        deviceId: "",
        applyType: "",
        installOne: "",
        installTimeStart: "",
        installTimeEnd: "",
        totalCount: 0,
        page: 1,
        rows: 10
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
      // 是否禁用型号下拉
      this.disabledModel = true;
      // 查询产品档案列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.productRecordList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.productRecordList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.productRecordList.toggleRowSelection(row);
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
          deleteProductArchives(data).then(res => {
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
            deleteProductArchives(idData).then(res => {
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
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择要导出的数据");
      } else {
        let o = [
          [
            "省份",
            "城市",
            "产品线",
            "型号",
            "产品名称",
            "序列号",
            "客户名称",
            "客户级别",
            "科室",
            "联系人",
            "电话",
            "派工单号",
            "申请类型",
            "安装人",
            "保修开始日期",
            "保修结束日期",
            "创建时间",
            "备注"
          ]
        ];

        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(
            this.$options.filters.dicFilter(item.province, this.provinces)
          );
          arr.push(this.$options.filters.dicFilter(item.city, this.cityes));
          arr.push(
            this.$options.filters.dicFilter(item.productLine, this.productLines)
          );
          arr.push(this.$options.filters.dicFilter(item.model, this.models));
          arr.push(item.productName);
          arr.push(item.deviceId);
          arr.push(item.customer);
          arr.push(
            this.$options.filters.dicFilter(
              item.productLevel,
              this.productLevels
            )
          );
          arr.push(
            this.$options.filters.dicFilter(item.department, this.departments)
          );
          arr.push(item.contacts);
          arr.push(item.phone);
          arr.push(item.dispatchingOrder);
          arr.push(
            this.$options.filters.dicFilter(item.applyType, this.applyTypes)
          );
          arr.push(item.installOne);
          arr.push(item.installTime);
          arr.push(item.warrantyStartDate);
          arr.push(item.warrantyEndDate);
          arr.push(item.createTime);
          arr.push(item.note);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "产品档案");
        XLSX.writeFile(wb, "产品档案.xlsx");
      }
    },
    // 跳转到添加页面
    toAddPage() {
      this.$router.push({
        name: "AddProductRecord"
      });
    },
    // 跳转到详情页
    toDetailsPage(data) {
      let id = data.id;
      this.$router.push({
        name: "ProductHistoryPR",
        query: {
          sendData: id
        }
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

