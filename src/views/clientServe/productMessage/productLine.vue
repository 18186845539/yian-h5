<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 数据表格部分 -->
    <div class="tableRow">
      <!-- 表格标题部分 -->
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>产品线列表</span>
        </span>
        <span>
          <el-button
            type="success"
            icon="el-icon-plus"
            size="small"
            @click="toAddProductLine()"
          >添加产品线</el-button>
          <el-button @click="returnBtn()" size="small">返回</el-button>
          <!-- <el-button type="success" icon="el-icon-plus" size="small" @click="toProduct()">添加产品</el-button> -->
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="productLineList"
          row-key="id"
          fit
          highlight-current-row
        >
          <el-table-column property="lable" label="产品线分类"></el-table-column>

          <el-table-column header-align="center" align="right" label="产品管理" width="280">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 'PRODUCT_LINE'">
                <el-button @click="toAddModel(scope.row)" size="mini" type="success">添加型号</el-button>
                <el-button @click="toEditProductLine(scope.row)" size="mini" type="primary">修改产品线</el-button>
              </span>

              <span v-if="scope.row.type == 'EQUI_MODEL'">
                <el-button @click="toEdintModel(scope.row)" size="mini" type="primary">修改型号</el-button>
              </span>
              <el-button
                @click="toDelProductLine(scope.row)"
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
// 获取树结构数据/删除字典
import { getTreeList, deleteDicCode } from "@/api/common";

export default {
  data() {
    return {
      // 表格数据
      productLineList: [],

      listLoading: true
    };
  },
  mounted() {
    // 查询产品线和产品树结构表格数据
    this.fetchListData();
  },
  methods: {
    // 查询产品线和产品树结构表格数据
    fetchListData() {
      this.listLoading = true;
      let data = "PRODUCT_LINE,EQUI_MODEL";
      getTreeList(data).then(res => {
        this.productLineList = res.data;
        this.listLoading = false;
      });
    },

    //删除产品线
    toDelProductLine(rows) {
      console.log(rows);
      if (rows.children.length != 0) {
        this.$message.warning("请删除下级元素");
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = { id: rows.id };
          deleteDicCode(data).then(res => {
            this.$message.success(res.msg);
            // 查询产品线和产品树结构表格数据
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    // 跳转到添加产品线页
    toAddProductLine() {
      this.$router.push({
        name: "AddProductLine"
      });
    },
    // 跳转到编辑产品线页
    toEditProductLine(data) {
      let id = data.id;
      this.$router.push({
        name: "EditProductLine",
        query: {
          sendData: id
        }
      });
    },

    // 跳转到添加型号页
    toAddModel(data) {
      let parentId = data.id;
      this.$router.push({
        name: "AddModel",
        query: {
          parentId: parentId
        }
      });
    },
    // 跳转到修改型号页
    toEdintModel(data) {
      let id = data.id;
      this.$router.push({
        name: "EditModel",
        query: {
          id: id
        }
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ProductMessage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

