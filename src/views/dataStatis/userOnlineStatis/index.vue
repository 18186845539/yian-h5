<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="用户上线-图形统计" name="1">
          <div class="searchRow">
            <span>
              <span>开始时间：</span>
              <span>
                <el-date-picker
                  v-model="pageQuery.startTime"
                  type="date"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd"
                  size="small"
                  clearable
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
                  clearable
                ></el-date-picker>
              </span>
            </span>
            <span>
              <el-button @click="seach()" type="primary" size="small">搜索</el-button>
              <el-button @click="toListStatis()" type="primary" size="small">用户上线-列表统计</el-button>
            </span>

          </div>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="searchRowmain">
            <div v-loading="listLoading" element-loading-text="数据查询中请稍后。。。" id="myChart"></div>
            <div class="AcceptanceOrders">{{Total.YY}}</div>
            <div class="AcceptanceOrders AcceptanceOrders1">{{Total.QD}}</div>
            <div class="AcceptanceOrders AcceptanceOrders2">{{Total.YG}}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 查询用户上线-图形统计数据
import { queryOnlinePic } from "@/api/dataStatis";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],

      //总数
      Total: {
        YG: 0,
        YY: 0,
        QD: 0
      },
      pageQuery: {
        startTime: "",
        endTime: ""
      },

      listLoading: true
    };
  },
  mounted() {
    // 查询用户上线-图形统计数据
    this.fetchListData();
    // ECharts图
    this.drawLine();
  },
  methods: {
    // ECharts图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "用户上线统计",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["医院", "渠道", "员工"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            // data: [
            //   { value: 0, name: "医院" },
            //   { value: 0, name: "渠道" },
            //   { value: 0, name: "员工" }
            // ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    // 查询用户上线-图形统计数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryOnlinePic(data).then(res => {
        this.listLoading = false;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        let YG = res.data.filter(item => item.userType == 1);
        let YY = res.data.filter(item => item.userType == 2);
        let QD = res.data.filter(item => item.userType == 3);

        let Total = YG[0].onlineCount + YY[0].onlineCount + QD[0].onlineCount;
        // 填入数据
        myChart.setOption({
          series: [
            {
              data: [
                {
                  value: YG[0].onlineCount,
                  name: "员工",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " +
                          ((YG[0].onlineCount / Total) * 100).toFixed(2) +
                          "% ",
                        " "
                      ].join("\n"),
                      backgroundColor: "#eee",
                      borderColor: "#777",
                      rich: {
                        title: {
                          color: "#eee",
                          align: "center"
                        },
                        abg: {
                          backgroundColor: "#c93236",
                          width: "100%",
                          align: "right",
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        }
                      }
                    }
                  }
                },
                {
                  value: YY[0].onlineCount,
                  name: "医院",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " +
                          ((YY[0].onlineCount / Total) * 100).toFixed(2) +
                          "% ",
                        " "
                      ].join("\n"),
                      backgroundColor: "#eee",
                      borderColor: "#777",
                      rich: {
                        title: {
                          color: "#eee",
                          align: "center"
                        },
                        abg: {
                          backgroundColor: "#2b4453",
                          width: "100%",
                          align: "right",
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        }
                      }
                    }
                  }
                },
                {
                  value: QD[0].onlineCount,
                  name: "渠道",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " +
                          ((QD[0].onlineCount / Total) * 100).toFixed(2) +
                          "% ",
                        " "
                      ].join("\n"),
                      backgroundColor: "#eee",
                      borderColor: "#777",
                      rich: {
                        title: {
                          color: "#eee",
                          align: "center"
                        },
                        abg: {
                          backgroundColor: "#5fb0b7",
                          width: "100%",
                          align: "right",
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        }
                      }
                    }
                  }
                }
              ]
            }
          ]
        });
        console.log(res.data);
        this.Total = {
          YG: YG[0].onlineCount,
          YY: YY[0].onlineCount,
          QD: QD[0].onlineCount
        };
      });
    },
    seach(){
      this.fetchListData();
    },
    // 跳转到列表统计页
    toListStatis() {
      this.$router.push({
        name: "UserOnlineListStatis"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style scoped>
#myChart {
  height: 400px;
}
.searchRowmain {
  position: relative;
  height: auto;
  width: auto;
  margin: 20px 30px;
}

.AcceptanceOrders {
  position: absolute;
  top: 4px;
  left: 70px;
  font-size: 12px;
  text-align: center;
  height: 12px;
  line-height: 12px;
  color: #2b4453;
}

.AcceptanceOrders1 {
  top: 29px;
  color: #5fb0b7;
}

.AcceptanceOrders2 {
  top: 54px;
  color: #c93236;
}
</style>


