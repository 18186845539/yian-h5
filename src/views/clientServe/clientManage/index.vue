<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 筛选条件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="结果筛选" name="1">
          <div class="searchRow">
            <span>
              <span>客户类型：</span>
              <span class="searchItem">
                <el-select v-model="pageQuery.userType" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in userTypes"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>

            <span>
              <span>客户编码：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.customerCode" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>客户名称：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.customerName" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>联系人：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.contacts" size="small" clearable></el-input>
              </span>
            </span>

            <!-- <span>
              <span>电话：</span>
              <span class="searchItem">
                <el-input v-model="pageQuery.phone" size="small" clearable></el-input>
              </span>
            </span>-->
            <span class="searchCol">
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
              <span>城市：</span>
              <span class="searchItem">
                <el-select
                  v-model="pageQuery.city"
                  :disabled="disabledCity"
                  placeholder="请选择"
                  size="small"
                  clearable
                >
                  <el-option
                    v-for="item in citys"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </span>
            <transition name="fade">
              <div v-show="advancedSearch" transiton="fade" class="searchRow">
                <span>
                  <span>邮编：</span>
                  <span class="searchItem">
                    <el-input v-model="pageQuery.zipCode" type="text" size="small" maxlength="6"   clearable></el-input>
                  </span>
                </span>

                <span>
                  <span>终端客户级别：</span>
                  <span class="searchItem">
                    <el-select
                      v-model="pageQuery.customerLevel"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in customerLevels"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </span>
                </span>

                <span>
                  <span>客户服务等级：</span>
                  <span class="searchItem">
                    <el-select
                      v-model="pageQuery.customerServiceLevel"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in customerServiceLevels"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </span>
                </span>

                <span>
                  <span>使用科室：</span>
                  <span class="searchItem">
                    <el-select
                      v-model="pageQuery.useDepartment"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in departments"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </span>
                </span>

                <span>
                  <span>终端客户类型：</span>
                  <span class="searchItem">
                    <el-select
                      v-model="pageQuery.customerType"
                      placeholder="请选择"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in customerTypes"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </span>
                </span>

                <span>
                  <span>国家：</span>
                  <span class="searchItem">
                    <el-select v-model="pageQuery.country" placeholder="请选择" size="small" clearable>
                      <el-option
                        v-for="item in countrys"
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
                      v-model="pageQuery.createDateBegin"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="开始时间"
                      size="small"
                      clearable
                    ></el-date-picker>
                  </span>
                </span>

                <span>
                  <span>结束时间：</span>
                  <span>
                    <el-date-picker
                      v-model="pageQuery.createDateEnd"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      size="small"
                      clearable
                    ></el-date-picker>
                  </span>
                </span>
              </div>
            </transition>

            <span>
              <el-button
                @click="commonSearch()"
                type="primary"
                icon="el-icon-search"
                size="small"
              >筛选</el-button>
              <el-button
                @click="advancedSearch = !advancedSearch"
                type="primary"
                icon="el-icon-search"
                size="small"
              >更多</el-button>
              <el-button @click="emptySearch()" type="primary" size="small">清空筛选</el-button>
              <el-button @click="excelBtn()" type="primary" size="small">批量导出</el-button>
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
          <span>客户管理列表</span>
        </span>
        <span>
          <el-button type="success" icon="el-icon-plus" size="small" @click="toAddPage()">添加客户信息</el-button>
        </span>
      </div>

      <!-- 表格部分 -->
      <div>
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="productMessageList"
          ref="productMessageList"
          @selection-change="handleSelectionChange"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="30"></el-table-column>

          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

          <el-table-column property="customerCode" label="客户编码" align="center" width="160"></el-table-column>

          <el-table-column property="userType" label="客户类型" align="center">
            <template slot-scope="scope">{{scope.row.userType | dicFilter(userTypes)}}</template>
          </el-table-column>

          <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

          <el-table-column property="province" label="省份" align="center">
            <template slot-scope="scope">{{scope.row.province | dicFilter(provinces)}}</template>
          </el-table-column>

          <el-table-column property="city" label="城市" align="center">
            <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
          </el-table-column>
         
          <el-table-column property="contacts" label="联系人" align="center"></el-table-column>

          <el-table-column property="phone" label="电话" align="center"></el-table-column>

          <el-table-column property="customerLevel" label="终端客户级别" align="center">
            <template slot-scope="scope">{{scope.row.customerLevel | dicFilter(customerLevels)}}</template>
          </el-table-column>

          <el-table-column property="customerServiceLevel" label="客户服务等级" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.customerServiceLevel | dicFilter(customerServiceLevels)}}</template>
          </el-table-column>

          <!-- <el-table-column property="zipCode" label="邮编" align="center"></el-table-column> -->

          <!-- <el-table-column property="useDepartment" label="使用科室" align="center">
            <template slot-scope="scope">{{scope.row.useDepartment | dicFilter(departments)}}</template>
          </el-table-column>-->

          <!-- <el-table-column property="customerType" label="终端客户类型" align="center">
            <template slot-scope="scope">{{scope.row.customerType | dicFilter(customerTypes)}}</template>
          </el-table-column>-->

          <!-- <el-table-column property="country" label="国家" align="center">
            <template slot-scope="scope">{{scope.row.country | dicFilter(countrys)}}</template>
          </el-table-column>-->

          <el-table-column property="createDate" label="创建时间" align="center" width="150">
            
            <template slot-scope="scope">{{scope.row.createDate | timeslce(scope.row.createDate)}}</template>

          </el-table-column>

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button @click="toDetailsPage(scope.row)" size="mini">查看</el-button>
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

      <!-- 分页部分 -->
      <div class="tableBottom">
        <div>
          <el-button @click="allSelect()" type="primary" size="mini">全选</el-button>
          <el-button @click="reverseSelect(productMessageList)" type="primary" size="mini">反选</el-button>
          <el-button @click="cancelSelect()" type="primary" size="mini">全不选</el-button>
          <el-button @click="batchHandleDelete()" type="primary" size="mini">批量删除</el-button>
        </div>
        <div ref="paginationContainer" class="paginationContainer">
          <el-pagination
            small
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageQuery.page"
            :page-sizes="pageSizes"
            :page-size="pageQuery.rows"
            layout="prev, pager, next, total, sizes, jumper"
            :total="pageQuery.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 获取所有字典值/获取省份对应的城市
import { getAllDict, getCity } from "@/api/common";
// 查询客户管理列表/批量删除客户管理信息
import { queryAdminCustomerList, delCustomerInfo } from "@/api/clientServe";

import XLSX from "xlsx";

export default {
  // 过滤显示
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d, n) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
    }
  },

  data() {
    return {
      // 高级筛选显示隐藏控制
      advancedSearch: false,
      // 默认展开
      activeNames: ["1"],
      // 所有省份
      provinces: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      // 所有城市
      cityes: [],
      // 所有科室
      departments: [],
      // 所有客户服务等级
      customerServiceLevels: [],
      // 所有终端客户类型
      customerTypes: [],
      // 所有终端客户级别
      customerLevels: [],
      // 所有国家
      countrys: [],
      // 所有客户类型
      userTypes: [],
      // 表格数据
      productMessageList: [],
      // 选中表格数据
      multipleSelection: [],

      //   筛选数据
      pageQuery: {
        userType: "",
        customerCode: "",
        customerName: "",
        contacts: "",
        phone: "",
        province: "",
        city: "",
        zipCode: "",
        customerLevel: "",
        customerServiceLevel: "",
        useDepartment: "",
        customerType: "",
        country: "",
        createDateBegin: "",
        createDateEnd: "",
        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30]
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
    // 查询客户管理列表
    this.fetchListData();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "DEPARTMENT,CITY,PROVINCE,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,USERTYPE";
      getAllDict(data).then(res => {
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有市
        this.cityes = res.data.CITY;
        // 获取所有客户服务等级
        this.customerServiceLevels = res.data.CUSTOMER_SERVICE_LEVEL;
        // 获取所有终端客户类型
        this.customerTypes = res.data.CUSTOMER_TYPE;
        // 获取所有终端客户级别
        this.customerLevels = res.data.CUSTOMER_LEVEL;
        // 获取所有国家
        this.countrys = res.data.COUNTRY;
        // 获取所有客户类型
        this.userTypes = res.data.USERTYPE;
      });
    },
    // 获取所有省份对应的城市
    provinceChange(val) {
      // 清空城市
      this.pageQuery.city = "";
      this.disabledCity = true;

      let obj = {};
      obj = this.provinces.find(item => {
        return item.value === val;
      });
      if (obj != undefined) {
        let data = obj.id;
        this.disabledCity = false;
        getCity(data).then(res => {
          if (JSON.stringify(res.data) != "{}") {
            this.citys = res.data.CITY;
          } else {
            this.citys = [];
          }
        });
      }
    },
    // 查询客户管理列表
    fetchListData() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryAdminCustomerList(data).then(res => {
        this.productMessageList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQuery.page = 1;
      this.pageQuery.rows = val;
      // 查询客户管理列表
      this.fetchListData();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      // 查询客户管理列表
      this.fetchListData();
    },
    // 筛选的方法
    commonSearch() {
      this.listLoading = true;
      let data = this.pageQuery;
      queryAdminCustomerList(data).then(res => {
        this.productMessageList = res.data.list;
        this.pageQuery.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 清空筛选
    emptySearch() {
      this.pageQuery = {
        customerCode: "",
        customerName: "",
        contacts: "",
        phone: "",
        province: "",
        city: "",
        zipCode: "",
        customerLevel: "",
        customerServiceLevel: "",
        useDepartment: "",
        customerType: "",
        country: "",
        createDateBegin: "",
        createDateEnd: "",
        totalCount: 0,
        page: 1,
        rows: 10
      };
      // 是否禁用城市下拉
      this.disabledCity = true;
      // 查询客户管理列表
      this.fetchListData();
    },
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选的方法
    allSelect() {
      this.$refs.productMessageList.toggleAllSelection();
    },
    // 取消选择的方法
    cancelSelect() {
      this.$refs.productMessageList.clearSelection();
    },
    // 反选的方法
    reverseSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.productMessageList.toggleRowSelection(row);
        });
      }
    },
    // 单个删除客户管理信息
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = rowData.id;
          delCustomerInfo(data).then(res => {
            this.$message.success(res.msg);
            // 查询客户管理列表
            this.fetchListData();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 批量删除客户管理信息
    batchHandleDelete() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择要删除的数据");
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let arr = [];
            this.multipleSelection.forEach(item => {
              arr.push(item.id);
            });
            let idData = arr.toString();
            delCustomerInfo(idData).then(res => {
              this.$message.success(res.msg);
              // 查询客户管理列表
              this.fetchListData();
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },
    // 批量导出
    excelBtn() {
      let o = [
        [
          "客户编码",
          "客户类型",
          "客户名称",
          "省",
          "市",
          "联系人",
          "电话",
          "终端客户级别",
          "客户服务等级",
          "邮编",
          "使用科室",
          "终端客户类型",
          "国家",
          "创建时间"
        ]
      ];

      if (this.multipleSelection.length == 0) {
        this.pageQuery.rows = 100000;
        queryAdminCustomerList(this.pageQuery).then(res => {
          this.pageQuery.rows = 10;
          res.data.list.map(item => {
            let arr = [];
            arr.push(item.customerCode);
            arr.push(
              this.$options.filters.dicFilter(item.userType, this.userTypes)
            );
            arr.push(item.customerName);

            arr.push(
              this.$options.filters.dicFilter(item.province, this.provinces)
            );

            arr.push(this.$options.filters.dicFilter(item.city, this.cityes));

            arr.push(item.contacts);

            arr.push(item.phone);

            arr.push(
              this.$options.filters.dicFilter(
                item.customerLevel,
                this.customerLevels
              )
            );

            arr.push(
              this.$options.filters.dicFilter(
                item.customerServiceLevel,
                this.customerServiceLevels
              )
            );

            arr.push(item.zipCode);

            arr.push(
              this.$options.filters.dicFilter(
                item.useDepartment,
                this.departments
              )
            );

            arr.push(
              this.$options.filters.dicFilter(
                item.customerType,
                this.customerTypes
              )
            );

            arr.push(
              this.$options.filters.dicFilter(item.country, this.countrys)
            );

            arr.push(item.createDate);

            o.push(arr);
          });

          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(o);
          XLSX.utils.book_append_sheet(wb, ws, "医院家庭客户列表");
          XLSX.writeFile(wb, "医院家庭客户列表.xlsx");
        });
      } else {
        this.multipleSelection.map(item => {
          let arr = [];
          arr.push(item.customerCode);
          arr.push(
            this.$options.filters.dicFilter(item.userType, this.userTypes)
          );

          arr.push(item.customerName);

          arr.push(
            this.$options.filters.dicFilter(item.province, this.provinces)
          );

          arr.push(this.$options.filters.dicFilter(item.city, this.cityes));

          arr.push(item.contacts);

          arr.push(item.phone);

          arr.push(
            this.$options.filters.dicFilter(
              item.customerLevel,
              this.customerLevels
            )
          );

          arr.push(
            this.$options.filters.dicFilter(
              item.customerServiceLevel,
              this.customerServiceLevels
            )
          );

          arr.push(item.zipCode);

          arr.push(
            this.$options.filters.dicFilter(
              item.useDepartment,
              this.departments
            )
          );

          arr.push(
            this.$options.filters.dicFilter(
              item.customerType,
              this.customerTypes
            )
          );

          arr.push(
            this.$options.filters.dicFilter(item.country, this.countrys)
          );

          arr.push(item.createDate);

          o.push(arr);
        });

        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.aoa_to_sheet(o);
        XLSX.utils.book_append_sheet(wb, ws, "医院家庭客户列表");
        XLSX.writeFile(wb, "医院家庭客户列表.xlsx");
      }
    },
    // 跳转到添加客户信息页
    toAddPage() {
      this.$router.push({
        name: "AddClient"
      });
    },
    // 跳转到编辑客户信息页
    toEditPage(data) {
      let id = data.id;
      this.$router.push({
        name: "EditClient",
        query: {
          sendData: id
        }
      });
    },
    // 跳转到详情页
    toDetailsPage(data) {
      let id = data.id;
      this.$router.push({
        name: "DetailsPageEC",
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

