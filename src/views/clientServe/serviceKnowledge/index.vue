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
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>型号：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>类型：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <el-button type="primary" icon="el-icon-search" size="small">筛选</el-button>
              <el-button @click="getall()" type="primary" size="small">清空筛选</el-button>
              <el-button @click="getall2()" type="primary" size="small">批量导出</el-button>
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
          <span>维修知识宝库列表</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toModifyPage()">添加技能指引</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          :data="productMessageList"
          element-loading-text="Loading"
          fit
          highlight-current-row
          :height="tableHeight"
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="date" label="产品线" align="center"></el-table-column>

          <el-table-column property="date" label="型号" align="center"></el-table-column>

          <el-table-column property="date" label="类型" align="center"></el-table-column>

          <el-table-column property="date" label="图片" align="center"></el-table-column>

          <el-table-column property="date" label="标题" align="center"></el-table-column>

          <el-table-column property="date" label="内容" align="center"></el-table-column>

          <el-table-column align="center" label="管理" width="150">
            <template slot-scope="scope">
              <el-button
                @click="editbtn(scope.$index, scope.row)"
                size="mini"
                type="primary"
                icon="el-icon-edit-outline"
              ></el-button>
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
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
          <el-button type="primary" size="mini">全选</el-button>
          <el-button type="primary" size="mini">反选</el-button>
          <el-button type="primary" size="mini">全不选</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
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

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      //   筛选数据
      pageQuery: {
        name: "",
        phone: "",
        province: "",
        city: "",
        mailbox: "",
        totalCount: 30,
        currentPage: 1,
        pageSize: 30
      },
      // 表格数据
      productMessageList: [{}],

      listLoading: true,
      tableHeight: 200,
      pageSizes: []
    };
  },
  mounted() {
    const self = this;
    if (self.$refs.pageContainer && self.$refs.pageSearch) {
      this.$nextTick(() => {
        //pageContainer
        self.tableHeight =
          self.$refs.pageContainer.offsetHeight -
          self.$refs.pageSearch.offsetHeight -
          self.$refs.paginationContainer.offsetHeight -
          30;
        window.onresize = function() {
          self.tableHeight =
            self.$refs.pageContainer.offsetHeight -
            self.$refs.pageSearch.offsetHeight -
            self.$refs.paginationContainer.offsetHeight -
            30;
        };
      });
    }
    self.pageSizes = self.$store.state.settings.pageSizes;
    this.fetchData();
  },
  methods: {
    // 获取表格数据的方法
    fetchData() {
      this.listLoading = false;
      // getList().then(response => {
      //   this.productMessageList = response.data.items;
      //   this.listLoading = false;
      // });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.currentPage = 1;
      this.pageQuery.pageSize = val;
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.currentPage = val;
    },
    // 跳转到添加维修知识页
    toModifyPage() {
      this.$router.push({
        name: "AddKnowledge"
      });
    },
    // 跳转到修改技能指导页
    editbtn() {
      this.$router.push({
        name: "EditKnowledge"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

