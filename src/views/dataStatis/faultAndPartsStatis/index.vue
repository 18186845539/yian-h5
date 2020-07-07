<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>工单号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.assignId" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>序列号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.deviceId" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>上门次数：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.doorCount" size="small" clearable></el-input>
              </span>
            </span>
            <span>
              <span>物料编码：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.note" size="small" clearable></el-input>
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
        <span style="width: 100%;">
          <i class="el-icon-news"></i>
          <span>故障与配件-列表统计</span>
          <span
            style="    float: right;
    margin-right: 25%;
    width: 100px;"
            v-show="!listLoading"
          >合计：{{numlos}}</span>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="数据查询中请稍后。。。"
          :data="faultAndPartsStatisList"
          ref="faultAndPartsStatisList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
          v-show="!boollost"
        >
          <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="assignId" label="工单号" align="center"></el-table-column>

          <el-table-column property="deviceId" label="序列号" align="center"></el-table-column>

          <el-table-column property="doorCount" label="上门次数" align="center"></el-table-column>

          <el-table-column property="note" label="物料编码" align="center">
            <template slot-scope="scope">
              <div>
                <div
                  v-for="(name,index) in scope.row.note"
                  :key="index"
                >{{'物料：'+name.note + ' 数量：'+name.num}}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>
        </el-table>
        <el-table
          v-loading="listLoading"
          element-loading-text="数据查询中请稍后。。。"
          :data="faultAndPartsStatisList"
          ref="faultAndPartsStatisList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
          v-show="boollost"
        >
          <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="note" label="物料编码" align="center">
            <template slot-scope="scope">
              <div>
                <div
                  v-for="(name,index) in scope.row.note"
                  :key="index"
                >{{'物料：'+name.note + ' 数量：'+name.num}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="assignId" label="工单号" align="center"></el-table-column>
          <el-table-column property="doorCount" label="上门次数" align="center"></el-table-column>

          <el-table-column property="deviceId" label="序列号" align="center"></el-table-column>

          <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(faultAndPartsStatisList)" type="primary" size="mini">反选</el-button>
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
            :total="pageQuery.count"
          ></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="tankuang" width="50%" top="5vh" :modal-append-to-body="false">
      <el-row>
        <el-col :span="6">
          <p class="rieht">物料编码</p>
        </el-col>
        <el-col :span="18">
          <ul class="listulli">
            <li v-for="(forli,index) in wuliaobianma" :key="index">{{forli}}</li>
          </ul>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// 查询故障与配件-列表统计数据
import { queryEmployeeOrderPic } from "@/api/dataStatis";

import XLSX from "xlsx";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 表格数据
      faultAndPartsStatisList: [],
      // 选中表格数据
      multipleSelection: [],
      multipleSelection1: [],
      wuliaobianma: [],
      boollost: false,
      numlos: 0, //总数
      //   筛选数据
      pageQuery: {
        assignId: "",
        deviceId: "",
        doorCount: "", //上门次数
        note: "", //物料编码
        startTime: "", //开始时间
        endTime: "",
        page: 1,
        rows: 10,
        count: 0
      },
      tankuang: false,
      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 查询故障与配件-列表统计数据
    this.fetchListData();
  },
  methods: {
    // 查询故障与配件-列表统计数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryEmployeeOrderPic(data).then(res => {
        this.faultAndPartsStatisList = res.data.list;
        this.pageQuery.count = res.data.total;
        this.listLoading = false;
      });
      //进来的时候   统计总和
      this.numlos = 0;
      queryEmployeeOrderPic({
        rows: 100000
      }).then(res => {
        let datasll = res.data.list;
        for (let i = 0; i < datasll.length; i++) {
          for (let k = 0; k < datasll[i].note.length; k++) {
            this.numlos += Number(datasll[i].note[k].num);
          }
        }
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询故障与配件-列表统计数据
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      let data = this.pageQuery;

      this.pageQuery.page = 1;

      if (this.pageQuery.startTime == null) {
        this.pageQuery.startTime = "";
      }
      if (this.pageQuery.endTime == null) {
        this.pageQuery.endTime = "";
      }
      this.listLoading = true;

      queryEmployeeOrderPic(data).then(res => {
        this.boollost = true;
        this.faultAndPartsStatisList = res.data.list;
        this.pageQuery.count = res.data.total;
        this.listLoading = false;
      });

      //统计搜索时的总和
      this.numlos = 0;
      let data1 = {
        assignId: this.pageQuery.assignId,
        deviceId: this.pageQuery.deviceId,
        doorCount: this.pageQuery.doorCount, //上门次数
        note: this.pageQuery.note, //物料编码
        startTime: this.pageQuery.startTime, //开始时间
        endTime: this.pageQuery.endTime,
        page: 1,
        rows: 100000
      };
      queryEmployeeOrderPic(data1).then(res => {
        let datasll = res.data.list;
        for (let i = 0; i < datasll.length; i++) {
          for (let k = 0; k < datasll[i].note.length; k++) {
            this.numlos += Number(datasll[i].note[k].num);
          }
        }
      });
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.faultAndPartsStatisList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.faultAndPartsStatisList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.faultAndPartsStatisList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      this.pageQuery.rows = 100000;
      queryEmployeeOrderPic(this.pageQuery).then(res => {
        this.pageQuery.rows = 10;
        let multipleSelection1 = res.data.list;
        if (multipleSelection1.length == 0) {
          this.$message.warning("没有要导出的数据");
        } else {
          let o = [
            [
              "工单号",
              "序列号",
              "上门次数",
              "物料编码",
              "数量",
              "创建时间",
              "合计"
            ]
          ];
          let numnbenr = 0;
          multipleSelection1.map(item => {
            let arr = [];

            arr.push(item.assignId);
            arr.push(item.deviceId);

            arr.push(item.doorCount);
            let str = "";
            let num = "";
            for (let i = 0; i < item.note.length; i++) {
              if (i == item.note.length - 1) {
                str += item.note[i].note;
                num += item.note[i].num;
              } else {
                str += item.note[i].note + ",";
                num += item.note[i].num + ",";
              }
            }
            arr.push(str);
            arr.push(num);
            arr.push(item.createDate);
            if (numnbenr == 0) {
              arr.push(this.numlos);
              numnbenr = 11;
            }

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "故障与配件-列表统计");
          XLSX.writeFile(wb, "故障与配件-列表统计.xlsx");
        }
      });
    },

    //物料号
    showdeviceId(res) {
      if (res.materielCode) {
        this.tankuang = true;
        this.wuliaobianma = res.materielCode.split(",");
      } else {
        this.$message.warning("没有物料编码");
      }
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>


<style scoped>
.listulli {
  list-style: none;
}
.rieht {
  text-align: right;
}
</style>


