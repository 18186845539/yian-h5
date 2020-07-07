<template>
  <div class="pageContainer" ref="pageContainer">
    <!-- 表单件部分 -->
    <div ref="pageSearch" class="pageSearch">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="添加员工工单" name="1">
          <div class="searchRow">
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="200px"
              size="small"
              class="demo-ruleForm"
            >
              <el-form-item label="序列号：" prop="deviceId">
                <el-input v-model="form.deviceId" @blur="setDeviceId()" style="width:200px"></el-input>
              </el-form-item>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="产品线：" prop="productLine">
                    <el-select
                      v-model="form.productLine"
                      @change="productLineChange"
                      disabled
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in productLines"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="型号：" prop="model">
                    <el-select
                      v-model="form.model"
                      :disabled="disabledModel"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in models"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="选择客户：" prop="customerName">
                <!-- <el-button type="primary" @click="selectClient">选择客户</el-button> -->
                <!-- <el-table :data="clientData">
                  <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

                  <el-table-column property="useDepartment" label="科室" align="center">
                    <template
                      slot-scope="scope"
                    >{{scope.row.useDepartment | dicFilter(departments)}}</template>
                  </el-table-column>

                  <el-table-column property="contacts" label="联系人" align="center"></el-table-column>

                  <el-table-column property="phone" label="电话" align="center"></el-table-column>
                </el-table> -->



               <el-table :data="clientData">
                  <el-table-column property="customerName" label="客户名称" align="center">
                    </el-table-column> 
                  <el-table-column property="useDepartment" label="科室" align="center">
                  <!-- <template slot-scope="scope"  >{{scope.row.useDepartment | dicFilter(departments)}}</template> -->
                  </el-table-column>
                  <el-table-column property="contacts" label="联系人" align="center">
                   <template slot-scope="scope">
                  <el-input type="text"   v-model="form.contacts"  maxlength="10" @input="change($event)" />
                  </template>
                  </el-table-column>
                  <el-table-column property="phone" label="电话" align="center">
                      <template slot-scope="scope">
                     <el-input type="text" v-model="form.phone" maxlength="11"  />
                       </template>
                  </el-table-column>
                </el-table>


              </el-form-item>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="申请类型：" prop="applyType">
                    <el-select v-model="form.applyType" placeholder="请选择">
                      <el-option
                        v-for="item in applyTypes"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="故障类型：" prop="faultType">
                    <el-select v-model="form.faultType" placeholder="请选择">
                      <el-option
                        v-for="item in faultTypes"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="职务：" prop="position">
                    <el-select v-model="form.position" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in positions"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预约时间：" prop="appointmentDate">
                    <el-date-picker
                      v-model="form.appointmentDate"
                      type="date"
                      placeholder="请选择"
                      style="width:200px"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="客户名称：" prop="hospital">
                    <el-select
                      v-model="form.hospital"
                      @change="hospitalChange"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in hospitals"
                        :key="item.id"
                        :label="item.customerName"
                        :value="item.customerName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="科室：" prop="department">
                    <el-select v-model="form.department" placeholder="请选择" disabled clearable>
                      <el-option
                        v-for="item in departments"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="联系人：" prop="contacts">
                    <el-input v-model="form.contacts" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话：" prop="phone">
                    <el-input v-model="form.phone" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="选择省份：" prop="province">
                    <el-select
                      v-model="form.province"
                      @change="provinceChange"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in provinces"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="选择城市：" prop="city">
                    <el-select
                      v-model="form.city"
                      @change="cityChange"
                      :disabled="disabledCity"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in citys"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <el-form-item label="指派员工：" prop="staffId">
                <el-button type="primary" @click="selectStaff(staffId)">选择员工</el-button>

                <el-table :data="staffData">
                  <el-table-column property="staffName" label="员工姓名" align="center"></el-table-column>

                  <el-table-column property="phone" label="电话" align="center"></el-table-column>

                  <el-table-column property="province" label="省份" align="center">
                    <template slot-scope="scope">
                      <div style="width:100%  ;  height: 25px;
    overflow: hidden;">
                        <div
                          v-for="(name,index) in scope.row.province1"
                          :key="index"
                          v-show="scope.row.province1.length -1 != index"
                          style="    display: inline-block;
    vertical-align: top;"
                        >{{name+","}}</div>
                        <div
                          v-for="(name,index1) in scope.row.province1"
                          :key="index1"
                          v-show="scope.row.province1.length-1==index1"
                          style="    display: inline-block;
    vertical-align: top;"
                        >{{name}}</div>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column property="city" label="城市" align="center">
                    <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
                  </el-table-column>
                </el-table>
              </el-form-item>

              <el-form-item label="预约时间：" prop="appointmentDate">
                <el-date-picker
                  v-model="form.appointmentDate"
                  type="date"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd"
                  style="width:200px"
             
                ></el-date-picker>

<!-- 预约时间备份
              <el-form-item label="预约时间：" prop="appointmentDate">
                <el-date-picker
                  v-model="form.appointmentDate"
                  type="date"
                  placeholder="请选择"
                  value-format="yyyy-MM-dd"
                  style="width:200px"
                  :picker-options="pickerOptions1"
                ></el-date-picker> -->

              </el-form-item>

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="优先级：" prop="priority">
                    <el-select v-model="form.priority" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in prioritys"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预约时间：" prop="appointmentDate">
                    <el-date-picker
                      v-model="form.appointmentDate"
                      type="date"
                      placeholder="请选择"
                      style="width:200px"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <!-- <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="指派员工：" prop="staffId">
                    <el-select
                      v-model="form.staffId"
                      @change="staffIdChange"
                      :disabled="disabledCity"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in staffs"
                        :key="item.id"
                        :label="item.staffName"
                        :value="item.staffId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="优先级：" prop="priority">
                    <el-select
                      v-model="form.priority"
                      :disabled="disabledCity"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in prioritys"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>-->

              <el-form-item label="物料编码：" prop="materielCode">
                <el-input
                  v-model="form.materielCode"
                  onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
                  placeholder="请输入物料编码，若多个以逗号分隔。"
                ></el-input>
              </el-form-item>

              <el-form-item label="故障描述：">
                <el-input
                  v-model="form.faultDescribe"
                  type="textarea"
                  resize="none"
                  placeholder="请输入内容"
                  maxlength="200"
                  :rows="3"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <el-form-item label="上传图片：">
                <el-upload
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="image/jpeg, image/png"
                  :auto-upload="false"
                  :multiple="true"
                  list-type="picture-card"
                  :file-list="imagesList"
                  :on-remove="removeImg"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUploadImg"
                  :on-change="fileChange"
                  :on-success="fileUploadSuccess"
                  :on-exceed="exceedAstrict"
                  :limit="3"
                  ref="upload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <P class="text">请保证图片格式正确(PNG、JPEG)，且不超过10M,最多上传三张</P>
              </el-form-item>

              <el-form-item label="视频上传：" prop="video">
                <!-- action必选参数, 上传的地址 -->
                <el-upload
                  class="avatar-uploader el-upload--text"
                  :action="imgHttp"
                  :headers="{token:token}"
                  accept="video/mp4, video/ogg, video/flv, video/avi, video/wmv, video/rmvb"
                  :show-file-list="false"
                  :file-list="vidoList"
                  :on-success="handleVideoSuccess"
                  :before-upload="beforeUploadVideo"
                  :on-progress="uploadVideoProcess"
                >
                  <video
                    style="width: 500px;"
                    v-if="form.video !='' && videoFlag == false"
                    :src="imgURL+form.video"
                    class="avatar"
                    controls="controls"
                  >您的浏览器不支持视频播放</video>
                  <el-button
                    v-else-if="form.video =='' && videoFlag == false"
                    slot="trigger"
                    size="small"
                    type="primary"
                  >选取视频文件</el-button>
                  <el-progress
                    v-if="videoFlag == true"
                    type="circle"
                    :percentage="videoUploadPercent"
                    style="margin-top:30px;"
                  ></el-progress>
                </el-upload>
                <el-button v-if="form.video !=''" type="warning" @click="delVideo">移除当前视频</el-button>
                <P class="text">请保证视频格式正确(mp4、ogg、flv、avi、wmv、rmvb)，且不超过50M</P>
              </el-form-item>

              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="submitForm('form')"
                      size="small"
                      :disabled="disabledSB"
                    >提交</el-button>
                    <!-- <el-button @click="resetForm()" size="small ">重置</el-button> -->
                    <el-button @click="returnBtn()" size="small ">返回</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 选择客户框部分 -->
    <div class="tableRow">
      <el-dialog
        :visible.sync="dialogTableVisible"
        width="70%"
        top="5vh"
        :modal-append-to-body="false"
      >
        <div>
          <!-- 筛选部分 -->
          <div
            style=" display: flex;justify-content: space-between;flex-wrap: wrap;margin-bottom:20px;"
          >
            <span>
              <span>客户编码：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQuery.customerCode" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>客户名称：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQuery.customerName" size="small" clearable></el-input>
              </span>
            </span>

            <span class="searchCol">
              <span>省份：</span>
              <span style="display: inline-block;max-width: 100px;">
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
              <span style="display: inline-block;max-width: 100px;">
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

            <span>
              <el-button
                @click="commonSearch()"
                type="primary"
                icon="el-icon-search"
                size="small"
              >筛选</el-button>
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
              @row-click="clickRow"
              fit
              highlight-current-row
              height="320px"
            >
              <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

              <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

              <el-table-column property="customerCode" label="客户编码" align="center" width="160"></el-table-column>

              <el-table-column property="customerName" label="客户名称" align="center"></el-table-column>

              <el-table-column property="province" label="省份" align="center">
                <template slot-scope="scope">
                  <div style="width:100%;height: 25px;
    overflow: hidden;">
                    <div
                      v-for="(name,index) in scope.row.province1"
                      :key="index"
                      v-show="scope.row.province1.length -1 != index"
                      style="    display: inline-block;
    vertical-align: top;"
                    >{{name+","}}</div>
                    <div
                      v-for="(name,index1) in scope.row.province1"
                      :key="index1"
                      v-show="scope.row.province1.length-1==index1"
                      style="    display: inline-block;
    vertical-align: top;"
                    >{{name}}</div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column property="city" label="城市" align="center">
                <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
              </el-table-column>

              <el-table-column property="contacts" label="联系人" align="center"></el-table-column>

              <el-table-column property="phone" label="电话" align="center"></el-table-column>

              <el-table-column property="useDepartment" label="科室" align="center">
                <template slot-scope="scope">{{scope.row.useDepartment | dicFilter(departments)}}</template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页部分 -->
          <div class="tableBottom">
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

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 选择员工框部分 -->
    <div class="tableRow">
      <el-dialog
        :visible.sync="dialogStaffTableVisible"
        width="70%"
        top="5vh"
        :modal-append-to-body="false"
      >
        <div>
          <!-- 筛选部分 -->
          <div
            style=" display: flex;justify-content: space-between;flex-wrap: wrap;margin-bottom:20px;"
          >
            <span>
              <span>员工名称：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQueryStaff.staffName" size="small" clearable></el-input>
              </span>
            </span>

            <span>
              <span>电话：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-input v-model="pageQueryStaff.phone" size="small" clearable></el-input>
              </span>
            </span>

            <span class="searchCol">
              <span>省份：</span>
              <span style="display: inline-block;max-width: 100px;">
                <el-select
                  v-model="pageQueryStaff.province"
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
              <span style="display: inline-block;max-width: 100px;">
                <el-select
                  v-model="pageQueryStaff.city"
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

            <span>
              <el-button
                @click="commonSearchStaff()"
                type="primary"
                icon="el-icon-search"
                size="small"
              >筛选</el-button>
            </span>
          </div>
          <!-- 表格部分 -->
          <div>
            <el-table
              v-loading="listLoading"
              element-loading-text="Loading"
              :data="staffList"
              ref="staffList"
              @selection-change="handleSelectionChangeStaff"
              @row-click="clickRowStaff"
              fit
              highlight-current-row
              height="320px"
            >
              <!-- <el-table-column type="selection" align="center" width="30"></el-table-column> -->

              <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

              <el-table-column property="staffName" label="员工名称" align="center"></el-table-column>

              <el-table-column property="phone" label="电话" align="center"></el-table-column>

              <el-table-column property="province" label="省份" align="center">
                <template slot-scope="scope">
                  <div style="width:100%  ;  height: 25px;
    overflow: hidden;">
                    <div
                      v-for="(name,index) in scope.row.province1"
                      :key="index"
                      v-show="scope.row.province1.length -1 != index"
                      style="    display: inline-block;
    vertical-align: top;"
                    >{{name+","}}</div>
                    <div
                      v-for="(name,index1) in scope.row.province1"
                      :key="index1"
                      v-show="scope.row.province1.length-1==index1"
                      style="    display: inline-block;
    vertical-align: top;"
                    >{{name}}</div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column property="city" label="城市" align="center">
                <template slot-scope="scope">{{scope.row.city | dicFilter(cityes)}}</template>
              </el-table-column>

              <el-table-column property="email" label="邮箱" align="center" width="180"></el-table-column>
            </el-table>
          </div>
          <!-- 分页部分 -->
          <div class="tableBottom">
            <div ref="paginationContainer" class="paginationContainer">
              <el-pagination
                small
                background
                prev-text="上一页"
                next-text="下一页"
                @size-change="handleSizeChangeStaff"
                @current-change="handleCurrentChangeStaff"
                :current-page="pageQueryStaff.page"
                :page-sizes="pageSizes"
                :page-size="pageQueryStaff.rows"
                layout="prev, pager, next, total, sizes, jumper"
                :total="pageQueryStaff.totalCount"
              ></el-pagination>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogStaffTableVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogConfirmStaff" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
// 获取所有字典/产品线对应的型号/省份对应的城市/图片上传
import {
  getAllDict,
  getModel,
  getCity,
  uploading,
  Monitoringoperation
} from "@/api/common";
// 获取所有员工
import { queryStaffList } from "@/api/userClassify";
// 验证序列号/添加派工单/查询客户管理列表/修改派工单信息（其中包括审核派单撤单结束）/验证序列号是否已报修
import {
  isExist,
  productRepairAdmin,
  queryAdminCustomerList,
  updApplyJob,
  checkDeviceExisAdmin
} from "@/api/clientServe";

export default {
  // 过滤显示
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    }
  },

  data() {
    // 手机号验证规则
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
      // 所以在前面加了一个+实现隐式转换
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("电话号码格式不正确"));
        }
      }
    };

    return {
      token: getToken(),
      // 图片上传地址
      imgHttp: this.$store.state.settings.socketURL + "/upload/image",
      // 图片回显地址
      imgURL: this.$store.state.settings.imgURL,
      // 图片列表
      imagesList: [],
      // 接收图片路径的数组
      imgURLList: [],
      // 视频标志
      videoFlag: false,
      // 视频列表
      vidoList: [],
      // 上传进度
      videoUploadPercent: 0,
      // 默认展开
      activeNames: ["1"],
      // 所有职务
      positions: [],
      // 所有科室
      departments: [],
      // 所有产品线
      productLines: [],
      // 是否禁用型号下拉
      disabledModel: true,
      // 产品线对应的型号下拉
      models: [],
      // 所有故障类型
      faultTypes: [],
      // 所有医院
      hospitals: [],
      // 所有申请类型
      applyTypes: [],
      // 所有省份
      provinces: [],
      // 是否禁用城市下拉
      disabledCity: true,
      // 省份对应的城市下拉
      citys: [],
      // 所有城市
      cityes: [],
      // 所有员工
      staffs: [],
      // 所有优先级
      prioritys: [],
      // 验证客户是否存在
      customerIdPD: "",
      // 提交的禁用按钮
      disabledSB: false,

      // 客户弹框
      dialogTableVisible: false,
      // 所有客户数据
      productMessageList: [],
      // 选中的客户数据
      multipleSelection: [],
      // 显示选中客户数据
      clientData: [],

      // 员工弹框
      dialogStaffTableVisible: false,
      // 所有员工数据
      staffList: [],
      // 选中的员工数据
      multipleSelectionStaff: [],
      // 显示选中员工数据
      staffData: [],

      // 表单数据
      form: {
        materielCode: "",

        // 客户id
        customerId: "",

        image: "",
        video: "",
        // id: "",
        province: "",
        city: "",
        // status: "4",
        applyType: "",

        staffId: "",
        staffName: "",
        priority: "",

        owner: "1",
        deviceId: "",
        productLine: "",
        model: "",
        faultType: "",
        hospital: "",
        department: "",
        contacts: "",
        phone: "",
        appointmentDate: "",
        faultDescribe: "",
        address: "",
        customerLevel: "",
        customerName: "",
        useDepartment: "",
        zipCode: "",
        applyType: "",
        // 图片相关
        hasNew: false,
        pictureFlag: "",
        lastRemoveUid: ""
      },

      //不能选择今天之前的
      // pickerOptions1: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
      //   }
      // },

      //   筛选客户数据
      pageQuery: {
        // 查询医院
        userType: "0",
        customerCode: "",
        customerName: "",
        province: "",
        city: "",

        totalCount: 0,
        page: 1,
        rows: 10
      },

      //   筛选员工数据
      pageQueryStaff: {
        // 查询员工
        staffName: "",
        phone: "",
        province: "",
        city: "",

        totalCount: 0,
        page: 1,
        rows: 10
      },

      listLoading: true,
      tableHeight: 250,
      pageSizes: [10, 20, 30],

      // 表单验证
      rules: {
        // 序列号证
        deviceId: [
          { required: true, message: "请输入序列号", trigger: "blur" }
        ],
        // 产品线验证
        productLine: [
          { required: true, message: "请选择产品线", trigger: "change" }
        ],
        // 型号验证
        model: [{ required: true, message: "请选择型号", trigger: "change" }],
        // 申请类型验证
        applyType: [
          { required: true, message: "请选择申请类型", trigger: "change" }
        ],
        // 故障类型验证
        faultType: [
          { required: true, message: "请选择故障类型", trigger: "change" }
        ],
        // 客户名称验证
        customerName: [
          { required: true, message: "请选择客户", trigger: "change" }
        ],
        // 联系人验证
        // contacts: [
        //   { required: true, message: "请输入联系人", trigger: "blur" }
        // ],
        // // 电话验证
        // phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 科室验证
        // department: [
        //   { required: true, message: "请选择科室", trigger: "change" }
        // ],
        // // 职务验证
        // position: [
        //   { required: true, message: "请选择职务", trigger: "change" }
        // ],
        // 预约时间验证
        appointmentDate: [
          { required: true, message: "请选择预约时间", trigger: "change" }
        ],
        // 物料编码
        materielCode: [
          { required: false, message: "请输入物料编码", trigger: "blur" }
        ],
        // 故障描述验证
        faultDescribe: [
          { required: true, message: "请输入故障描述", trigger: "blur" }
        ],
        // // 省份验证
        // province: [
        //   { required: true, message: "请选择省份", trigger: "change" }
        // ],
        // // 城市验证
        // city: [{ required: false, message: "请选择城市", trigger: "change" }],
        // 人员验证
        staffId: [{ required: true, message: "请选择人员", trigger: "change" }],
        // 优先级验证
        priority: [{ required: true, message: "请选优先级", trigger: "change" }]
      }
    };
  },
  mounted() {
    // 获取所有字典值
    this.fetchAllDict();
  },
  methods: {
    // 获取所有字典值
    fetchAllDict() {
      let data =
        "POSITION,DEPARTMENT,PRODUCT_LINE,EQUI_MODEL,FAULT_TYPE,APPLY_TYPE,PROVINCE,CITY,PRIORITY";
      getAllDict(data).then(res => {
        // 获取所有科室
        this.departments = res.data.DEPARTMENT;
        // 获取所有职务
        this.positions = res.data.POSITION;
        // 获取所有产品线
        this.productLines = res.data.PRODUCT_LINE;
        // 获取所有型号
        this.models = res.data.EQUI_MODEL;
        // 获取所有故障类型
        this.faultTypes = res.data.FAULT_TYPE;
        // 获取所有申请类型
        this.applyTypes = res.data.APPLY_TYPE;
        // 获取所有省份
        this.provinces = res.data.PROVINCE;
        // 获取所有城市
        this.cityes = res.data.CITY;
        // 获取所有优先级
        this.prioritys = res.data.PRIORITY;
      });
    },
    // 获取所有生产线对应的型号
    productLineChange(val) {
      // 清空型号
      this.form.model = "";
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
    // 获取所有省份对应的城市
    provinceChange(val) {
      // 清空城市
      this.pageQueryStaff.city = "";
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

    // 打开选择客户弹框
    selectClient() {
      this.dialogTableVisible = true;
      // 获取所有医院以及对应的值
      this.fetchListData();
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
    // 选中表格数据的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 点击整行选中
    clickRow(row) {
      // this.$refs.singleTable.setCurrentRow(row);
      this.$refs.productMessageList.clearSelection(row);
      this.$refs.productMessageList.toggleRowSelection(row);
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
    // 弹框确定
    dialogConfirm() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择客户！");
        return;
      }
      if (this.multipleSelection[0].id == this.customerIdPD) {
        // 客户id
        this.form.customerId = this.multipleSelection[0].id;

        this.form.address = this.multipleSelection[0].address;
        this.form.customerLevel = this.multipleSelection[0].customerLevel;
        this.form.customerName = this.multipleSelection[0].customerName;
        this.form.useDepartment = this.multipleSelection[0].useDepartment;
        this.form.zipCode = this.multipleSelection[0].zipCode;
        this.form.contacts = this.multipleSelection[0].contacts;
        this.form.phone = this.multipleSelection[0].phone;
        this.form.department = this.multipleSelection[0].useDepartment;

        this.clientData = this.multipleSelection;
        this.dialogTableVisible = false;
      } else if (this.customerIdPD == "") {
        this.$message.warning("请先输入序列号！");
        this.dialogTableVisible = false;
      } else {
        this.$message.warning("产品与客户不相符！您没有资格提报！");
      }
    },
    // // 获取所有客户名称
    // getHospital() {
    //   let data = {
    //     userType: "0"
    //   };
    //   queryAdminCustomerList(data).then(res => {
    //     this.hospitals = res.data.list;
    //   });
    // },
    // // 客户名称变化对应的值
    // hospitalChange(val) {
    //   let obj = {};
    //   obj = this.hospitals.find(item => {
    //     return item.customerName === val;
    //   });
    //   if (obj) {
    //     debugger;
    //     // 客户id
    //     this.form.customerId = obj.id;

    //     this.form.address = obj.address;
    //     this.form.customerLevel = obj.customerLevel;
    //     this.form.customerName = obj.customerName;
    //     this.form.useDepartment = obj.useDepartment;
    //     this.form.zipCode = obj.zipCode;
    //     this.form.contacts = obj.contacts;
    //     this.form.phone = obj.phone;
    //     this.form.department = obj.useDepartment;
    //   } else {
    //     this.form.address = "";
    //     this.form.customerLevel = "";
    //     this.form.customerName = "";
    //     this.form.useDepartment = "";
    //     this.form.zipCode = "";
    //     this.form.contacts = "";
    //     this.form.phone = "";
    //     this.form.department = "";
    //   }
    // },

    // // 获取所有省份对应的城市/省份变化获取所有员工
    // provinceChange(val) {
    //   // 清空城市
    //   this.form.city = "";
    //   this.form.staffId = "";
    //   this.form.staffName = "";
    //   this.form.priority = "";
    //   this.disabledCity = true;

    //   let obj = {};
    //   obj = this.provinces.find(item => {
    //     return item.value === val;
    //   });
    //   if (obj != undefined) {
    //     let data = obj.id;
    //     this.disabledCity = false;
    //     getCity(data).then(res => {
    //       if (JSON.stringify(res.data) != "{}") {
    //         this.citys = res.data.CITY;
    //       } else {
    //         this.citys = [];
    //       }
    //     });
    //   }

    //   let data = {
    //     province: this.form.province,
    //     city: this.form.city
    //   };
    //   queryStaffList(data).then(res => {
    //     this.staffs = res.data.list;
    //   });
    // },
    // // 城市变化获取所有员工
    // cityChange() {
    //   let data = {
    //     province: this.form.province,
    //     city: this.form.city
    //   };
    //   queryStaffList(data).then(res => {
    //     this.staffs = res.data.list;
    //   });
    // },
    // // 获取选中员工的信息
    // staffIdChange(val) {
    //   let obj = {};
    //   obj = this.staffs.find(item => {
    //     return item.staffId === val;
    //   });
    //   if (obj != undefined) {
    //     this.form.staffId = obj.staffId;
    //     this.form.staffName = obj.staffName;
    //   } else {
    //     this.form.staffId = "";
    //     this.form.staffName = "";
    //   }
    // },

    // 打开选择员工弹框
    selectStaff(n) {
      console.log(n+"888888888888")
      this.dialogStaffTableVisible = true;
      // 获取所有员工
      this.fetchStaffListData();
    },
    // 查询员工列表
    fetchStaffListData() {
      this.listLoading = true;
      let data = this.pageQueryStaff;
      queryStaffList(data).then(res => {
        let data = res.data.list;
        for (let i = 0; i <= data.length - 1; i++) {
          let arr = [];
          for (let j = 0; j <= data[i].province.split(",").length - 1; j++) {
            for (let m = 0; m <= this.provinces.length - 1; m++) {
              if (data[i].province.split(",")[j] == this.provinces[m].value) {
                arr.push(this.provinces[m].lable);
              }
            }
          }
          data[i].province1 = arr;
        }
        this.staffList = res.data.list;
        this.pageQueryStaff.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // pagesize 变化
    handleSizeChangeStaff(val) {
      // console.log(`每页 ${val} 条`);
      this.pageQueryStaff.page = 1;
      this.pageQueryStaff.rows = val;
      // 查询客户管理列表
      this.fetchStaffListData();
    },
    // 当前页变化
    handleCurrentChangeStaff(val) {
      this.pageQueryStaff.page = val;
      // 查询客户管理列表
      this.fetchStaffListData();
    },
    // 选中表格数据的方法
    handleSelectionChangeStaff(val) {
      this.multipleSelectionStaff = val;
    },
    // 点击整行选中
    clickRowStaff(row) {
      // this.$refs.singleTable.setCurrentRow(row);
      this.$refs.staffList.clearSelection(row);
      this.$refs.staffList.toggleRowSelection(row);
    },
    // 筛选的方法
    commonSearchStaff() {
      this.listLoading = true;
      let data = this.pageQueryStaff;
      queryStaffList(data).then(res => {
        this.staffList = res.data.list;
        this.pageQueryStaff.totalCount = res.data.total;
        this.listLoading = false;
      });
    },
    // 弹框确定
    dialogConfirmStaff() {
      if (this.multipleSelectionStaff.length == 0) {
        this.$message.warning("请选择员工！");
        return;
      }
      // 客户id
      this.form.staffId = this.multipleSelectionStaff[0].staffId;
      this.form.staffName = this.multipleSelectionStaff[0].staffName;

      this.staffData = this.multipleSelectionStaff;
      this.dialogStaffTableVisible = false;
    },

    // 重置的方法
    resetForm() {
      this.form = {
        image: "",
        video: "",
        // id: "",
        province: "",
        city: "",
        // status: "4",
        applyType: "",
        staffId: "",
        staffName: "",
        priority: "",

        owner: "1",
        deviceId: "",
        productLine: "",
        model: "",
        faultType: "",
        hospital: "",
        department: "",
        contacts: "",
        phone: "",
        appointmentDate: "",
        faultDescribe: "",
        address: "",
        customerLevel: "",
        customerName: "",
        useDepartment: "",
        zipCode: "",
        applyType: "",
        // 图片相关
        hasNew: false,
        pictureFlag: ""
      };
    },
    // 验证序列号
    setDeviceId() {
      let data = { deviceId: this.form.deviceId };
      this.customerIdPD = "";
      this.form.productLine = "";
      this.form.model = "";
      // 客户id
      this.form.customerId = "";
      this.form.address = "";
      this.form.customerLevel = "";
      this.form.customerName = "";
      this.form.useDepartment = "";
      this.form.zipCode = "";
      this.form.contacts = "";
      this.form.phone = "";
      this.form.department = "";
      this.clientData = [];
      isExist(data)
        .then(res => {
          this.customerIdPD = res.data.customerId;
          // this.$message.success(res.msg);
          this.form.productLine = res.data.productLine;
          this.form.model = res.data.model;

          // 客户id
          this.form.customerId = res.data.customerId;

          this.form.address = res.data.address;
          this.form.customerLevel = res.data.customerLevel;
          this.form.customerName = res.data.customerName;
          this.form.useDepartment = res.data.useDepartment;
          this.form.zipCode = res.data.zipCode;
          this.form.contacts = res.data.contacts;
          this.form.phone = res.data.phone;
          this.form.department = res.data.useDepartment;

          this.clientData.push(res.data);
        })
        .catch(err => {
          this.form.deviceId = "";
        });
    },
    // 移除图片前
    beforeRemove(file, filelist) {
      if (file.uid == this.lastRemoveUid) {
        return false;
      }
      this.lastRemoveUid = file.uid;
    },
    change(e){

      this.$forceUpdate()
    },
    // 移除图片
    removeImg(file, fileList) {
      this.form.pictureFlag = "";
      this.form.hasNew = false;
      for (let f of fileList) {
        this.form.pictureFlag = "1";
        if (f.status != "success") {
          this.form.hasNew = true;
          break;
        }
      }
      this.imagesList = fileList;
      if (this.imagesList.length == 0) {
        this.imgURLList = [];
      }
    },
    // 图片超出限制
    exceedAstrict() {
      this.$message.warning("最多只能上传3张图片哦!");
    },
    // 验证上传图片文件
    beforeUploadImg(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (["image/jpeg", "image/jpg", "image/png"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的图片格式哦!");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过10MB哦!");
        return false;
      }
      return true;
    },
    // 图片列表变化
    fileChange(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        file.name.lastIndexOf(".jpeg") == -1 &&
        file.name.lastIndexOf(".jpg") == -1 &&
        file.name.lastIndexOf(".png") == -1
      ) {
        this.$message.error("请上传正确的图片格式哦!");
        this.imagesList = [];
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过10MB哦!");
        this.imagesList = [];
        return false;
      }

      this.form.pictureFlag = "";
      this.form.hasNew = false;
      for (let f of fileList) {
        this.form.pictureFlag = "1";
        if (f.status != "success") {
          this.form.hasNew = true;
          break;
        }
      }
    },
    // 上传图片成功
    fileUploadSuccess(res, file, fileList) {
      this.imgURLList.push(res.data);
      if (this.imgURLList.length == fileList.length) {
        this.form.image = this.imgURLList.join(",");
        this.submitInfo(this.form);
      }
    },

    // 视频上传成功
    handleVideoSuccess(res, file) {
      // 禁用上传按钮
      this.disabledSB = false;
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.code == 200) {
        this.form.video = res.data[0];
        this.videoFlag = false;
        this.vidoList = [];
      } else {
        this.$message.error("视频上传失败，请重新上传！");
        return false;
      }
    },
    // 验证上传视频文件
    beforeUploadVideo(file) {
      // 禁用上传按钮
      this.disabledSB = true;

      const isLt50M = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        // 禁用上传按钮
        this.disabledSB = false;
        return false;
      }
      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过10MB哦!");
        // 禁用上传按钮
        this.disabledSB = false;
        return false;
      }
    },

    // 上传进度显示
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = Number(file.percentage.toFixed(0));
    },
    // 移除当前视频
    delVideo() {
      this.$confirm("此操作将移除当前视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.video = "";
          this.videoFlag = false;
          this.vidoList = [];
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    // 添加派工单保存
    submitForm(form) {
      let _this = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          if (_this.form.hasNew) {
            _this.$refs.upload.submit();
          } else {
            let arr = [];
            for (let x of _this.$refs.upload.fileList) {
              arr.push(x.name);
            }
            _this.form.image = arr.join(",");
            _this.submitInfo(_this.form);
          }
        } else {
          return false;
        }
      });
    },
    submitInfo(data) {
      delete data["pictureFlag"];

      checkDeviceExisAdmin(data).then(res => {
        if (res.data.result == false) {
          this.$message.warning(res.data.message);
          return;
        }
        let data = this.form;
        productRepairAdmin(data).then(res => {
          let pagt = {
            groupId: res.data.groupId, //添加派工单历史记录   必填
            name: this.$store.state.name, //操作人姓名   姓名
            type: "后台员工工单", //操作人类型   员工   还是管理员
            operation: "提报工单", //具体操作  审核  ，  撤销 ，  通过    派单
            operationRemarks: "", //操作备注
            examine: "", //审核是否通过
            examineRemarks: "" //审核备注
          };
          Monitoringoperation(pagt).then(res => {});
          this.$message.success(res.data.message);
          this.$router.push({
            name: "StaffRepairs"
          });
        });
      });
    },

    // 返回的方法
    returnBtn() {
      this.$router.push({
        name: "StaffRepairs"
      });
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

