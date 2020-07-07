<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="指导回复" name="1">
          <div
            style="margin: 20px 100px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);"
          >
            <div style="height:280px;padding-top:10px;overflow: auto;">
              <ul>
                <li v-for="item in chatList" :key="item.id">
                  <div v-if="item.userType == 1">
                    <span style="font-weight: ;color:#29AFFB">{{item.userName}}：</span>
                    <span style="color:#29AFFB">{{item.content}}</span>
                  </div>

                  <div v-if="item.userType == 0">
                    <span style="font-weight: 700">{{item.userName}}：</span>
                    <span>{{item.content}}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 分页 -->
            <div class="tableBottom">
              <div ref="paginationContainer" class="paginationContainer">
                <el-pagination
                  small
                  background
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="test"
                  :page-sizes="pageSizes"
                  :page-size="pageQuery.rows"
                  layout="prev, pager, next, total, sizes, jumper"
                  :total="pageQuery.totalCount"
                ></el-pagination>
              </div>
            </div>
          </div>

          <div class="searchRow">
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="250px"
              size="small"
              class="demo-ruleForm"
              @submit.native.prevent
              style="width:800px;text-align: center;"
            >
              <el-form-item label="回复内容：" prop="content">
                <!-- <el-input
                  v-model="form.content"
                  @keyup.enter.native="submitForm()"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                ></el-input>-->
                <el-input
                  v-model="form.content"
                  @keyup.enter.native="submitForm('form')"
                  placeholder="请输入内容"
                  maxlength="200"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">发送</el-button>
                <!-- <el-button @click="resetForm()">重置</el-button> -->
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
// 获取回复数据/消息发送/消息发送成功提醒
import { replyById, replyContent, sendRemind } from "@/api/clientServe";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 聊天数据
      chatList: [],
      // 测试当前页
      test: 100,
      // 分页数据
      pageQuery: {
        totalCount: 0,
        page: 1,
        rows: 10
      },
      pageSizes: [10, 20, 30],

      form: {
        userId: "",
        userName: "",
        userType: "0",
        groupId: "",
        content: ""
      },
      // 表单验证
      rules: {
        // 回复内容验证
        content: [
          { required: true, message: "请输入回复内容", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // 获取回复数据
    this.getPage();
    // socket实时通讯
    this.initWebSocket();
  },
  methods: {
    // 获取最后一页
    getPage() {
      let sendData = this.$route.query.sendData;
      let data = {
        id: sendData,
        page: this.pageQuery.page,
        rows: this.pageQuery.rows
      };
      replyById(data).then(res => {
        this.pageQuery.page = Number(res.data.lastPage);
        // 获取回复数据
        this.getReplyData();
      });
    },

    // 获取回复数据
    getReplyData() {
      let sendData = this.$route.query.sendData;
      let data = {
        id: sendData,
        page: this.pageQuery.page,
        rows: this.pageQuery.rows
      };
      replyById(data).then(res => {
        if (res.data.lastPage != this.pageQuery.page) {
          this.pageQuery.page = Number(res.data.lastPage);
          this.test = Number(res.data.lastPage);
          // 获取回复数据
          this.getReplyData();
        }
        this.chatList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 获取回复数据
      this.getReplyData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 获取回复数据
      // this.getReplyData();

      let sendData = this.$route.query.sendData;
      let data = {
        id: sendData,
        page: this.pageQuery.page,
        rows: this.pageQuery.rows
      };
      replyById(data).then(res => {
        this.chatList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
      });
    },
    // 消息发送
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.form.groupId = this.$route.query.sendData;
          this.form.userId = this.$store.state.settings.userinfo.adminId;
          this.form.userName = this.$store.state.settings.userinfo.adminName;
          let data = this.form;
          replyContent(data).then(res => {
            this.$message.success(res.data);
            // 消息发送成功提醒
            let data = this.$route.query.userid;
            sendRemind(data).then(res => {
              this.form.content = "";
              // 获取回复数据
              this.getReplyData();
            });
          });
        } else {
          return false;
        }
      });
    },

    // socket实时通讯
    initWebSocket() {
      let _this = this;
      var socket;
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
        socket = new WebSocket(
          (
            _this.$store.state.settings.socketURL +
            "/websocket/" +
            _this.$store.state.settings.userinfo.adminId
          ).replace("http", "ws")
        );

        //打开事件
        socket.onopen = function() {
          console.log("Socket 已打开");
          //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        socket.onmessage = function(msg) {
          console.log(msg.data);
          if (msg.data) {
            // 获取回复数据
            _this.getReplyData();
          }
          //发现消息进入    开始处理前端触发逻辑
        };
        //关闭事件
        socket.onclose = function() {
          console.log("Socket已关闭");
        };
        //发生了错误事件
        socket.onerror = function() {
          alert("网络异常");
          //此时可以尝试刷新页面
        };
        //离开页面时，关闭socket
        //jquery1.8中已经被废弃，3.0中已经移除
        // $(window).unload(function(){
        //     socket.close();
        //});
      }
    },

    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "ServiceGuidance"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

