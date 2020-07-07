<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>类型：</span>
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
              <span>产品：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.twoType"
                  @change="twoTypeChange"
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
              <span>配件型号：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.model"
                  :disabled="disabledThreeType"
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
              <span>物料编码：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.materielCode" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>配件名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.partsName" size="small" clearable></el-input>
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
          <span>配件管理列表</span>
        </span>
        <span>
          <el-button
            type="success"
            icon="el-icon-plus"
            size="small"
            @click="toPartsTypePage()"
          >添加产品类型</el-button>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toAddParts()">添加配件</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="partsManageList"
          ref="partsManageList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="materielCode" label="物料编码" align="center">
            <template slot-scope="scope">{{scope.row.materielCode}}</template>
          </el-table-column>

          <el-table-column property="picture" label="配件图片" align="center">
            <template slot-scope="scope">
              <img
                :src="imgURL + scope.row.picture.split(',')[0]"
                style="width:50px;height:50px"
                v-show="scope.row.picture != ''"
              />
            </template>
          </el-table-column>

          <el-table-column property="oneType" label="类型" align="center">
            <template slot-scope="scope">{{scope.row.oneType | dicFilter(oneTypes)}}</template>
          </el-table-column>

          <el-table-column property="twoType" label="产品线" align="center">
            <template slot-scope="scope">{{scope.row.twoType | dicFilter(twoTypees)}}</template>
          </el-table-column>

          <el-table-column property="partsName" label="配件名称" align="center"></el-table-column>

          <el-table-column property="model" label="型号" align="center">
            <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
          </el-table-column>

          <el-table-column property="buyTime" label="创建时间" align="center"></el-table-column>

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetailsPage(scope.row)" size="mini">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="管理" width="150">
            <template slot-scope="scope">
              <el-button
                @click="toEditParts(scope.row)"
                size="mini"
                type="primary"
                icon="el-icon-edit-outline"
              ></el-button>
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
          <el-button @click="reverseSelect(partsManageList)" type="primary" size="mini">反选</el-button>
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
// 获取所有字典值/获取一级类型对应的二级类型/获取二级类型对应的三级型号
import { getAllDict, getTwoTyep, getThreeTyep } from "@/api/common";
// 查询客户管理列表/批量删除客户管理信息
import { queryPartsList, deletePartdBuyById } from "@/api/clientServe";

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
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 默认展开
      activeNames: ["1"],
      // 所有一级类型
      oneTypes: [],
      // 是否禁用二级类型
      disabledTwoType: true,
      // 一级类型对应的二级类型下拉
      twoTypes: [],
      // 所有二级类型
      twoTypees: [],
      // 是否禁用三级型号
      disabledThreeType: true,
      // 所有三级型号
      models: [],
      // 表格数据
      partsManageList: [],
      // 选中表格数据
      multipleSelection: [],

      //   筛选数据
      pageQuery: {
        oneType: "",
        twoType: "",
        partsName: "",
        model: "",
        materielCode:"",//物料编码
        totalCount: 0,
        page: 1,
        rows: 10,
        endTime: "",
        startTime: ""
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 查询配件管理列表
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PARTS_TYPE_ONE,PARTS_TYPE_TWO,PARTS_TYPE_THREE";
      getAllDict(data).then(res => {
        // 获取所有一级类型
        this.oneTypes = res.data.PARTS_TYPE_ONE;
        // 获取所有二级类型
        this.twoTypees = res.data.PARTS_TYPE_TWO;
        // 获取所有三级型号
        this.models = res.data.PARTS_TYPE_THREE;
      });
    },
    // 获取所有一级类型对应的二级类型
    provinceChange(val) {
      // 清空并禁用二级产品
      this.pageQuery.twoType = "";
      this.disabledTwoType = true;
      // 清空并禁用三级型号
      this.pageQuery.model = "";
      this.disabledThreeType = true;

      let obj = {};
      obj = this.oneTypes.find(item => {
        return item.value === val;
      });
      if (obj) {
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
    // 获取所有二级类型对应的三级型号
    twoTypeChange(val) {
      // 清空并禁用三级型号
      this.pageQuery.model = "";
      this.disabledThreeType = true;

      let obj = {};
      obj = this.twoTypes.find(item => {
        return item.value === val;
      });
      if (obj) {
        let data = obj.id;
        this.disabledThreeType = false;
        getThreeTyep(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.models = res.data.PARTS_TYPE_THREE;
          } else {
            this.models = [];
          }
        });
      }
    },
    // 查询配件管理列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryPartsList(data).then(res => {
        this.partsManageList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询配件管理列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询配件管理列表
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryPartsList(data).then(res => {
        this.partsManageList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        oneType: "",
        twoType: "",
        partsName: "",
        model: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        endTime: "",
        startTime: ""
      };
      this.disabledTwoType = true;
      this.disabledThreeType = true;
      // 查询配件管理列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.partsManageList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.partsManageList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.partsManageList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除配件管理列表
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          deletePartdBuyById(data).then(res => {
            this.$message.success(res.data);
            // 查询配件管理列表
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除配件管理列表
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
            deletePartdBuyById(idData).then(res => {
              this.$message.success(res.data);
              // 查询配件管理列表
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
      let o = [["物料编码", "类型", "产品线", "配件名称", "型号", "创建时间"]];

      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryPartsList(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];

            arr.push(item.materielCode);
            arr.push(
              this.$options.filters.dicFilter(item.oneType, this.oneTypes)
            );

            arr.push(
              this.$options.filters.dicFilter(item.twoType, this.twoTypees)
            );

            arr.push(item.partsName);

            arr.push(this.$options.filters.dicFilter(item.model, this.models));

            arr.push(item.buyTime);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "配件管理列表");
          XLSX.writeFile(wb, "配件管理列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];

          arr.push(item.materielCode);
          arr.push(
            this.$options.filters.dicFilter(item.oneType, this.oneTypes)
          );

          arr.push(
            this.$options.filters.dicFilter(item.twoType, this.twoTypes)
          );

          arr.push(item.partsName);

          arr.push(this.$options.filters.dicFilter(item.model, this.models));

          arr.push(item.buyTime);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "配件管理列表");
        XLSX.writeFile(wb, "配件管理列表.xlsx");
      }
    },
    // 跳转到配件分类页
    toPartsTypePage() {
      this.$router.push({
        name: "PartsType"
      });
    },
    // 跳转到添加配件页
    toAddParts() {
      this.$router.push({
        name: "AddParts"
      });
    },
    // 跳转到修改配件页
    toEditParts(data) {
      let id = data.id;
      this.$router.push({
        name: "EditParts",
        query: {
          sendData: id
        }
      });
    },
    // 跳转到详情页
    toDetailsPage(data) {
      let id = data.id;
      this.$router.push({
        name: "DetailsPagePML",
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

