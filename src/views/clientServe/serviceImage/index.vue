<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 数据表格部分 -->
    <div class="tableRow">
      <!-- 表格标题部分 -->
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>售后服务图片列表</span>
        </span>

        <span>
          <el-button
            type="success"
            icon="el-icon-plus"
            size="small"
            @click="toAddPage()"
            :disabled="disabledAdd"
          >添加售后服务图片</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="serviceImageList"
          ref="serviceImageList"
          fit
          highlight-current-row
        >
          <el-table-column property="deviceId" label="图片" align="center">
            <template slot-scope="scope">
              <img :src="imgURL + scope.row.picUrl.split(',')[0]" style="width:400px">
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
    </div>
  </div>
</template>

<script>
// 查询售后服务图片列表/删除售后服务图片列表
import { queryAfterService, delAfterServiceInfo } from "@/api/clientServe";

export default {
  data() {
    return {
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 表格数据
      serviceImageList: [],
      // 添加按钮禁用
      disabledAdd: false,
      //   筛选数据
      pageQuery: {
        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true
    };
  },
  mounted() {
    // 查询售后服务图片列表
    this.fetchListData();
  },
  methods: {
    // 查询售后服务图片列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryAfterService(data).then(res => {
        // 判断添加是否禁用
        if (res.data.length != 0) {
          this.disabledAdd = true;
        } else {
          this.disabledAdd = false;
        }
        this.serviceImageList = res.data;
        this.listLoading = false;
      });
    },
    // 删除售后服务图片列表
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          delAfterServiceInfo(data).then(res => {
            this.$message.success(res.msg);
            // 查询售后服务图片列表
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 跳转到新增页
    toAddPage() {
      this.$router.push({
        name: "AddserviceImage"
      });
    },
    // 跳转到修改页
    toEditPage(rows) {
      let id = rows.id;
      this.$router.push({
        name: "EditserviceImage",
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

