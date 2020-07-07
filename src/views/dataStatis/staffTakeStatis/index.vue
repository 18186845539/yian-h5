<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="员工接单-图形统计" name="1">
          <div class="searchRow">
            <span>
              <span>省份：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.province"
                  @change="provinceChange"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>员工：</span>
              <!-- <el-select v-model="pageQuery.staffName" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in staffNames"
                    :key="item.id"
                    :label="item.staffName"
                    :value="item.staffName"
                  ></el-option>
              </el-select>-->
              <span class="searchItem">
                <el-input v-model="pageQuery.staffName" size="small" width="150px" clearable></el-input>
              </span>
            </span>
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
                  placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  size="small"
                  clearable
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
              <el-button @click="toListStatis()" type="primary" size="small">员工接单-列表统计</el-button>
            </span>
          </div>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="searchRowmain">
            <div v-loading="listLoading" element-loading-text="数据查询中请稍后。。。" id="myChart"></div>
            <!-- 接单数量 -->
            <div class="AcceptanceOrders">{{Total.receipt}}</div>
            <div class="AcceptanceOrders AcceptanceOrders1">{{Total.refusal}}</div>
            <div class="AcceptanceOrders AcceptanceOrders2">{{Total.timeOut}}</div>
            <div class="AcceptanceOrders AcceptanceOrders3">{{Total.acceptAndRefusal}}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 获取所有字典值
import { getAllDict } from "@/api/common";
// 获取所有员工
import { queryStaffList } from "@/api/userClassify";
// 查询员工接单-图形统计数据
import { queryOrderPic } from "@/api/dataStatis";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 所有省份
      provinces: [],
      // 所有员工
      staffNames: [],
      // 筛选数据
      pageQuery: {
        province: "",
        staffName: "",
        startTime: "",
        endTime: ""
      },
      // 总数
      Total: {
        //接单数量
        receipt: 0,
        //拒单数量
        refusal: 0,
        //接单超时数量
        timeOut: 0,
        //接单后拒单数量
        acceptAndRefusal: 0
      },
      //加载时隐藏 ，加载成功显示
      listLoading: true
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 获取所有员工
    // this.fetchStaffListData();
    // 查询员工接单-图形统计数据
    this.fetchListData();
    // ECharts图
    this.drawLine();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PROVINCE";
      getAllDict(data).then(res => {
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
      });
    },
    // 获取所有省份对应的员工
    provinceChange(val) {
      let obj = {};
      obj = this.provinces.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = { province: obj.id };
        queryStaffList(data).then(res => {
          this.staffNames = res.data.list;
        });
      } else {
        this.fetchStaffListData();
      }
    },
    // 获取所有员工
    fetchStaffListData() {
      let data = { province: this.pageQuery.province };
      queryStaffList(data).then(res => {
        this.staffNames = res.data.list;
      });
    },
    // ECharts图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "员工接单情况",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["接单数量", "拒单数量", "接单超时数量", "接单后拒单数量"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            // data: [
            //   { value: 20, name: "接单数量" },
            //   { value: 302, name: "拒单数量" },
            //   { value: 102, name: "接单超时数量" },
            //   { value: 2301, name: "接单后拒单数量" }
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
    // 查询员工接单-图形统计数据
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryOrderPic(data).then(res => {
        this.listLoading = false;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        let Total =
          Number(res.data.receipt) +
          Number(res.data.refusal) +
          Number(res.data.timeOut) +
          Number(res.data.acceptAndRefusal);

        let receipt =
          ((res.data.receipt / Total) * 100).toFixed(2) == "NaN"
            ? 0
            : ((res.data.receipt / Total) * 100).toFixed(2);
        let refusal =
          ((res.data.refusal / Total) * 100).toFixed(2) == "NaN"
            ? 0
            : ((res.data.refusal / Total) * 100).toFixed(2);
        let timeOut =
          ((res.data.timeOut / Total) * 100).toFixed(2) == "NaN"
            ? 0
            : ((res.data.timeOut / Total) * 100).toFixed(2);
        let acceptAndRefusal =
          ((res.data.acceptAndRefusal / Total) * 100).toFixed(2) == "NaN"
            ? 0
            : ((res.data.acceptAndRefusal / Total) * 100).toFixed(2);

        // 填入数据
        myChart.setOption({
          series: [
            {
              color: ["#008110", "#53a8ff", "#8e29df", "#ff001d"],
              data: [
                {
                  value: res.data.receipt,
                  name: "接单数量",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " + receipt + "% ",
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
                          backgroundColor: "#008110",
                          width: "100%",
                          align: "right",
                          height: 15,
                          borderRadius: [4, 4, 4, 4]
                        }
                      }
                    }
                  }
                },
                {
                  value: res.data.refusal,
                  name: "拒单数量",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " + refusal + "% "
                      ].join("\n"),
                      backgroundColor: "#eee",
                      borderColor: "#777",
                      rich: {
                        title: {
                          color: "#eee",
                          align: "center"
                        },
                        abg: {
                          backgroundColor: "#53a8ff",
                          width: "100%",
                          align: "right",
                          height: 25,
                          borderRadius: [4, 4, 4, 4]
                        }
                      }
                    }
                  }
                },
                {
                  value: res.data.timeOut,
                  name: "接单超时数量",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " + timeOut + "% ",
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
                          backgroundColor: "#8e29df",
                          width: "100%",
                          align: "right",
                          height: 25,
                          borderRadius: [4, 4, 4, 4]
                        }
                      }
                    }
                  }
                },
                {
                  value: res.data.acceptAndRefusal,
                  name: "接单后拒单数量",
                  label: {
                    normal: {
                      formatter: [
                        "{title|{b}}{abg|}",
                        " ",
                        "  " + acceptAndRefusal + "% ",
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
                          backgroundColor: "#ff001d",
                          width: "100%",
                          align: "right",
                          height: 25,
                          borderRadius: [4, 4, 4, 4]
                        }
                      }
                    }
                  }
                }
              ]
            }
          ]
        });
        this.Total = {
          receipt: res.data.receipt,
          refusal: res.data.refusal,
          timeOut: res.data.timeOut,
          acceptAndRefusal: res.data.acceptAndRefusal
        };
      });
    },
    // 筛选数据
    commonSearch() {
      // 查询员工接单-图形统计数据
      this.fetchListData();
    },
    // 跳转到列表统计页
    toListStatis() {
      this.$router.push({
        name: "StaffTakeListStatis"
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
  width: auto;
  height: auto;
  margin: 20px 30px;
}

.AcceptanceOrders {
  position: absolute;
  top: 5px;
  left: 100px;
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  color: #c93236;
}

.AcceptanceOrders1 {
  top: 28px;
  left: 100px;
  color: #2f4b5b;
}

.AcceptanceOrders2 {
  top: 52px;
  left: 120px;
  color: #57a0a7;
}
.AcceptanceOrders3 {
  top: 76px;
  left: 132px;
  color: #da8168;
}
</style>


