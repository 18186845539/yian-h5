<template>
  <div>
    <div class="pageContainer" ref="pageContainer">
      <!-- 数据表格部分 -->
      <div class="tableRow">
        <!-- 表格标题部分 -->
        <div class="tableTitle">
          <span>
            <i class="el-icon-news"></i>
            <span>产品档案</span>
          </span>
        </div>

        <!-- 表格部分   产品档案-->
        <div>
          <el-table
            v-loading="ProductArchivesLoading"
            element-loading-text="Loading"
            :data="ProductArchiveslist"
            ref="ProductArchiveslist"
            @selection-change="handleSelectionChange"
            fit
            highlight-current-row
          >
            <el-table-column type="selection" align="center" width="30"></el-table-column>

            <el-table-column property="theme" label="主题" align="center" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="tankuangbtn(scope.row)"
                  type="primary"
                  size="mini"
                >{{scope.row.theme}}</el-button>
              </template>
            </el-table-column>

            <!-- <el-table-column property="theme" label="主题" align="center"></el-table-column> -->

            <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

            <el-table-column property="model" label="型号" align="center"></el-table-column>

            <el-table-column property="deviceId" label="机型编号（序列号）" align="center"></el-table-column>

            <el-table-column property="installer" label="安装人" align="center"></el-table-column>

            <el-table-column property="installDate" label="安装日期" align="center"></el-table-column>

            <el-table-column property="createDate" label="创建日期" align="center"></el-table-column>
          </el-table>
        </div>

        <!-- 分页部分 -->
        <div class="tableBottom">
          <div>
            <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
            <el-button @click="reverseSelect(peixunList)" type="primary" size="mini">反选</el-button>
            <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>-->
          </div>
          <div ref="paginationContainer" class="paginationContainer">
            <el-pagination
              small
              background
              prev-text="上一页"
              next-text="下一页"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pageProductArchives.page"
              :page-sizes="pageSizes"
              :page-size="pageProductArchives.rows"
              layout="prev, pager, next, total, sizes, jumper"
              :total="pageProductArchives.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="pageContainer" ref="pageContainer">
      <!-- 数据表格部分 -->
      <div class="tableRow">
        <!-- 表格标题部分 -->
        <div class="tableTitle">
          <span>
            <i class="el-icon-news"></i>
            <span>维修记录</span>
          </span>
        </div>

        <!-- 表格部分   维修记录-->
        <div>
          <el-table
            v-loading="RepairLoading"
            element-loading-text="Loading"
            :data="Repairlist"
            ref="Repairlist"
            @selection-change="handleSelectionChange"
            fit
            highlight-current-row
          >
            <el-table-column type="selection" align="center" width="30"></el-table-column>

            <el-table-column property="theme" label="主题" align="center" width="80">
              <template slot-scope="scope">
                <el-button
                  @click="RepairInfosend(scope.row)"
                  type="primary"
                  size="mini"
                >{{scope.row.theme}}</el-button>
              </template>
            </el-table-column>

            <!-- <el-table-column property="theme" label="主题" align="center"></el-table-column> -->

            <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

            <el-table-column property="productName" label="产品名称" align="center"></el-table-column>

            <el-table-column property="model" label="型号" align="center"></el-table-column>

            <el-table-column property="deviceId" label="机器编号（序列号）" align="center"></el-table-column>

            <el-table-column property="note" label="备注" align="center"></el-table-column>

            <el-table-column property="owner" label="拥有者" align="center"></el-table-column>

            <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>

            <el-table-column property="productLine" label="产品线" align="center"></el-table-column>
          </el-table>
        </div>

        <!-- 分页部分 -->
        <div class="tableBottom">
          <div>
            <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(peixunList)" type="primary" size="mini">反选</el-button>
            <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>-->
          </div>
          <div ref="paginationContainer" class="paginationContainer">
            <el-pagination
              small
              background
              prev-text="上一页"
              next-text="下一页"
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="pageRepair.page"
              :page-sizes="pageSizes"
              :page-size="pageRepair.rows"
              layout="prev, pager, next, total, sizes, jumper"
              :total="pageRepair.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="pageContainer" ref="pageContainer">
      <!-- 数据表格部分 -->
      <div class="tableRow">
        <!-- 表格标题部分 -->
        <div class="tableTitle">
          <span>
            <i class="el-icon-news"></i>
            <span>回访记录</span>
          </span>
        </div>

        <!-- 表格部分   回访记录-->
        <div>
          <el-table
            v-loading="ReturnvisitLoading"
            element-loading-text="Loading"
            :data="Returnvisitlist"
            ref="Returnvisitlist"
            @selection-change="handleSelectionChange"
            fit
            highlight-current-row
          >
            <el-table-column type="selection" align="center" width="30"></el-table-column>

            <el-table-column property="theme" label="主题" align="center" width="80">
              <template slot-scope="scope">
                <el-button
                  @click="Returnvisisend(scope.row)"
                  type="primary"
                  size="mini"
                >{{scope.row.theme}}</el-button>
              </template>
            </el-table-column>

            <!-- <el-table-column property="theme" label="主题" align="center"></el-table-column> -->

            <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

            <el-table-column property="productName" label="产品名称" align="center"></el-table-column>

            <el-table-column property="model" label="型号" align="center"></el-table-column>

            <el-table-column property="deviceId" label="机器编号（序列号）" align="center"></el-table-column>

            <el-table-column property="note" label="备注" align="center"></el-table-column>

            <el-table-column property="owner" label="拥有者" align="center"></el-table-column>

            <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>
          </el-table>
        </div>

        <!-- 分页部分 -->
        <div class="tableBottom">
          <div>
            <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(peixunList)" type="primary" size="mini">反选</el-button>
            <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>-->
          </div>
          <div ref="paginationContainer" class="paginationContainer">
            <el-pagination
              small
              background
              prev-text="上一页"
              next-text="下一页"
              @size-change="handleSizeChange3"
              @current-change="handleCurrentChange3"
              :current-page="pageReturnvisit.page"
              :page-sizes="pageSizes"
              :page-size="pageReturnvisit.rows"
              layout="prev, pager, next, total, sizes, jumper"
              :total="pageReturnvisit.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="pageContainer" ref="pageContainer">
      <!-- 数据表格部分 -->
      <div class="tableRow">
        <!-- 表格标题部分 -->
        <div class="tableTitle">
          <span>
            <i class="el-icon-news"></i>
            <span>培训记录</span>
          </span>
        </div>

        <!-- 表格部分   培训记录-->
        <div>
          <el-table
            v-loading="TrainLoading"
            element-loading-text="Loading"
            :data="Trainlist"
            ref="Trainlist"
            @selection-change="handleSelectionChange"
            fit
            highlight-current-row
          >
            <el-table-column type="selection" align="center" width="30"></el-table-column>

            <el-table-column property="theme" label="主题" align="center" width="80">
              <template slot-scope="scope">
                <el-button
                  @click="ReturnPeixun(scope.row)"
                  type="primary"
                  size="mini"
                >{{scope.row.theme}}</el-button>
              </template>
            </el-table-column>

            <!-- <el-table-column property="theme" label="主题" align="center"></el-table-column> -->

            <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

            <el-table-column property="productName" label="产品名称" align="center"></el-table-column>

            <el-table-column property="model" label="型号" align="center"></el-table-column>

            <el-table-column property="note" label="备注" align="center"></el-table-column>

            <el-table-column property="owner" label="拥有者" align="center"></el-table-column>

            <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>
          </el-table>
        </div>

        <!-- 分页部分 -->
        <div class="tableBottom">
          <div>
            <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(peixunList)" type="primary" size="mini">反选</el-button>
            <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>-->
          </div>
          <div ref="paginationContainer" class="paginationContainer">
            <el-pagination
              small
              background
              prev-text="上一页"
              next-text="下一页"
              @size-change="handleSizeChange4"
              @current-change="handleCurrentChange4"
              :current-page="pageTrain.page"
              :page-sizes="pageSizes"
              :page-size="pageTrain.rows"
              layout="prev, pager, next, total, sizes, jumper"
              :total="pageTrain.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="pageContainer" ref="pageContainer">
      <!-- 数据表格部分 -->
      <div class="tableRow">
        <!-- 表格标题部分 -->
        <div class="tableTitle">
          <span>
            <i class="el-icon-news"></i>
            <span>专项记录</span>
          </span>
        </div>

        <!-- 表格部分   专项记录-->
        <div>
          <el-table
            v-loading="SpecialLoading"
            element-loading-text="Loading"
            :data="speciallist"
            ref="speciallist"
            @selection-change="handleSelectionChange"
            fit
            highlight-current-row
          >
            <el-table-column type="selection" align="center" width="30"></el-table-column>

            <el-table-column property="theme" label="主题" align="center" width="80"></el-table-column>

            <el-table-column property="customerName" label="客户" align="center"></el-table-column>

            <el-table-column property="productName" label="产品名称" align="center"></el-table-column>

            <el-table-column property="model" label="型号" align="center"></el-table-column>

            <el-table-column property="note" label="备注" align="center"></el-table-column>

            <el-table-column property="owner" label="拥有者" align="center"></el-table-column>

            <el-table-column property="createDate" label="创建时间" align="center"></el-table-column>

            <el-table-column property="productLine" label="产品线" align="center"></el-table-column>
          </el-table>
        </div>

        <!-- 分页部分 -->
        <div class="tableBottom">
          <div>
            <!-- <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(peixunList)" type="primary" size="mini">反选</el-button>
            <el-button @click="cancelSelect()" type="primary" size="mini">取消选择</el-button>-->
          </div>
          <div ref="paginationContainer" class="paginationContainer">
            <el-pagination
              small
              background
              prev-text="上一页"
              next-text="下一页"
              @size-change="handleSizeChange5"
              @current-change="handleCurrentChange5"
              :current-page="pageSpecial.page"
              :page-sizes="pageSizes"
              :page-size="pageSpecial.rows"
              layout="prev, pager, next, total, sizes, jumper"
              :total="pageSpecial.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!-- 档案-->
    <el-dialog :visible.sync="tankuang" width="70%" top="5vh" :modal-append-to-body="false">
      <el-row>
        <el-col :span="6">
          <p>保修开始时间</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.guaranteeBeginDate}}</p>
        </el-col>
        <el-col :span="6">
          <p>保修结束时间</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.guaranteeEndDate}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>机器安装到位</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.daoWei}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>受培训者范围</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.fanWei}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>培训内容</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.neiRong}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>产品验收情况_外观完好</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.yanShouWaiGuan}}</p>
        </el-col>
        <el-col :span="6">
          <p>产品验收情况_配件齐全</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.yanShouPeiJian}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>产品验收情况_安装到位</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.yanShouAnZhuang}}</p>
        </el-col>
        <el-col :span="6">
          <p>产品验收情况_工作正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.yanShouGongZuo}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>安装综合服务评价</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.pingJia}}</p>
        </el-col>
        <el-col :span="6">
          <p>备注</p>
        </el-col>
        <el-col :span="6">
          <p>{{ProductArchives.note}}</p>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 维修 -->
    <el-dialog :visible.sync="Repairtankuang" width="70%" top="5vh" :modal-append-to-body="false">
      <el-row>
        <el-col :span="6">
          <p>服务前产品状态</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.productNotes}}</p>
        </el-col>
        <el-col :span="6">
          <p></p>
        </el-col>
        <el-col :span="6">
          <p></p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>故障信息</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.xinxi}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>故障现象</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.xianxiang}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>解决方法</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.fangfa}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>维修结果</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.maintenanceResult}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>故障原因分析</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.yuanyin}}</p>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>其他故障原因</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.other}}</p>
        </el-col>
        <el-col :span="6">
          <p>产品故障是否消除</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.faultClearance}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>维修综合服务评价</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.serviceEvaluation}}</p>
        </el-col>
        <el-col :span="6">
          <p>相关附件</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.fujian}}</p>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="6">
          <p>备注</p>
        </el-col>
        <el-col :span="6">
          <p>{{RepairArchives.remark}}</p>
        </el-col>
        <el-col :span="6">
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>-->
    </el-dialog>

    <!-- 回访 -->
    <el-dialog
      :visible.sync="Returnvisittankuang"
      width="70%"
      top="5vh"
      :modal-append-to-body="false"
    >
      <el-row>
        <el-col :span="6">
          <p>机器编号（序列号）</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.deviceNo}}</p>
        </el-col>
        <el-col :span="6">
          <p>使用频率（次/月）</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.shiYongYue}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>维护频率（次/季度）</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.weiHuJi}}</p>
        </el-col>
        <el-col :span="6">
          <p>消毒频率（次/周）</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.xiaoDuZhou}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>APL阀的排气压力是否正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.paiQiYaLi}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果1</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result1}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>各功能是否正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.geGongNeng}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果2</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result2}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>各项报警是否正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.geBaoJing}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果3</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result3}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>面膜按键是否正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.mianMoAnJian}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果4</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result4}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>监测数值是否准确</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.jianCeShuZhi}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果5</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result5}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>回路气密性是否正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.huiLuQiMi}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果6</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result6}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>回路的活瓣是否有堵塞积水等现象</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.duSeJiShui}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果7</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result7}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>麻醉机的气密性是否符合要求</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.qiMiXing}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果8</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result8}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>钠石灰罐及附属装置是否需要清理</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.naShiHuiGuan}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果9</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result9}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>快速供养是否正常</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.kuaiSuGongYang}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果10</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result10}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>平行采样管有无积水现象</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.caiYangGuan}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果11</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result11}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>配件是否完好</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.peiJian}}</p>
        </el-col>
        <el-col :span="6">
          <p>处理结果12</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.result12}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>工程师对规定项目栏内项目是否逐一检查确认</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.zhuYiJianCha}}</p>
        </el-col>
        <el-col :span="6">
          <p>工程师是否进行整机的清洁保养</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.qingJieBaoYang}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>工程师的服务水平是否满意</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.manYi}}</p>
        </el-col>
        <el-col :span="6">
          <p>当客户选择“否”时，处理结果</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnvisiArchives.fouResult}}</p>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 培训 -->
    <el-dialog :visible.sync="Returntraining" width="70%" top="5vh" :modal-append-to-body="false">
      <el-row>
        <el-col :span="6">
          <p>主题</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.theme}}</p>
        </el-col>
        <el-col :span="6">
          <p>派工单号</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.assignId}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>客户</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.customerName}}</p>
        </el-col>
        <el-col :span="6">
          <p>产品线</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.productLine}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>产品</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.productName}}</p>
        </el-col>
        <el-col :span="6">
          <p>型号</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.model}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>规格</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.guige}}</p>
        </el-col>
        <el-col :span="6">
          <p>培训台数</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.trainNum}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>培训日期</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.createDate}}</p>
        </el-col>
        <el-col :span="6">
          <p>备注</p>
        </el-col>
        <el-col :span="6">
          <p>{{ReturnPeiXunArchives.note}}</p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// 获取所有字典值
import { getAllDict } from "@/api/common";

import { Loading } from "element-ui";
// 查询故障与配件-列表统计数据
import {
  queryPeiXunData,
  querySpecial,
  queryTrain,
  queryReturnvisit,
  queryRepair,
  queryProductArchives,
  ProductArchivesInfo,
  RepairInfo,
  Returnvisilist
} from "@/api/CRMdata";

import XLSX from "xlsx";
import { constants } from "crypto";

export default {
  data() {
    return {
      // 默认展开
      activeNames: ["1"],
      // 所有产品线
      productLines: [],
      // 表格数据
      peixunList: [],

      //speciallist  专项数据
      speciallist: [],
      //Trainlist   培训
      Trainlist: [],
      //回访
      Returnvisitlist: [],
      //维修
      Repairlist: [],
      //产品档案
      ProductArchiveslist: [],

      // 选中表格数据
      multipleSelection: [],
      //   专项
      pageSpecial: {
        customerId: "",
        applyType: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      //   培训
      pageTrain: {
        customerId: "",
        applyType: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      //   回访
      pageReturnvisit: {
        customerId: "",
        applyType: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      //   维修
      pageRepair: {
        customerId: "",
        applyType: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      //产品档案
      pageProductArchives: {
        customerId: "",
        applyType: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      //专项 loading
      SpecialLoading: true,
      //培训TrainLoading
      TrainLoading: true,
      //回访
      ReturnvisitLoading: true,
      //维修
      RepairLoading: true,
      //培训
      PeiXunInfoByAssignIdLoading: true,
      //产品档案
      ProductArchivesLoading: true,

      tableHeight: 250,
      pageSizes: [10, 20, 30],

      tankuang: false, // 产品档案
      Repairtankuang: false, //维修
      Returnvisittankuang: false, //回访
      Returntraining: false, //培训

      activeName2: "first",

      //产品档案
      ProductArchives: {
        guaranteeBeginDate: "",
        guaranteeEndDate: "",
        daoWei: "",
        fanWei: "",
        neiRong: "",
        yanShouWaiGuan: "",
        yanShouPeiJian: "",
        yanShouAnZhuang: "",
        yanShouGongZuo: "",
        pingJia: "",
        note: ""
      },
      //维修
      RepairArchives: {
        productNotes: "",
        xinxi: "",
        xianxiang: "",
        fangfa: "",
        maintenanceResult: "",
        yuanyin: "",
        other: "",
        faultClearance: "",
        serviceEvaluation: "",
        fujian: "",
        remark: ""
      },

      //回访
      ReturnvisiArchives: {
        deviceNo: "",
        shiYongYue: "",
        weiHuJi: "",
        xiaoDuZhou: "",
        paiQiYaLi: "",
        result1: "",
        geGongNeng: "",
        result2: "",
        geBaoJing: "",
        result3: "",
        mianMoAnJian: "",
        result4: "",
        jianCeShuZhi: "",
        result5: "",
        huiLuQiMi: "",
        result6: "",
        duSeJiShui: "",
        result7: "",
        qiMiXing: "",
        result8: "",
        naShiHuiGuan: "",
        result9: "",
        kuaiSuGongYang: "",
        result10: "",
        caiYangGuan: "",
        result11: "",
        peiJian: "",
        result12: "",
        zhuYiJianCha: "",
        qingJieBaoYang: "",
        manYi: "",
        fouResult: ""
      },

      //培训
      ReturnPeiXunArchives: {
        theme: "",

        assignId: "",

        customerName: "",

        productLine: "",

        productName: "",

        model: "",

        guige: "",

        trainNum: "",

        createDate: "",

        note: ""
      }
    };
  },
  mounted() {
    // 获取所有字典值
    // this.fetchAllDict();
    // 查询培训记录
    // this.fetchListData();

    // 查询专项记录
    this.fetchSpecial();

    // 查询培训记录
    this.fetchTrain();

    // 查询回访记录
    this.fetchReturnvisit();

    // 查询维修记录
    this.fetchRepair();

    //查询产品档案
    this.fetchProductArchives();
  },
  methods: {
    //产品档案
    tankuangbtn(row) {
      let loadingInstance = Loading.service({
        background: "rgba(0, 0, 0, 0.8)"
      });

      this.ProductArchives = {
        guaranteeBeginDate: "",
        guaranteeEndDate: "",
        daoWei: "",
        fanWei: "",
        neiRong: "",
        yanShouWaiGuan: "",
        yanShouPeiJian: "",
        yanShouAnZhuang: "",
        yanShouGongZuo: "",
        pingJia: "",
        note: ""
      };
      let data = {
        id: row.id,
        isOld: row.isOld
      };

      ProductArchivesInfo(data).then(res => {
        this.ProductArchives.guaranteeBeginDate = res.data.guaranteeBeginDate;
        this.ProductArchives.guaranteeEndDate = res.data.guaranteeEndDate;
        this.ProductArchives.daoWei = res.data.daoWei;
        this.ProductArchives.fanWei = res.data.fanWei;
        this.ProductArchives.neiRong = res.data.neiRong;
        this.ProductArchives.yanShouWaiGuan = res.data.yanShouWaiGuan;
        this.ProductArchives.yanShouPeiJian = res.data.yanShouPeiJian;
        this.ProductArchives.yanShouAnZhuang = res.data.yanShouAnZhuang;
        this.ProductArchives.yanShouGongZuo = res.data.yanShouGongZuo;
        this.ProductArchives.pingJia = res.data.pingJia;
        this.ProductArchives.note = res.data.note;
        loadingInstance.close();
        this.tankuang = true;
      });
    },

    //维修
    RepairInfosend(row) {
      let loadingInstance = Loading.service({
        background: "rgba(0, 0, 0, 0.8)"
      });
      //维修
      this.RepairArchives = {
        productNotes: "",
        xinxi: "",
        xianxiang: "",
        fangfa: "",
        maintenanceResult: "",
        yuanyin: "",
        other: "",
        faultClearance: "",
        serviceEvaluation: "",
        fujian: "",
        remark: ""
      };
      let data = {
        deviceId: row.deviceId,
        assignId: row.assignId,
        id: row.id,
        isOld: row.isOld
      };

      RepairInfo(data).then(res => {
        this.RepairArchives.productNotes = res.data.productNotes;
        this.RepairArchives.xinxi = res.data.xinxi;
        this.RepairArchives.xianxiang = res.data.xianxiang;
        this.RepairArchives.fangfa = res.data.fangfa;
        this.RepairArchives.maintenanceResult = res.data.maintenanceResult;
        this.RepairArchives.yuanyin = res.data.yuanyin;
        this.RepairArchives.other = res.data.other;
        this.RepairArchives.faultClearance = res.data.faultClearance;
        this.RepairArchives.serviceEvaluation = res.data.serviceEvaluation;
        this.RepairArchives.fujian = res.data.fujian;
        this.RepairArchives.remark = res.data.remark;
        this.Repairtankuang = true;

        loadingInstance.close();
      });
    },

    //回访
    Returnvisisend(row) {
      let loadingInstance = Loading.service({
        background: "rgba(0, 0, 0, 0.8)"
      });
      //回访
      this.ReturnvisiArchives = {
        deviceNo: "",
        shiYongYue: "",
        weiHuJi: "",
        xiaoDuZhou: "",
        paiQiYaLi: "",
        result1: "",
        geGongNeng: "",
        result2: "",
        geBaoJing: "",
        result3: "",
        mianMoAnJian: "",
        result4: "",
        jianCeShuZhi: "",
        result5: "",
        huiLuQiMi: "",
        result6: "",
        duSeJiShui: "",
        result7: "",
        qiMiXing: "",
        result8: "",
        naShiHuiGuan: "",
        result9: "",
        kuaiSuGongYang: "",
        result10: "",
        caiYangGuan: "",
        result11: "",
        peiJian: "",
        result12: "",
        zhuYiJianCha: "",
        qingJieBaoYang: "",
        manYi: "",
        fouResult: ""
      };
      let data = {
        id: row.id,
        isOld: row.isOld
      };
      Returnvisilist(data).then(res => {
        this.ReturnvisiArchives.deviceNo = res.data.deviceNo;
        this.ReturnvisiArchives.shiYongYue = res.data.shiYongYue;
        this.ReturnvisiArchives.weiHuJi = res.data.weiHuJi;
        this.ReturnvisiArchives.xiaoDuZhou = res.data.xiaoDuZhou;
        this.ReturnvisiArchives.paiQiYaLi = res.data.paiQiYaLi;
        this.ReturnvisiArchives.result1 = res.data.result1;
        this.ReturnvisiArchives.geGongNeng = res.data.geGongNeng;
        this.ReturnvisiArchives.result2 = res.data.result2;
        this.ReturnvisiArchives.geBaoJing = res.data.geBaoJing;
        this.ReturnvisiArchives.result3 = res.data.result3;
        this.ReturnvisiArchives.mianMoAnJian = res.data.mianMoAnJian;
        this.ReturnvisiArchives.result4 = res.data.result4;
        this.ReturnvisiArchives.jianCeShuZhi = res.data.jianCeShuZhi;
        this.ReturnvisiArchives.result5 = res.data.result5;
        this.ReturnvisiArchives.huiLuQiMi = res.data.huiLuQiMi;
        this.ReturnvisiArchives.result6 = res.data.result6;
        this.ReturnvisiArchives.duSeJiShui = res.data.duSeJiShui;
        this.ReturnvisiArchives.result7 = res.data.result7;
        this.ReturnvisiArchives.qiMiXing = res.data.qiMiXing;
        this.ReturnvisiArchives.result8 = res.data.result8;
        this.ReturnvisiArchives.naShiHuiGuan = res.data.naShiHuiGuan;
        this.ReturnvisiArchives.result9 = res.data.result9;
        this.ReturnvisiArchives.kuaiSuGongYang = res.data.kuaiSuGongYang;
        this.ReturnvisiArchives.result10 = res.data.result10;
        this.ReturnvisiArchives.caiYangGuan = res.data.caiYangGuan;
        this.ReturnvisiArchives.result11 = res.data.result11;
        this.ReturnvisiArchives.peiJian = res.data.peiJian;
        this.ReturnvisiArchives.result12 = res.data.result12;
        this.ReturnvisiArchives.zhuYiJianCha = res.data.zhuYiJianCha;
        this.ReturnvisiArchives.qingJieBaoYang = res.data.qingJieBaoYang;
        this.ReturnvisiArchives.manYi = res.data.manYi;
        this.ReturnvisiArchives.fouResult = res.data.fouResult;
        this.Returnvisittankuang = true;

        loadingInstance.close();
      });
    },

    //培训
    ReturnPeixun(row) {
      let loadingInstance = Loading.service({
        background: "rgba(0, 0, 0, 0.8)"
      });
      //培训
      this.ReturnPeiXunArchives = {
        theme: "",

        assignId: "",

        customerName: "",

        productLine: "",

        productName: "",

        model: "",

        guige: "",

        trainNum: "",

        createDate: "",

        note: ""
      };
      let data = {
        id: row.id,
        isOld: row.isOld,
        assignId: row.assignId
      };
      Returnvisilist(data).then(res => {
        console.log(res);
        this.ReturnPeiXunArchives.theme = res.data.theme;
        this.ReturnPeiXunArchives.assignId = res.data.assignId;
        this.ReturnPeiXunArchives.customerName = res.data.customerName;
        this.ReturnPeiXunArchives.productLine = res.data.productLine;
        this.ReturnPeiXunArchives.productName = res.data.productName;
        this.ReturnPeiXunArchives.model = res.data.model;
        this.ReturnPeiXunArchives.guige = res.data.guige;
        this.ReturnPeiXunArchives.trainNum = res.data.trainNum;
        this.ReturnPeiXunArchives.createDate = res.data.createDate;
        this.ReturnPeiXunArchives.note = res.data.note;
        this.Returntraining = true;
        loadingInstance.close();
      });
    },
    // //tab  切换  弹框
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },

    // 获取所有字典值
    fetchAllDict() {
      let data = "PRODUCT_LINE";
      getAllDict(data).then(res => {
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
      });
    },
    // 查询培训记录
    // fetchListData() {
    //   this.listLoading = true;
    //   let data = this.pageQuery;
    //   queryPeiXunData(data).then(res => {
    //     this.peixunList = res.data.list;
    //     this.pageQuery.totalCount = res.data.total;
    //     this.listLoading = false;
    //   });
    // },

    //查询专项记录
    fetchSpecial() {
      this.SpecialLoading = true;
      let data = this.pageSpecial;
      data.customerId = this.$route.query.id;
      data.applyType = "ZX";
      querySpecial(data).then(res => {
        this.speciallist = res.data.list;
        this.pageSpecial.totalCount = res.data.total;
        this.SpecialLoading = false;
      });
    },
    //查询培训记录
    fetchTrain() {
      this.TrainLoading = true;
      let data = this.pageTrain;
      data.customerId = this.$route.query.id;
      data.applyType = "PX";

      queryTrain(data).then(res => {
        this.Trainlist = res.data.list;
        this.pageTrain.totalCount = res.data.total;
        this.TrainLoading = false;
      });
    },
    //查询回访记录
    fetchReturnvisit() {
      this.ReturnvisitLoading = true;
      let data = this.pageReturnvisit;
      data.customerId = this.$route.query.id;
      data.applyType = "HF";

      queryReturnvisit(data).then(res => {
        this.Returnvisitlist = res.data.list;
        this.pageReturnvisit.totalCount = res.data.total;
        this.ReturnvisitLoading = false;
      });
    },

    //查询维修记录
    fetchRepair() {
      this.RepairLoading = true;
      let data = this.pageRepair;
      data.customerId = this.$route.query.id;
      data.applyType = "WX";

      queryRepair(data).then(res => {
        this.Repairlist = res.data.list;
        this.pageRepair.totalCount = res.data.total;
        this.RepairLoading = false;
      });
    },

    //查询产品档案
    fetchProductArchives() {
      this.ProductArchivesLoading = true;
      let data = this.pageProductArchives;
      data.customerId = this.$route.query.id;
      console.log(this.$route.query.id);
      queryProductArchives(data).then(res => {
        console.log(res);
        this.ProductArchiveslist = res.data.list;
        this.pageProductArchives.totalCount = res.data.total;
        this.ProductArchivesLoading = false;
      });
    },

    // pagesize 变化   查询产品档案
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.pageProductArchives.page = 1;
      this.pageProductArchives.rows = val;
      return;
      // 查询故障与配件-列表统计数据
      this.fetchProductArchives();
    },
    // 当前页变化      查询产品档案
    handleCurrentChange1(val) {
      this.pageProductArchives.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchProductArchives();
    },

    // pagesize 变化    查询维修记录
    handleSizeChange2(val) {
      this.pageRepair.page = 1;
      this.pageRepair.rows = val;

      // 查询故障与配件-列表统计数据
      this.fetchRepair();
    },
    // 当前页变化      查询维修记录
    handleCurrentChange2(val) {
      this.pageRepair.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchRepair();
    },

    // pagesize 变化    查询回访记录
    handleSizeChange3(val) {
      this.pageReturnvisit.page = 1;
      this.pageReturnvisit.rows = val;

      // 查询故障与配件-列表统计数据
      this.fetchReturnvisit();
    },
    // 当前页变化      查询回访记录
    handleCurrentChange3(val) {
      this.pageReturnvisit.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchReturnvisit();
    },

    // pagesize 变化    查询培训记录
    handleSizeChange4(val) {
      this.pageTrain.page = 1;
      this.pageTrain.rows = val;

      // 查询故障与配件-列表统计数据
      this.fetchTrain();
    },
    // 当前页变化      查询培训记录
    handleCurrentChange4(val) {
      this.pageTrain.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchTrain();
    },

    // pagesize 变化    查询专项记录
    handleSizeChange5(val) {
      this.pageSpecial.page = 1;
      this.pageSpecial.rows = val;

      // 查询故障与配件-列表统计数据
      this.fetchSpecial();
    },
    // 当前页变化      查询专项记录
    handleCurrentChange5(val) {
      this.pageSpecial.page = val;
      // 查询故障与配件-列表统计数据
      this.fetchSpecial();
    },

    // // 筛选的方法
    // commonSearch() {
    //   this.listLoading = true;
    //   let data = this.pageQuery;
    //   queryPeiXunData(data).then(res => {
    //     this.peixunList = res.data.list;
    //     this.pageQuery.totalCount = res.data.total;
    //     this.listLoading = false;
    //   });
    // },

    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.peixunList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.peixunList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.peixunList.toggleRowSelection(row);
        });
      }
    },
    // 批量导出
    excelBtn() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择要导出的数据");
      } else {
        let o = [["序列号", "上门次数", "客户配件报修"]];

        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(item.deviceId);

          arr.push(item.upDoor);

          arr.push(item.materielCode);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "故障与配件-列表统计");
        XLSX.writeFile(wb, "故障与配件-列表统计.xlsx");
      }
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style scoped>
body {
  margin: 0;
}
</style>


