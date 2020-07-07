<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 数据表格部分 -->
    <div class="tableRow">
      <!-- 表格标题部分 -->
      <div class="tableTitle">
        <span>
          <i class="el-icon-news"></i>
          <span>配件分类列表</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toAddOneType()">添加类型</el-button>
          <el-button @click="returnBtn()" size="small">返回</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="partsTypeList"
          row-key="id"
          fit
          highlight-current-row
        >
          <el-table-column property="lable" label="配件分类"></el-table-column>

          <el-table-column header-align="center" align="right" label="分类管理" width="300">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 'PARTS_TYPE_ONE'">
                <el-button @click="toAddTwoType(scope.row)" size="mini" type="success">添加产品</el-button>

                <el-button @click="toEditOneType(scope.row)" size="mini" type="primary">修改类型</el-button>
              </span>

              <span v-if="scope.row.type == 'PARTS_TYPE_TWO'">
                <el-button @click="toAddPartsModel(scope.row)" size="mini" type="success">添加配件型号</el-button>

                <el-button @click="toEditTwoType(scope.row)" size="mini" type="primary">修改产品</el-button>
              </span>

              <span v-if="scope.row.type == 'PARTS_TYPE_THREE'">
                <el-button @click="toEditPartsModel(scope.row)" size="mini" type="primary">修改配件型号</el-button>
              </span>

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
// 获取树结构数据/删除字典
import { getTreeList, deleteDicCode } from "@/api/common";

export default {
  data() {
    return {
      // 表格数据
      partsTypeList: [],

      listLoading: true
    };
  },
  mounted() {
    // 查询配件树结构表格数据
    this.fetchListData();
  },
  methods: {
    // 查询配件树结构表格数据
    fetchListData() {
      this.listLoading = true;
      let data = "PARTS_TYPE_ONE,PARTS_TYPE_TWO,PARTS_TYPE_THREE";
      getTreeList(data).then(res => {
        this.partsTypeList = res.data;
        this.listLoading = false;
      });
    },

    //删除产品线
    handleDelete(rows) {
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

    // 跳转到添加一级类型
    toAddOneType() {
      this.$router.push({
        name: "AddType"
      });
    },
    // 跳转到修改一级类型
    toEditOneType(rows) {
      let id = rows.id;
      this.$router.push({
        name: "EditType",
        query: {
          sendData: id
        }
      });
    },

    // 跳转到添加二级类型
    toAddTwoType(rows) {
      let parentId = rows.id;
      this.$router.push({
        name: "AddChildType",
        query: {
          parentId: parentId
        }
      });
    },
    // 跳转到修改二级类型
    toEditTwoType(rows) {
      let id = rows.id;
      this.$router.push({
        name: "EditChildType",
        query: {
          id: id
        }
      });
    },

    // 跳转到添加型号页
    toAddPartsModel(rows) {
      let parentId = rows.id;
      this.$router.push({
        name: "AddPartsModel",
        query: {
          parentId: parentId
        }
      });
    },
    // 跳转到修改型号页
    toEditPartsModel(rows) {
      let id = rows.id;
      this.$router.push({
        name: "EditPartsModel",
        query: {
          id: id
        }
      });
    },
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "PartsManage"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

