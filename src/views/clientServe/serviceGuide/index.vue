<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>拥有者：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.owner" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in owners"
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
              <span>指引类型：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.type" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>文件格式：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.format" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in formats"
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
          <span>维修技能指引列表</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toAddPage()">添加技能指引</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="serviceGuideList"
          ref="serviceGuideList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="productLine" label="产品线" align="center">
            <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
          </el-table-column>

          <el-table-column property="model" label="型号" align="center">
            <template slot-scope="scope">{{scope.row.model | dicFilter(models) }}</template>
          </el-table-column>

          <el-table-column property="type" label="指引类型" align="center">
            <template slot-scope="scope">{{scope.row.type | dicFilter(types)}}</template>
          </el-table-column>

          <el-table-column property="thumbnail" label="图片" align="center">
            <template slot-scope="scope">
              <img :src="imgURL + scope.row.picture.split(',')[0]"  v-show="scope.row.picture != ''" style="width:50px;height:50px" />
            </template>
          </el-table-column>

          <el-table-column property="title" label="标题" align="center"></el-table-column>
          <el-table-column property="addTime" label="创建时间" align="center"></el-table-column>

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetailsPage(scope.row)" size="mini">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="管理" width="150">
            <template slot-scope="scope">
              <el-button
                @click="toEditPage(scope.row)"
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
          <el-button @click="reverseSelect(serviceGuideList)" type="primary" size="mini">反选</el-button>
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
// 获取所有字典值/产品线对应的型号
import { getAllDict, getModel } from "@/api/common";
// 查询维修技能指引列表/批量删除维修技能指引列表
import { queryGuidanceList, deleteGiudance } from "@/api/clientServe";

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
      // 所有拥有者
      owners: [
        {
          children: [],
          defaultImage: "",
          id: "155",
          lable: "全部",
          page: 1,
          parentId: "",
          remarks: "拥有者",
          rows: 10,
          sort: "0",
          type: "OWNER",
          value: ""
        },
        {
          children: [],
          defaultImage: "",
          id: "156",
          lable: "客户",
          page: 1,
          parentId: "",
          remarks: "拥有者",
          rows: 10,
          sort: "0",
          type: "OWNER",
          value: "0,2"
        },
        {
          children: [],
          defaultImage: "",
          id: "157ewqe",
          lable: "员工",
          page: 1,
          parentId: "",
          remarks: "拥有者",
          rows: 10,
          sort: "0",
          type: "OWNER",
          value: "1,2"
        }
      ],
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      //所有指引类型
      types: [],
      //所有文件格式
      formats: [],
      // 表格数据
      serviceGuideList: [],
      // 选中表格数据
      multipleSelection: [],
      //   筛选数据
      pageQuery: {
        owner: "",
        productLine: "",
        model: "",
        type: "",
        format: "",
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
    // 查询维修技能指引列表
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE,EQUI_MODEL,DIRECT_TYPE,FORMAT_TYPE,OWNER";
      getAllDict(data).then(res => {
        // 所有拥有者
        // this.owners = res.data.OWNER;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 所有指引类型
        this.types = res.data.DIRECT_TYPE;
        // 所有文件格式
        this.formats = res.data.FORMAT_TYPE;
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
    // 查询维修技能指引列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryGuidanceList(data).then(res => {
        this.serviceGuideList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询维修技能指引列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询维修技能指引列表
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryGuidanceList(data).then(res => {
        this.serviceGuideList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        owner: "",
        productLine: "",
        model: "",
        type: "",
        format: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        startTime: "",
        endTime: ""
      };
      // 是否禁用型号下拉
      this.disabledModel = true;
      // 查询维修技能指引列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.serviceGuideList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.serviceGuideList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.serviceGuideList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除维修技能指引列表
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          deleteGiudance(data).then(res => {
            this.$message.success(res.data);
            // 查询维修技能指引列表
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除维修技能指引列表
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
            deleteGiudance(idData).then(res => {
              this.$message.success(res.data);
              // 查询维修技能指引列表
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
      let o = [["产品线", "型号", "指引类型", "标题", "创建时间"]];

      if (this.multipleSelection.length == 0) {
         this.pageQuery.rows = 100000;
        queryGuidanceList( this.pageQuery).then(res => {
           this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];

            arr.push(
              this.$options.filters.dicFilter(
                item.productLine,
                this.productLines
              )
            );

            arr.push(this.$options.filters.dicFilter(item.model, this.models));

            arr.push(this.$options.filters.dicFilter(item.type, this.types));

            arr.push(item.title);
            
            arr.push(item.addTime);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "维修技能指引列表");
          XLSX.writeFile(wb, "维修技能指引列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];

          arr.push(
            this.$options.filters.dicFilter(item.productLine, this.productLines)
          );

          arr.push(this.$options.filters.dicFilter(item.model, this.models));

          arr.push(this.$options.filters.dicFilter(item.type, this.types));

          arr.push(item.title);
          arr.push(item.addTime);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "维修技能指引列表");
        XLSX.writeFile(wb, "维修技能指引列表.xlsx");
      }
    },
    // 跳转到添加技能指导页
    toAddPage() {
      this.$router.push({
        name: "AddSkill"
      });
    },
    // 跳转到修改技能指导页
    toEditPage(data) {
      let id = data.id;
      this.$router.push({
        name: "EditSkill",
        query: {
          sendData: id
        }
      });
    },
    // 跳转到详情页
    toDetailsPage(data) {
      let id = data.id;
      this.$router.push({
        name: "DetailsPageSG",
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

