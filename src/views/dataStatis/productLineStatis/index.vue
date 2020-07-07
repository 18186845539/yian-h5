<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="产品线-图形统计" name="1">
          <div class="searchRow">
            <!-- <span>
              <span>年份：</span>
              <span class="searchItem">
                <el-date-picker
                  v-model="year"
                  size="small"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年"
                ></el-date-picker>
              </span>
            </span>-->

            <span>
              <span>产品线：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.productLine"
                  @change="productLineChange"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in productLines"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
              <el-button @click="toListStatis()" type="primary" size="small">产品线-列表统计</el-button>
            </span>
          </div>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="searchRowmain">
            <div v-loading="listLoading" element-loading-text="数据查询中请稍后。。。" id="myChart" style></div>

            <!-- <div class="btnmain">
              <div class="AcceptanceOrders">{{Total.AZ}}</div>
              <div class="AcceptanceOrders AcceptanceOrders1">{{Total.WX}}</div>
              <div class="AcceptanceOrders AcceptanceOrders2">{{Total.HF}}</div>
              <div class="AcceptanceOrders AcceptanceOrders3">{{Total.PX}}</div>
              <div class="AcceptanceOrders AcceptanceOrders4">{{Total.ZX}}</div>
              <div class="AcceptanceOrders AcceptanceOrders5">{{Total.WL}}</div>
            </div> -->
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// 查询产品线-图形统计数据
import { queryProductlineCountPic } from "@/api/dataStatis";

// 获取所有字典值/产品线对应的型号
import { getAllDict, getModel } from "@/api/common";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // X轴数据
      XData: [],
      Total: {
        AZ: 0,
        WX: 0,
        HF: 0,
        PX: 0,
        ZX: 0,
        WL: 0
      },
      productLines: [],
      models: [],

      prolist: [],

      pageQuery: {
        startTime: "",
        endTime: ""
      },
      listLoading: true
    };
  },
  mounted() {
    // 查询产品线-图形统计数据
    this.fetchListData();
    // ECharts图
    this.drawLine();
    //产品线
    this.fetchAllDict();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE,EQUI_MODEL";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
      });
    },

    // 获取所有生产线对应的型号
    productLineChange(val) {
      // 清空型号
      this.pageQuery.model = "";
      this.disabledModel = true;

      let obj = {};
      obj = this.productLines.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledModel = false;
        getModel(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.models = res.data.EQUI_MODEL;
          } else {
            this.models = [];
          }
        });
      }
    },

    // ECharts图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      // myChart.setOption({
      //   title: {
      //     text: "产品线数据统计"
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   legend: {
      //     data: [
      //       "安装数量",
      //       "维修数量",
      //       "回访数量",
      //       "培训数量",
      //       "专项数量",
      //       "物料领用"
      //     ]
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true
      //   },
      //   toolbox: {
      //     feature: {
      //       saveAsImage: {}
      //     }
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: []
      //   },
      //   yAxis: {
      //     type: "value"
      //   },
      //   series: [
      //     {
      //       name: "安装数量",
      //       type: "line",
      //       stack: "总量",
      //       data: []
      //     },
      //     {
      //       name: "维修数量",
      //       type: "line",
      //       stack: "总量",
      //       data: []
      //     },
      //     {
      //       name: "回访数量",
      //       type: "line",
      //       stack: "总量",
      //       data: []
      //     },
      //     {
      //       name: "培训数量",
      //       type: "line",
      //       stack: "总量",
      //       data: []
      //     },
      //     {
      //       name: "专项数量",
      //       type: "line",
      //       stack: "总量",
      //       data: []
      //     },
      //     {
      //       name: "物料领用",
      //       type: "line",
      //       stack: "总量",
      //       data: []
      //     }
      //   ]
      // });

      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "安装数量",
              "维修数量",
              "回访数量",
              "培训数量",
              "专项数量",
              "物料领用"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "30%",
            data: []
          }
        ]
      });
    },
    // 查询产品线-图形统计数据
    fetchListData() {
      this.listLoading = true;
      queryProductlineCountPic(this.pageQuery).then(res => {
        this.listLoading = false;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 填入数据
        // myChart.setOption({
        //   legend: {
        //     x: "500px"
        //   },
        //   series: [
        //     {
        //       // 根据名字对应到相应的系列
        //       name: "安装数量",
        //       data: res.data.map(item => {
        //         return item.AZ;
        //       })
        //     },
        //     {
        //       // 根据名字对应到相应的系列
        //       name: "维修数量",
        //       data: res.data.map(item => {
        //         return item.WX;
        //       })
        //     },
        //     {
        //       // 根据名字对应到相应的系列
        //       name: "回访数量",
        //       data: res.data.map(item => {
        //         return item.HF;
        //       })
        //     },
        //     {
        //       // 根据名字对应到相应的系列
        //       name: "培训数量",
        //       data: res.data.map(item => {
        //         return item.PX;
        //       })
        //     },
        //     {
        //       // 根据名字对应到相应的系列
        //       name: "专项数量",
        //       data: res.data.map(item => {
        //         return item.ZX;
        //       })
        //     },
        //     {
        //       // 根据名字对应到相应的系列
        //       name: "物料领用",
        //       data: res.data.map(item => {
        //         return item.WL;
        //       })
        //     }
        //   ]
        // });
        this.prolist = res.data;
        this.Total = {
          AZ: 0,
          WX: 0,
          HF: 0,
          PX: 0,
          ZX: 0,
          WL: 0
        };

        this.prolist
          .map(item => {
            return item.AZ;
          })
          .forEach(val => {
            this.Total.AZ += parseInt(val);
          });
        this.prolist
          .map(item => {
            return item.WX;
          })
          .forEach(val => {
            this.Total.WX += parseInt(val);
          });
        this.prolist
          .map(item => {
            return item.HF;
          })
          .forEach(val => {
            this.Total.HF += parseInt(val);
          });
        this.prolist
          .map(item => {
            return item.PX;
          })
          .forEach(val => {
            this.Total.PX += parseInt(val);
          });
        this.prolist
          .map(item => {
            return item.ZX;
          })
          .forEach(val => {
            this.Total.ZX += parseInt(val);
          });
        this.prolist
          .map(item => {
            return item.WL;
          })
          .forEach(val => {
            this.Total.WL += parseInt(val);
          });
        myChart.setOption({
          series: [
            {
              name: "直接访问",
              type: "bar",
              barWidth: "30%",
              data: [
                this.Total.AZ,
                this.Total.WX,
                this.Total.HF,
                this.Total.PX,
                this.Total.ZX,
                this.Total.WL
              ]
            }
          ],
          xAxis: [
          {
            type: "category",
            data: [
              "安装数量 - "+this.Total.AZ,
              "维修数量 - "+this.Total.WX,
              "回访数量 - "+this.Total.HF,
              "培训数量 - "+this.Total.PX,
              "专项数量 - "+this.Total.ZX,
              "物料领用 - "+this.Total.WL
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        });
      });
    },

    // 筛选数据
    commonSearch() {
      // 查询产品线-图形统计数据
      this.fetchListData();
    },
    // 跳转到列表统计页
    toListStatis() {
      this.$router.push({
        name: "ProductLineListStatis"
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
  width: 90%;
  min-width: 1000px;
  margin: 20px 30px;
}

.btnmain {
  position: absolute;
  top: 0;
  left: 155px;
  width: 100%;
  height: auto;
}

.AcceptanceOrders {
  position: absolute;
  top: 23px;
  left: 0;
  font-size: 12px;
  text-align: center;
  height: 12px;
  line-height: 12px;
  color: #c93236;
  width: 55px;
}

.AcceptanceOrders1 {
  left: 185px;
  color: #2e4856;
}

.AcceptanceOrders2 {
  left: 355px;
  color: #67a8af;
}
.AcceptanceOrders3 {
  left: 535px;
  color: #db836a;
}
.AcceptanceOrders4 {
  left: 710px;
  color: #9aceb8;
}
.AcceptanceOrders5 {
  left: 890px;
  color: #71a185;
}
</style>


