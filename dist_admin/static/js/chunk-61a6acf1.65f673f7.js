(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61a6acf1"],{"0a49":function(t,e,n){var r=n("9b43"),a=n("626a"),o=n("4bf8"),i=n("9def"),u=n("cd1c");t.exports=function(t,e){var n=1==t,c=2==t,s=3==t,l=4==t,d=6==t,p=5==t||d,f=e||u;return function(e,u,m){for(var h,y,b=o(e),v=a(b),g=r(u,m,3),O=i(v.length),j=0,I=n?f(e,O):c?f(e,0):void 0;O>j;j++)if((p||j in v)&&(h=v[j],y=g(h,j,b),t))if(n)I[j]=y;else if(y)switch(t){case 3:return!0;case 5:return h;case 6:return j;case 2:I.push(h)}else if(l)return!1;return d?-1:s||l?l:I}}},1:function(t,e){},1169:function(t,e,n){var r=n("2d95");t.exports=Array.isArray||function(t){return"Array"==r(t)}},2:function(t,e){},"20d6":function(t,e,n){"use strict";var r=n("5ca1"),a=n("0a49")(6),o="findIndex",i=!0;o in[]&&Array(1)[o]((function(){i=!1})),r(r.P+r.F*i,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(o)},2934:function(t,e,n){"use strict";n.d(e,"e",(function(){return a})),n.d(e,"b",(function(){return o})),n.d(e,"n",(function(){return i})),n.d(e,"m",(function(){return u})),n.d(e,"o",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return l})),n.d(e,"g",(function(){return d})),n.d(e,"h",(function(){return p})),n.d(e,"k",(function(){return f})),n.d(e,"i",(function(){return m})),n.d(e,"j",(function(){return h})),n.d(e,"a",(function(){return y})),n.d(e,"l",(function(){return b})),n.d(e,"d",(function(){return v}));var r=n("b775");function a(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=".concat(t),method:"post"})}function o(t){return Object(r["a"])({url:"/dicCode/addDicCode",method:"post",data:t})}function i(t){return Object(r["a"])({url:"/dicCode/queryDicValueByType",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/dicCode/queryDicById",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/dicCode/updateDicCode",method:"post",data:t})}function s(t){return Object(r["a"])({url:"/dicCode/deleteDicCode",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=CITY&parentId=".concat(t),method:"post"})}function d(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=district&parentId=".concat(t),method:"post"})}function p(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=EQUI_MODEL&parentId=".concat(t),method:"post"})}function f(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=PARTS_TYPE_TWO&parentId=".concat(t),method:"post"})}function m(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=PARTS_TYPE_THREE&parentId=".concat(t),method:"post"})}function h(t){return Object(r["a"])({url:"/dicCode/getList?types=".concat(t),method:"post"})}function y(t){return Object(r["a"])({url:"/applyJob/addApplyRecord",method:"post",data:t})}function b(t){return Object(r["a"])({url:"/applyJob/queryApplyJobGroup",method:"post",data:t})}function v(t){return Object(r["a"])({url:"/excel/uploadExcel",method:"post",data:t})}},3:function(t,e){},"350a":function(t,e,n){"use strict";n.d(e,"y",(function(){return a})),n.d(e,"r",(function(){return o})),n.d(e,"f",(function(){return i})),n.d(e,"t",(function(){return u})),n.d(e,"x",(function(){return c})),n.d(e,"Q",(function(){return s})),n.d(e,"h",(function(){return l})),n.d(e,"L",(function(){return d})),n.d(e,"K",(function(){return p})),n.d(e,"u",(function(){return f})),n.d(e,"d",(function(){return m})),n.d(e,"D",(function(){return h})),n.d(e,"S",(function(){return y})),n.d(e,"j",(function(){return b})),n.d(e,"I",(function(){return v})),n.d(e,"e",(function(){return g})),n.d(e,"H",(function(){return O})),n.d(e,"T",(function(){return j})),n.d(e,"k",(function(){return I})),n.d(e,"B",(function(){return _})),n.d(e,"q",(function(){return S})),n.d(e,"s",(function(){return w})),n.d(e,"A",(function(){return C})),n.d(e,"R",(function(){return L})),n.d(e,"i",(function(){return A})),n.d(e,"z",(function(){return k})),n.d(e,"J",(function(){return T})),n.d(e,"M",(function(){return x})),n.d(e,"n",(function(){return Q})),n.d(e,"N",(function(){return D})),n.d(e,"O",(function(){return B})),n.d(e,"G",(function(){return E})),n.d(e,"p",(function(){return P})),n.d(e,"C",(function(){return q})),n.d(e,"V",(function(){return $})),n.d(e,"m",(function(){return z})),n.d(e,"F",(function(){return G})),n.d(e,"o",(function(){return R})),n.d(e,"E",(function(){return F})),n.d(e,"U",(function(){return J})),n.d(e,"l",(function(){return N})),n.d(e,"v",(function(){return M})),n.d(e,"c",(function(){return U})),n.d(e,"w",(function(){return Y})),n.d(e,"P",(function(){return H})),n.d(e,"g",(function(){return W})),n.d(e,"b",(function(){return V})),n.d(e,"a",(function(){return K}));var r=n("b775");function a(t){return Object(r["a"])({url:"/applyJob/queryApplyJobGroupList",method:"post",data:t})}function o(t){return Object(r["a"])({url:"/applyJob/isExist",method:"post",data:t})}function i(t){return Object(r["a"])({url:"/applyJob/checkDeviceExisAdmin",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/applyJob/productRepairAdmin",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/applyJob/queryApplyJob",method:"post",data:t})}function s(t){return Object(r["a"])({url:"/applyJob/updApplyJobInfo",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/applyJob/delApplyJobInfo?ids=".concat(t),method:"post"})}function d(t){return Object(r["a"])({url:"/serviceEvaluate/queryServiceEvaluate",method:"post",data:t})}function p(t){return Object(r["a"])({url:"reportType/queryReportByGroupId?assignId=".concat(t),method:"post"})}function f(t){return Object(r["a"])({url:"/customerAdmin/queryAdminCustomerList",method:"post",data:t})}function m(t){return Object(r["a"])({url:"/customerAdmin/addCustomerInfoById",method:"post",data:t})}function h(t){return Object(r["a"])({url:"/customerAdmin/queryCustomernfoById",method:"post",data:t})}function y(t){return Object(r["a"])({url:"/customerAdmin/updCustomerInfoById",method:"post",data:t})}function b(t){return Object(r["a"])({url:"/customerAdmin/delCustomerInfo?ids=".concat(t),method:"post"})}function v(t){return Object(r["a"])({url:"/productInfo/queryProductInfoList",method:"post",data:t})}function g(t){return Object(r["a"])({url:"/productInfo/addProductInfo",method:"post",data:t})}function O(t){return Object(r["a"])({url:"/productInfo/queryProductInfoById",method:"post",data:t})}function j(t){return Object(r["a"])({url:"/productInfo/updProductInfoById",method:"post",data:t})}function I(t){return Object(r["a"])({url:"/productInfo/delProductInfo?ids=".concat(t),method:"post"})}function _(t){return Object(r["a"])({url:"/productArchives/queryArchivesListNew",method:"post",data:t})}function S(t){return Object(r["a"])({url:"/productArchives/insertProductArchivesNew",method:"post",data:t})}function w(t){return Object(r["a"])({url:"/productArchives/isExist",method:"post",data:t})}function C(t){return Object(r["a"])({url:"/productArchives/queryArchivesDetailNew",method:"post",data:t})}function L(t){return Object(r["a"])({url:"/productArchives/updArchivesInfoNew",method:"post",data:t})}function A(t){return Object(r["a"])({url:"/productArchives/delArchivesInfo?ids=".concat(t),method:"post"})}function k(t){return Object(r["a"])({url:"/productArchives/queryArchivesDetail",method:"post",data:t})}function T(t){return Object(r["a"])({url:"/customerService/queryRecordsList",method:"post",data:t})}function x(t){return Object(r["a"])({url:"/customerService/replyById",method:"post",data:t})}function Q(t){return Object(r["a"])({url:"/customerService/deteteConsulting?ids=".concat(t),method:"post"})}function D(t){return Object(r["a"])({url:"/customerService/replyContent",method:"post",data:t})}function B(t){return Object(r["a"])({url:"/checkcenter/socket/push/".concat(t),method:"post"})}function E(t){return Object(r["a"])({url:"/partsBuy/queryPartsList",method:"post",data:t})}function P(t){return Object(r["a"])({url:"/partsBuy/insertPartsBuy",method:"post",data:t})}function q(t){return Object(r["a"])({url:"/partsBuy/queryBuyInfoById",method:"post",data:t})}function $(t){return Object(r["a"])({url:"/partsBuy/updatePartsBuyById",method:"post",data:t})}function z(t){return Object(r["a"])({url:"/partsBuy/deletePartdBuyById?ids=".concat(t),method:"post"})}function G(t){return Object(r["a"])({url:"/repairSkillGuidance/queryGuidanceList",method:"post",data:t})}function R(t){return Object(r["a"])({url:"/repairSkillGuidance/insertGuidance",method:"post",data:t})}function F(t){return Object(r["a"])({url:"/repairSkillGuidance/queryGuidanceInfoById",method:"post",data:t})}function J(t){return Object(r["a"])({url:"/repairSkillGuidance/updateGuidance",method:"post",data:t})}function N(t){return Object(r["a"])({url:"/repairSkillGuidance/deleteGiudance?ids=".concat(t),method:"post"})}function M(t){return Object(r["a"])({url:"/afterServicePic/queryAfterService",method:"post",data:t})}function U(t){return Object(r["a"])({url:"/afterServicePic/addAfterService",method:"post",data:t})}function Y(t){return Object(r["a"])({url:"/afterServicePic/queryAfterServiceInfoById",method:"post",data:t})}function H(t){return Object(r["a"])({url:"/afterServicePic/updAfterServiceInfoById",method:"post",data:t})}function W(t){return Object(r["a"])({url:"/afterServicePic/delAfterServiceInfo?ids=".concat(t),method:"post"})}function V(t){return Object(r["a"])({url:"/applyJob/queryGroupAndStaffInfoByGroupId",method:"post",data:t})}function K(t){return Object(r["a"])({url:"/applyJob/queryGroupHistoryByGroupId",method:"post",data:t})}},7514:function(t,e,n){"use strict";var r=n("5ca1"),a=n("0a49")(5),o="find",i=!0;o in[]&&Array(1)[o]((function(){i=!1})),r(r.P+r.F*i,"Array",{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(o)},"98c5":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"pageContainer",staticClass:"pageContainer"},[n("div",{ref:"pageSearch",staticClass:"pageSearch"},[n("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[n("el-collapse-item",{attrs:{title:"结果筛选",name:"1"}},[n("div",{staticClass:"searchRow"},[n("span",[n("span",[t._v("拥有者：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{placeholder:"请选择",size:"small",clearable:""},model:{value:t.pageQuery.owner,callback:function(e){t.$set(t.pageQuery,"owner",e)},expression:"pageQuery.owner"}},t._l(t.owners,(function(t){return n("el-option",{key:t.id,attrs:{label:t.lable,value:t.value}})})),1)],1)]),n("span",[n("span",[t._v("产品线：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{placeholder:"请选择",size:"small",clearable:""},on:{change:t.productLineChange},model:{value:t.pageQuery.productLine,callback:function(e){t.$set(t.pageQuery,"productLine",e)},expression:"pageQuery.productLine"}},t._l(t.productLines,(function(t){return n("el-option",{key:t.id,attrs:{label:t.lable,value:t.value}})})),1)],1)]),n("span",[n("span",[t._v("型号：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{disabled:t.disabledModel,placeholder:"请选择",size:"small",clearable:""},model:{value:t.pageQuery.model,callback:function(e){t.$set(t.pageQuery,"model",e)},expression:"pageQuery.model"}},t._l(t.models,(function(t){return n("el-option",{key:t.id,attrs:{label:t.lable,value:t.value}})})),1)],1)]),n("span",[n("span",[t._v("指引类型：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{placeholder:"请选择",size:"small",clearable:""},model:{value:t.pageQuery.type,callback:function(e){t.$set(t.pageQuery,"type",e)},expression:"pageQuery.type"}},t._l(t.types,(function(t){return n("el-option",{key:t.id,attrs:{label:t.lable,value:t.value}})})),1)],1)]),n("span",[n("span",[t._v("文件格式：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{placeholder:"请选择",size:"small",clearable:""},model:{value:t.pageQuery.format,callback:function(e){t.$set(t.pageQuery,"format",e)},expression:"pageQuery.format"}},t._l(t.formats,(function(t){return n("el-option",{key:t.id,attrs:{label:t.lable,value:t.value}})})),1)],1)]),n("span",[n("span",[t._v("开始时间：")]),n("span",[n("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"开始时间",size:"small"},model:{value:t.pageQuery.startTime,callback:function(e){t.$set(t.pageQuery,"startTime",e)},expression:"pageQuery.startTime"}})],1)]),n("span",[n("span",[t._v("结束时间：")]),n("span",[n("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"结束时间",size:"small"},model:{value:t.pageQuery.endTime,callback:function(e){t.$set(t.pageQuery,"endTime",e)},expression:"pageQuery.endTime"}})],1)]),n("span",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.commonSearch()}}},[t._v("筛选")]),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.emptySearch()}}},[t._v("清空筛选")]),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.excelBtn()}}},[t._v("批量导出")])],1)])])],1)],1),n("div",{staticClass:"tableRow"},[n("div",{staticClass:"tableTitle"},[t._m(0),n("span",[n("el-button",{attrs:{type:"success",icon:"el-icon-plus",size:"small"},on:{click:function(e){return t.toAddPage()}}},[t._v("添加技能指引")])],1)]),n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"serviceGuideList",attrs:{"element-loading-text":"Loading",data:t.serviceGuideList,fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",align:"center",width:"30"}}),n("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"60"}}),n("el-table-column",{attrs:{property:"productLine",label:"产品线",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("dicFilter")(e.row.productLine,t.productLines)))]}}])}),n("el-table-column",{attrs:{property:"model",label:"型号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("dicFilter")(e.row.model,t.models)))]}}])}),n("el-table-column",{attrs:{property:"type",label:"指引类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("dicFilter")(e.row.type,t.types)))]}}])}),n("el-table-column",{attrs:{property:"thumbnail",label:"图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("img",{directives:[{name:"show",rawName:"v-show",value:""!=e.row.picture,expression:"scope.row.picture != ''"}],staticStyle:{width:"50px",height:"50px"},attrs:{src:t.imgURL+e.row.picture.split(",")[0]}})]}}])}),n("el-table-column",{attrs:{property:"title",label:"标题",align:"center"}}),n("el-table-column",{attrs:{property:"addTime",label:"创建时间",align:"center"}}),n("el-table-column",{attrs:{label:"查看详情",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.toDetailsPage(e.row)}}},[t._v("查看")])]}}])}),n("el-table-column",{attrs:{align:"center",label:"管理",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit-outline"},on:{click:function(n){return t.toEditPage(e.row)}}}),n("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-delete"},on:{click:function(n){return t.handleDelete(e.row)}}})]}}])})],1)],1),n("div",{staticClass:"tableBottom"},[n("div",[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.allSelect()}}},[t._v("全选")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.reverseSelect(t.serviceGuideList)}}},[t._v("反选")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.cancelSelect()}}},[t._v("全不选")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.batchHandleDelete()}}},[t._v("批量删除")])],1),n("div",{ref:"paginationContainer",staticClass:"paginationContainer"},[n("el-pagination",{attrs:{small:"",background:"","prev-text":"上一页","next-text":"下一页","current-page":t.pageQuery.page,"page-sizes":t.pageSizes,"page-size":t.pageQuery.rows,layout:"prev, pager, next, total, sizes, jumper",total:t.pageQuery.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("i",{staticClass:"el-icon-news"}),n("span",[t._v("维修技能指引列表")])])}],o=(n("ac6a"),n("7514"),n("20d6"),n("2934")),i=n("350a"),u=n("1146"),c=n.n(u),s={filters:{dicFilter:function(t,e){var n=e.findIndex((function(e){return t==e.value}));return n>-1?e[n].lable:t}},data:function(){return{imgURL:this.$store.state.settings.imgURL,activeNames:["1"],owners:[{children:[],defaultImage:"",id:"155",lable:"全部",page:1,parentId:"",remarks:"拥有者",rows:10,sort:"0",type:"OWNER",value:""},{children:[],defaultImage:"",id:"156",lable:"客户",page:1,parentId:"",remarks:"拥有者",rows:10,sort:"0",type:"OWNER",value:"0,2"},{children:[],defaultImage:"",id:"157ewqe",lable:"员工",page:1,parentId:"",remarks:"拥有者",rows:10,sort:"0",type:"OWNER",value:"1,2"}],productLines:[],disabledModel:!0,models:[],types:[],formats:[],serviceGuideList:[],multipleSelection:[],pageQuery:{owner:"",productLine:"",model:"",type:"",format:"",totalCount:0,page:1,rows:10,startTime:"",endTime:""},listLoading:!0,tableHeight:250,pageSizes:[10,20,30]}},mounted:function(){this.fetchAllDict(),this.fetchListData()},methods:{fetchAllDict:function(){var t=this,e="PRODUCT_LINE,EQUI_MODEL,DIRECT_TYPE,FORMAT_TYPE,OWNER";Object(o["e"])(e).then((function(e){t.productLines=e.data.PRODUCT_LINE,t.models=e.data.EQUI_MODEL,t.types=e.data.DIRECT_TYPE,t.formats=e.data.FORMAT_TYPE}))},productLineChange:function(t){var e=this;this.pageQuery.model="",this.disabledModel=!0;var n={};if(n=this.productLines.find((function(e){return e.value===t})),void 0!=n){var r=n.id;this.disabledModel=!1,Object(o["h"])(r).then((function(t){"{}"!=JSON.stringify(t.data)?e.models=t.data.EQUI_MODEL:e.models=[]}))}},fetchListData:function(){var t=this;this.listLoading=!0;var e=this.pageQuery;Object(i["F"])(e).then((function(e){t.serviceGuideList=e.data.list,t.pageQuery.totalCount=e.data.total,t.listLoading=!1}))},handleSizeChange:function(t){this.pageQuery.page=1,this.pageQuery.rows=t,this.fetchListData()},handleCurrentChange:function(t){this.pageQuery.page=t,this.fetchListData()},commonSearch:function(){var t=this;this.listLoading=!0;var e=this.pageQuery;Object(i["F"])(e).then((function(e){t.serviceGuideList=e.data.list,t.pageQuery.totalCount=e.data.total,t.listLoading=!1}))},emptySearch:function(){this.pageQuery={owner:"",productLine:"",model:"",type:"",format:"",totalCount:0,page:1,rows:10,startTime:"",endTime:""},this.disabledModel=!0,this.fetchListData()},handleSelectionChange:function(t){this.multipleSelection=t},allSelect:function(){this.$refs.serviceGuideList.toggleAllSelection()},cancelSelect:function(){this.$refs.serviceGuideList.clearSelection()},reverseSelect:function(t){var e=this;t&&t.forEach((function(t){e.$refs.serviceGuideList.toggleRowSelection(t)}))},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n=t.id;Object(i["l"])(n).then((function(t){e.$message.success(t.data),e.fetchListData()}))})).catch((function(){e.$message.info("已取消删除")}))},batchHandleDelete:function(){var t=this;0==this.multipleSelection.length?this.$message.warning("请选择要删除的数据"):this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var e=[];t.multipleSelection.forEach((function(t){e.push(t.id)}));var n=e.toString();Object(i["l"])(n).then((function(e){t.$message.success(e.data),t.fetchListData()}))})).catch((function(){t.$message.info("已取消删除")}))},excelBtn:function(){var t=this,e=[["产品线","型号","指引类型","标题","创建时间"]];if(0==this.multipleSelection.length)this.pageQuery.rows=1e5,Object(i["F"])(this.pageQuery).then((function(n){t.pageQuery.rows=10,n.data.list.map((function(n){var r=[];r.push(t.$options.filters.dicFilter(n.productLine,t.productLines)),r.push(t.$options.filters.dicFilter(n.model,t.models)),r.push(t.$options.filters.dicFilter(n.type,t.types)),r.push(n.title),r.push(n.addTime),e.push(r)}));var r=c.a.utils.book_new(),a=c.a.utils.aoa_to_sheet(e);c.a.utils.book_append_sheet(r,a,"维修技能指引列表"),c.a.writeFile(r,"维修技能指引列表.xlsx")}));else{this.multipleSelection.map((function(n){var r=[];r.push(t.$options.filters.dicFilter(n.productLine,t.productLines)),r.push(t.$options.filters.dicFilter(n.model,t.models)),r.push(t.$options.filters.dicFilter(n.type,t.types)),r.push(n.title),r.push(n.addTime),e.push(r)}));var n=c.a.utils.book_new(),r=c.a.utils.aoa_to_sheet(e);c.a.utils.book_append_sheet(n,r,"维修技能指引列表"),c.a.writeFile(n,"维修技能指引列表.xlsx")}},toAddPage:function(){this.$router.push({name:"AddSkill"})},toEditPage:function(t){var e=t.id;this.$router.push({name:"EditSkill",query:{sendData:e}})},toDetailsPage:function(t){var e=t.id;this.$router.push({name:"DetailsPageSG",query:{sendData:e}})}},destroyed:function(){window.onresize=null}},l=s,d=n("2877"),p=Object(d["a"])(l,r,a,!1,null,null,null);e["default"]=p.exports},cd1c:function(t,e,n){var r=n("e853");t.exports=function(t,e){return new(r(t))(e)}},e853:function(t,e,n){var r=n("d3f4"),a=n("1169"),o=n("2b4c")("species");t.exports=function(t){var e;return a(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)||(e=void 0),r(e)&&(e=e[o],null===e&&(e=void 0))),void 0===e?Array:e}}}]);