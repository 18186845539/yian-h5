<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>产品线：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.productLine"
                  @change="productLineChange"
                  size="small"
                  placeholder="请选择"
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
                  size="small"
                  placeholder="请选择"
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
              <span>产品名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.product" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>客户名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.userName" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>联系人：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.linkman" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>电话：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>
            <transition name="fade">
              <div v-show="advancedSearch" transiton="fade" class="searchRow">
                <span>
                  <span>反馈评价（星级）：</span>
                  <span class="searchItem">
                    <el-select
                      v-model="pageQuery.feedbackEvaluation"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option label="一星" value="1"></el-option>
                      <el-option label="二星" value="2"></el-option>
                      <el-option label="三星" value="3"></el-option>
                      <el-option label="四星" value="4"></el-option>
                      <el-option label="五星" value="5"></el-option>
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
          <span>意见反馈列表</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="ideaFeedbackList"
          ref="ideaFeedbackList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="productLine" label="产品线" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
          </el-table-column>

          <el-table-column property="model" label="型号" align="center">
            <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
          </el-table-column>

          <el-table-column property="product" label="产品名称" align="center"></el-table-column>

          <el-table-column property="userName" label="客户名称" align="center"></el-table-column>

          <el-table-column property="hospital" label="医院名称" align="center" width="200"></el-table-column>

          <el-table-column property="phone" label="电话" align="center"></el-table-column>

          <el-table-column
            property="feedbackEvaluation"
            label="反馈评价（星级）"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.feedbackEvaluation"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
              ></el-rate>
            </template>
          </el-table-column>

          <el-table-column
            property="feedback"
            label="反馈内容"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetailsPage(scope.row)" size="mini">查看</el-button>
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
          <el-button @click="reverseSelect(ideaFeedbackList)" type="primary" size="mini">反选</el-button>
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
// 查询意见反馈列表/删除意见反馈
import {
  queryYianOpinionFeedbackList,
  delOpinionFeedback
} from "@/api/logManage";

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
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      // 表格数据
      ideaFeedbackList: [],
      // 选中表格数据
      multipleSelection: [],
      //   筛选数据
      pageQuery: {
        productLine: "",
        model: "",
        product: "",
        userName: "",
        linkman: "",
        phone: "",
        feedbackEvaluation: "",
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
    // 查询意见反馈列表
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE,EQUI_MODEL";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
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
    }, // 查询意见反馈列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryYianOpinionFeedbackList(data).then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].feedbackEvaluation == "") {
            res.data.list[i].feedbackEvaluation = 0;
          } else {
            res.data.list[i].feedbackEvaluation = parseInt(
              res.data.list[i].feedbackEvaluation
            );
          }
        }
        this.ideaFeedbackList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询意见反馈列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询意见反馈列表
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryYianOpinionFeedbackList(data).then(res => {
        this.ideaFeedbackList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        hospitalType: "",
        customerCode: "",
        hospitalName: "",
        province: "",
        city: "",
        name: "",
        phone: "",
        department: "",
        position: "",
        totalCount: 0,
        page: 1,
        rows: 10,
        startTime: "",
        endTime: ""
      };
      // 是否禁用型号下拉
      this.disabledModel = true;
      // 查询医院/家庭客户表格数据
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.ideaFeedbackList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.ideaFeedbackList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.ideaFeedbackList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除医院/家庭客户信息
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          delOpinionFeedback(data).then(res => {
            this.$message.success(res.msg);
            // 查询医院/家庭客户表格数据
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
            delOpinionFeedback(idData).then(res => {
              this.$message.success(res.msg);
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
      let o = [
        [
          "产品线",
          "型号",
          "产品名称",
          "客户名称",
          "医院名称",
          "电话",
          "反馈评价（星级）",
          "反馈内容",
          "创建时间"
        ]
      ];
      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryYianOpinionFeedbackList(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].feedbackEvaluation == "") {
              res.data.list[i].feedbackEvaluation = 0;
            } else {
              res.data.list[i].feedbackEvaluation = parseInt(
                res.data.list[i].feedbackEvaluation
              );
            }
          }
          res.data.list.map(item => {
            let arr = [];

            arr.push(
              this.$options.filters.dicFilter(
                item.productLine,
                this.productLines
              )
            );

            arr.push(this.$options.filters.dicFilter(item.model, this.models));

            arr.push(item.product);

            arr.push(item.userName);

            arr.push(item.hospital);

            arr.push(item.phone);

            arr.push(item.feedbackEvaluation);

            arr.push(item.feedback);
            arr.push(item.createDate);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "意见反馈列表");
          XLSX.writeFile(wb, "意见反馈列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];

          arr.push(
            this.$options.filters.dicFilter(item.productLine, this.productLines)
          );

          arr.push(this.$options.filters.dicFilter(item.model, this.models));

          arr.push(item.product);

          arr.push(item.userName);

          arr.push(item.hospital);

          arr.push(item.phone);

          arr.push(item.feedbackEvaluation);

          arr.push(item.feedback);
          arr.push(item.createDate);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "意见反馈列表");
        XLSX.writeFile(wb, "意见反馈列表.xlsx");
      }
    },
    // 跳转到详情页
    toDetailsPage(data) {
      let id = data.id;
      this.$router.push({
        name: "IdeaFeedbackDetails",
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

