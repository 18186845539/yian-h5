<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="修改维修知识" name="1">
          <div class="searchRow">
            <el-form
              :model="editForm"
              :rules="rules"
              ref="editForm"
              label-width="250px"
              size="small"
              class="demo-ruleForm"
            >
              <el-form-item label="产品线：" prop="province">
                <el-select v-model="editForm.province" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="型号：" prop="province">
                <el-select v-model="editForm.province" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="类型：" prop="province">
                <el-select v-model="editForm.province" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="展示区分：" prop="province">
                <el-select v-model="editForm.province" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="标题：" prop="name">
                <el-input v-model="editForm.userName"></el-input>
              </el-form-item>

              <el-form-item label="内容：" prop="name">
                <el-input type="textarea" v-model="editForm.desc"></el-input>
              </el-form-item>

              <el-form-item label="缩略图一：" prop="phone">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </el-form-item>

              <el-form-item label="上传文本/文件：" prop="phone">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>

              <el-form-item label="描述：" prop="phone">
                <el-input type="textarea" v-model="editForm.desc"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">添加</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
                <el-button @click="returnBtn()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/table";

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
      editForm: {
        userName: "",
        password: "",
        province: "",
        city: "",
        staffName: "",
        phone: "",
        mailbox: "",
        rank: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  mounted() {},
  methods: {
    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ServiceKnowledge"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

