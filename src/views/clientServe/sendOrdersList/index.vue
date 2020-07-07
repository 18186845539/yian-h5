<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>派工单状态：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.status" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in statuss"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>工单编号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.assignId" size="small" clearable></el-input>
              </span>
            </span>

           <span>
                <span>联系人：</span>
                <span class="searchItem">
                  <el-input v-model="pageQuery.contacts" size="small" clearable></el-input>
                </span>
              </span>

              <span>
                <span>电话：</span>
                <span class="searchItem">
                  <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
                </span>
              </span>
            <span>
              <span>客户名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.customerName" size="small" clearable></el-input>
              </span>
            </span>
            <transition name="fade">
            <div v-show="advancedSearch" transiton="fade" class="searchRow">
             

              <span>
                <span>科室：</span>
                <span class="searchItem">
                  <el-select
                    v-model="pageQuery.department"
                    placeholder="请选择"
                    size="small"
                    clearable
                  >
                    <el-option
                      v-for="item in departments"
                      :key="item.id"
                      :label="item.lable"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </span>

              <!-- <span>
                <span>职位：</span>
                <span class="searchItem">
                  <el-select v-model="pageQuery.position" placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.lable"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </span> --> 
              

              <span>
                <span>指派员工：</span>
                <span class="searchItem">
                   <el-input v-model="pageQuery.staffName" size="small" clearable></el-input>
                    
                </span>
              </span> 

              <span>
                <span>开始时间：</span>
                <span>
                  <el-date-picker
                    v-model="pageQuery.createDateBegin"
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
                    v-model="pageQuery.createDateEnd"
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
          <span>派单列表</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="sendOrdersList"
          ref="sendOrdersList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column property="assignId" label="工单编号-流程详情" align="center" width="160">
            <template slot-scope="scope">
              <span @click="detailsShow(scope.row)" class="workOrder">{{scope.row.assignId}}</span>
            </template>
          </el-table-column>
          <el-table-column property="staffName" label="指派员工" align="center"></el-table-column>
          <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

          <el-table-column property="department" label="科室" align="center">
            <template slot-scope="scope">{{scope.row.department | dicFilter(departments)}}</template>
          </el-table-column>

          <el-table-column property="contacts" label="联系人" align="center"></el-table-column>

          <el-table-column property="phone" label="电话" align="center" width="120"></el-table-column>

          <el-table-column property="createDate" label="创建时间" align="center" width="150">
            <template slot-scope="scope">{{scope.row.createDate | timeslce(scope.row.createDate)}}</template>
          </el-table-column>

          <el-table-column property="position" label="优先级" align="center">
            <template slot-scope="scope">
              <!-- 正常 -->
              <el-tag
                v-if="scope.row.priority==0"
                type="success"
                size="small"
              >{{scope.row.priority | dicFilter(prioritys)}}</el-tag>
              <!-- 加急 -->
              <el-tag
                v-if="scope.row.priority==1"
                type="danger"
                size="small"
              >{{scope.row.priority | dicFilter(prioritys)}}</el-tag>
              <!-- 优先 -->
              <el-tag
                v-if="scope.row.priority==2"
                type="warning"
                size="small"
              >{{scope.row.priority | dicFilter(prioritys)}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column property="status" label="状态" align="center">
            <template slot-scope="scope">
              <!-- 未审核 -->
              <el-tag
                v-if="scope.row.status==0"
                type="warning"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 待派单 -->
              <el-tag
                v-if="scope.row.status==1"
                type="success"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 已拒绝 -->
              <el-tag
                v-if="scope.row.status==2"
                type="danger"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 再次派单 -->
              <el-tag
                v-if="scope.row.status==3"
                type="warning"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 未接单 -->
              <el-tag
                v-if="scope.row.status==4"
                type="warning"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 已接单 -->
              <el-tag
                v-if="scope.row.status==5"
                type="warning"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 已完成 -->
              <el-tag
                v-if="scope.row.status==6"
                type="success"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 已结束 -->
              <el-tag
                v-if="scope.row.status==7"
                type="success"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
              <!-- 审核未通过 -->
              <el-tag
                v-if="scope.row.status==8"
                type="warning"
                size="small"
              >{{scope.row.status | dicFilter(statuss)}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column property="date" label="服务评价" width="100" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>当前数据没有评价哦！</p>
                <div slot="reference" class="name-wrapper">
                  <el-button v-if="scope.row.isHaveService == false" disabled size="mini">查看评价</el-button>
                </div>
              </el-popover>

              <el-button
                v-if="scope.row.isHaveService == true"
                @click="toExamineAppraise(scope.row)"
                size="mini"
              >查看评价</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="工单详情" width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>只有已完成、已结束状态才可查看详情哦！</p>
                <div slot="reference" class="name-wrapper">
                  <el-button
                    v-if="scope.row.status == 0 || scope.row.status == 1|| scope.row.status == 2|| scope.row.status == 3|| scope.row.status == 4|| scope.row.status == 5|| scope.row.status == 8"
                    disabled
                    size="mini"
                  >查看详情</el-button>
                </div>
              </el-popover>

              <el-button
                v-if="scope.row.status == 6 || scope.row.status == 7"
                @click="toWorkOrder(scope.row)"
                size="mini"
              >查看详情</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="管理" width="200">
            <template slot-scope="scope" style="display: flex;justify-content: space-around;">
              <span style="float: left;">
                <el-popover trigger="hover" placement="top">
                  <p>只有未接单状态才可撤单哦！</p>
                  <div slot="reference" class="name-wrapper">
                    <el-button v-if="scope.row.status!=4" type="info" disabled size="mini">撤单</el-button>
                  </div>
                </el-popover>
                <el-button
                  v-if="scope.row.status==4"
                  @click="Monitoringoperationis(scope.row,'撤单')"
                  size="mini"
                >撤单</el-button>
              </span>

              <span style="float: left;margin: 0 10px;">
                <el-popover trigger="hover" placement="top">
                  <p>只有已完成状态才可结束哦！</p>
                  <div slot="reference" class="name-wrapper">
                    <el-button v-if="scope.row.status!=6" type="info" disabled size="mini">结束</el-button>
                  </div>
                </el-popover>
                <el-button
                  v-if="scope.row.status==6"
                  @click="Monitoringoperationis(scope.row,'结束工单')"
                  size="mini"
                >结束</el-button>
              </span>

              <span style="float: left;">
                <el-button
                  @click="handleDelete(scope.row)"
                  size="mini"
                  type="warning"
                  icon="el-icon-delete"
                ></el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(sendOrdersList)" type="primary" size="mini">反选</el-button>
          <el-button @click="cancelSelect()" type="primary" size="mini">全不选</el-button>
          <el-button @click="batchHandleDelete()" type="primary" size="mini">批量删除</el-button>
          <!-- <el-button @click="batchHandDownload()" type="primary" size="mini">批量下载</el-button> -->
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

    <!-- 详情弹框部分 -->
    <div class="tableRow">
      <el-dialog :visible.sync="dialogTableVisible" width="70%" :modal-append-to-body="false">
        <el-table :data="detailsList">
          <el-table-column property="assignId" label="工单编号"></el-table-column>

          <el-table-column property="productLine" label="产品线" align="center">
            <template slot-scope="scope">{{scope.row.productLine | dicFilter(productLines)}}</template>
          </el-table-column>

          <el-table-column property="model" label="型号" align="center">
            <template slot-scope="scope">{{scope.row.model | dicFilter(models)}}</template>
          </el-table-column>

          <el-table-column property="faultDescribe" label="故障描述" align="center" width="200"></el-table-column>

          <el-table-column property="faultType" label="故障类型" align="center" width="200">
            <template slot-scope="scope">{{scope.row.faultType | dicFilter(faultTypes)}}</template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 获取所有字典值
import { getAllDict, Monitoringoperation } from "@/api/common";
// 查询派单表格数据/查询派工单信息/批量删除派工单/修改派工单信息（其中包括审核派单撤单结束）
import {
  queryApplyJobGroupList,
  queryApplyJob,
  delApplyJobInfo,
  updApplyJob
} from "@/api/clientServe";

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
      // 所有派工单状态
      statuss: [],
      // 所有科室
      departments: [],
      // 所有职务
      positions: [],
      // 所有产品线
      productLines: [],
      // 产品线对应的型号下拉
      models: [],
      // 所有故障类型
      faultTypes: [],
      // 所有优先级
      prioritys: [],
      // 表格数据
      sendOrdersList: [],
      // 选中表格数据
      multipleSelection: [],
      // 详情弹框数据
      dialogTableVisible: false,
      // 详情弹框表格数据
      detailsList: [],
      //   筛选数据
      pageQuery: {
        isApply: "1",
        status: "",
        assignId: "",
        customerName: "",
        contacts: "",
        phone: "",
        department: "",
        position: "",
        createDateBegin: "",
        createDateEnd: "",
        staffName:"",
        totalCount: 0,
        page: 1,
        rows: 10
      },
       // 默认展开
      activeNames: ["1"],
      // PDF列表
      pdfList: [],
      numPages: [],
      imgrul: "",
      item1: "",
      // PDF查看并下载地址
      imgURL: this.$store.state.settings.imgURL,
      pdfURL: this.$store.state.settings.pdfURL,
      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 查询派单表格数据
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "JOB_STATUS,POSITION,DEPARTMENT,PRODUCT_LINE,EQUI_MODEL,FAULT_TYPE,PRIORITY,CHANNEL_POSITION";
      getAllDict(data).then(res => {
        let datlist = [];
        for (let i = 0; i <= res.data.JOB_STATUS.length - 1; i++) {
          if (res.data.JOB_STATUS[i].value == 4) {
            datlist.push(res.data.JOB_STATUS[i]);
          } else if (res.data.JOB_STATUS[i].value == 5) {
            datlist.push(res.data.JOB_STATUS[i]);
          } else if (res.data.JOB_STATUS[i].value == 6) {
            datlist.push(res.data.JOB_STATUS[i]);
          } else if (res.data.JOB_STATUS[i].value == 7) {
            datlist.push(res.data.JOB_STATUS[i]);
          }
        }
        // 获取所有派工单状态
        this.statuss = datlist;
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.CHANNEL_POSITION;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取所有故障类型
        this.faultTypes = res.data.FAULT_TYPE;
        // 获取所有优先级
        this.prioritys = res.data.PRIORITY;
      });
    },
    // 查询派单表格数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryApplyJobGroupList(data).then(res => {
        this.sendOrdersList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询派单表格数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询派单表格数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryApplyJobGroupList(data).then(res => {

        this.sendOrdersList = res.data.list;
        console.log(this.sendOrdersList)
        this.pageQuery.totalCount = res.data.total;
        console.log
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        isApply: "1",
        status: "",
        assignId: "",
        customerName: "",
        contacts: "",
        phone: "",
        department: "",
        position: "",
        createDateBegin: "",
        createDateEnd: "",

        totalCount: 0,
        page: 1,
        rows: 10
      };
      // 查询派单表格数据
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.sendOrdersList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.sendOrdersList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.sendOrdersList.toggleRowSelection(row);
        });
      }
    },
    // 单独删除派工单
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = rowData.id;
          delApplyJobInfo(id).then(res => {
            this.$message.success(res.msg);
            // 查询客户工单表格数据
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除派工单
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
            delApplyJobInfo(idData).then(res => {
              this.$message.success(res.msg);
              // 查询派单表格数据
              this.fetchListData();
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },

 // 批量下载工单详情
    batchHandDownload() {
    
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择要下载的数据");
      } else {
        this.$confirm("此操作将下载该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let arr = [];
            this.multipleSelection.forEach(item => {
              arr.push(item.id);
            });
            // let idData = arr.toString();
            let groupId = this.$route.query.sendData;
          //   queryReportByGroupId(groupId).then(res => {
        let psdArr = res.data.split(";");
        this.item1 = psdArr[0];
        // this.pdfList = psdArr.filter(item => {
        //   return item && item.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        // });
        this.pdfimglist = res.data;
        var random = Math.ceil(Math.random() * 100000);
        let uurl = this.pdfimglist.slice(4, this.pdfimglist.indexOf("."));
        if (uurl != "") {
          this.imgrul =
            this.pdfURL+"/images/" +
            uurl +
            ".jpg" +
            "?" +
            random;
        } else {
          this.imgrul = "";
        }
        // for (let i = 0; i < this.pdfList.length; i++) {
        // this.preUrl = pdf.createLoadingTask(this.pdfList[0]);
        // this.preUrl.then(pdf => {
        this.numPages = 2;
        // });
        // }
      })
      }
    },

    // 详情弹框
    detailsShow(rows) {
      this.$router.push({
        name: "Processdetails",
        query: {
          groupId: rows.groupId,staffName:rows.staffName
        }
      });
      return;
      this.dialogTableVisible = true;
      let data = { groupId: rows.groupId };
      queryApplyJob(data).then(res => {
        this.detailsList = res.data;
      });
    },
    // 批量导出
    excelBtn() {
      let o = [
        ["工单编号", "客户名称", "科室", "指派员工","联系人", "电话", "创建时间", "状态"]
      ];
      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryApplyJobGroupList(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];

            arr.push(item.assignId);

            arr.push(item.customerName);

            arr.push(
              this.$options.filters.dicFilter(item.department, this.departments)
            );

            // arr.push(
            //   this.$options.filters.dicFilter(item.position, this.positions)
            // );
            arr.push(item.staffName);
            arr.push(item.contacts);

            arr.push(item.phone);
            arr.push(item.createDate);

            arr.push(
              this.$options.filters.dicFilter(item.status, this.statuss)
            );

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "派单列表");
          XLSX.writeFile(wb, "派单列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];

          arr.push(item.assignId);

          arr.push(item.customerName);

          arr.push(
            this.$options.filters.dicFilter(item.department, this.departments)
          );

          // arr.push(
          //   this.$options.filters.dicFilter(item.position, this.positions)
          // );
          arr.push(item.staffName);
          arr.push(item.contacts);
          
          arr.push(item.phone);
          arr.push(item.createDate);
          arr.push(this.$options.filters.dicFilter(item.status, this.statuss));

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "派单列表");
        XLSX.writeFile(wb, "派单列表.xlsx");
      }
    },
    // 跳转到查看评价页面
    toExamineAppraise(data) {
      let groupId = data.groupId;
      this.$router.push({
        name: "ExamineAppraise",
        query: {
          sendData: groupId
        }
      });
    },
    // 跳转到工单详情页面
    toWorkOrder(rows) {

      
      let groupId = rows.assignId;
      this.$router.push({
        name: "WorkOrderDetails",
        query: {
          sendData: groupId
        }
      });
    },
    // 撤单
    removeOrder(rows) {
      let data = {
        staffId: rows.staffId,
        staffName: rows.staffName,
        id: rows.id,
        status: "1"
      };
      updApplyJob(data).then(res => {
        this.$message.success('撤单成功');
        // 查询派单表格数据
        this.fetchListData();
      });
    },
    // 结束
    finishBtn(rows) {
      let data = {
        id: rows.id,
        status: "7"
      };
      updApplyJob(data).then(res => {
        this.$message.success('结束工单成功');
        // 查询派单表格数据
        this.fetchListData();
      });
    },

    Monitoringoperationis(rows, issta) {
      let pagt = {
        groupId: rows.groupId, //添加派工单历史记录   必填
        name: this.$store.state.user.name, //操作人姓名   姓名
        type: this.$store.state.user.roles[0], //操作人类型   员工   还是管理员
        operation: "", //具体操作  审核  ，  撤销 ，  通过    派单
        operationRemarks: "", //操作备注
        examine: "", //审核是否通过
        examineRemarks: "" //审核备注  examineRemarks
      };

      if (issta == "撤单") {
        pagt.operation = "撤单";
      } else if (issta == "结束工单") {
        pagt.operation = "结束工单";
      }

      Monitoringoperation(pagt).then(res => {
        if (issta == "撤单") {
          this.removeOrder(rows);
        } else if (issta == "结束工单") {
          this.finishBtn(rows);
        }
        // 查询派单表格数据
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>