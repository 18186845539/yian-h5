(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75da7ec2"],{"02f4":function(t,e,n){var r=n("4588"),a=n("be13");t.exports=function(t){return function(e,n){var i,o,c=String(a(e)),u=r(n),s=c.length;return u<0||u>=s?t?"":void 0:(i=c.charCodeAt(u),i<55296||i>56319||u+1===s||(o=c.charCodeAt(u+1))<56320||o>57343?t?c.charAt(u):i:t?c.slice(u,u+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0a49":function(t,e,n){var r=n("9b43"),a=n("626a"),i=n("4bf8"),o=n("9def"),c=n("cd1c");t.exports=function(t,e){var n=1==t,u=2==t,s=3==t,l=4==t,f=6==t,d=5==t||f,p=e||c;return function(e,c,h){for(var v,g,y=i(e),m=a(y),b=r(c,h,3),x=o(m.length),C=0,O=n?p(e,x):u?p(e,0):void 0;x>C;C++)if((d||C in m)&&(v=m[C],g=b(v,C,y),t))if(n)O[C]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return C;case 2:O.push(v)}else if(l)return!1;return f?-1:s||l?l:O}}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"0cc0":function(t,e,n){"use strict";n.d(e,"i",(function(){return a})),n.d(e,"m",(function(){return i})),n.d(e,"h",(function(){return o})),n.d(e,"p",(function(){return c})),n.d(e,"d",(function(){return u})),n.d(e,"g",(function(){return s})),n.d(e,"l",(function(){return l})),n.d(e,"f",(function(){return f})),n.d(e,"o",(function(){return d})),n.d(e,"c",(function(){return p})),n.d(e,"k",(function(){return h})),n.d(e,"a",(function(){return v})),n.d(e,"j",(function(){return g})),n.d(e,"q",(function(){return y})),n.d(e,"n",(function(){return m})),n.d(e,"e",(function(){return b})),n.d(e,"b",(function(){return x}));var r=n("b775");function a(t){return Object(r["a"])({url:"/hospital/queryHospitalList",method:"post",data:t})}function i(t){return Object(r["a"])({url:"/hospital/registerHospital",method:"post",data:t})}function o(t){return Object(r["a"])({url:"/hospital/queryHospitalInfoById",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/hospital/updHospitalInfoById",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/hospital/delHospitalInfo?ids=".concat(t),method:"post"})}function s(t){return Object(r["a"])({url:"/channel/queryChannelList",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/channel/registerChannel",method:"post",data:t})}function f(t){return Object(r["a"])({url:"/channel/queryChannelInfoById",method:"post",data:t})}function d(t){return Object(r["a"])({url:"/channel/updChannelInfoById",method:"post",data:t})}function p(t){return Object(r["a"])({url:"/channel/delChannelInfo?ids=".concat(t),method:"post"})}function h(t){return Object(r["a"])({url:"/staff/queryStaffList",method:"post",data:t})}function v(t){return Object(r["a"])({url:"/staff/addStaffInfo",method:"post",data:t})}function g(t){return Object(r["a"])({url:"/staff/queryStaffInfoById",method:"post",data:t})}function y(t){return Object(r["a"])({url:"/staff/updStaffInfoById",method:"post",data:t})}function m(t){return Object(r["a"])({url:"/staff/resetPassword",method:"post",data:t})}function b(t){return Object(r["a"])({url:"/staff/delStaffInfo?ids=".concat(t),method:"post"})}function x(t){return Object(r["a"])({url:"/admin/isExist",method:"post",data:t})}},1:function(t,e){},1169:function(t,e,n){var r=n("2d95");t.exports=Array.isArray||function(t){return"Array"==r(t)}},2:function(t,e){},"20d6":function(t,e,n){"use strict";var r=n("5ca1"),a=n("0a49")(6),i="findIndex",o=!0;i in[]&&Array(1)[i]((function(){o=!1})),r(r.P+r.F*o,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(i)},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),a=n("32e9"),i=n("79e5"),o=n("be13"),c=n("2b4c"),u=n("520a"),s=c("species"),l=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var d=c(t),p=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),h=p?!i((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[s]=function(){return n}),n[d](""),!e})):void 0;if(!p||!h||"replace"===t&&!l||"split"===t&&!f){var v=/./[d],g=n(o,d,""[t],(function(t,e,n,r,a){return e.exec===u?p&&!a?{done:!0,value:v.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),y=g[0],m=g[1];r(String.prototype,t,y),a(RegExp.prototype,d,2==e?function(t,e){return m.call(t,this,e)}:function(t){return m.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var r=n("aae3"),a=n("cb7c"),i=n("ebd6"),o=n("0390"),c=n("9def"),u=n("5f1b"),s=n("520a"),l=n("79e5"),f=Math.min,d=[].push,p="split",h="length",v="lastIndex",g=4294967295,y=!l((function(){RegExp(g,"y")}));n("214f")("split",2,(function(t,e,n,l){var m;return m="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[h]||2!="ab"[p](/(?:ab)*/)[h]||4!="."[p](/(.?)(.?)/)[h]||"."[p](/()()/)[h]>1||""[p](/.?/)[h]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(a,t,e);var i,o,c,u=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,p=void 0===e?g:e>>>0,y=new RegExp(t.source,l+"g");while(i=s.call(y,a)){if(o=y[v],o>f&&(u.push(a.slice(f,i.index)),i[h]>1&&i.index<a[h]&&d.apply(u,i.slice(1)),c=i[0][h],f=o,u[h]>=p))break;y[v]===i.index&&y[v]++}return f===a[h]?!c&&y.test("")||u.push(""):u.push(a.slice(f)),u[h]>p?u.slice(0,p):u}:"0"[p](void 0,0)[h]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):m.call(String(a),n,r)},function(t,e){var r=l(m,t,this,e,m!==n);if(r.done)return r.value;var s=a(t),d=String(this),p=i(s,RegExp),h=s.unicode,v=(s.ignoreCase?"i":"")+(s.multiline?"m":"")+(s.unicode?"u":"")+(y?"y":"g"),b=new p(y?s:"^(?:"+s.source+")",v),x=void 0===e?g:e>>>0;if(0===x)return[];if(0===d.length)return null===u(b,d)?[d]:[];var C=0,O=0,S=[];while(O<d.length){b.lastIndex=y?O:0;var j,w=u(b,y?d:d.slice(O));if(null===w||(j=f(c(b.lastIndex+(y?0:O)),d.length))===C)O=o(d,O,h);else{if(S.push(d.slice(C,O)),S.length===x)return S;for(var k=1;k<=w.length-1;k++)if(S.push(w[k]),S.length===x)return S;O=C=j}}return S.push(d.slice(C)),S}]}))},2934:function(t,e,n){"use strict";n.d(e,"e",(function(){return a})),n.d(e,"b",(function(){return i})),n.d(e,"n",(function(){return o})),n.d(e,"m",(function(){return c})),n.d(e,"o",(function(){return u})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return l})),n.d(e,"g",(function(){return f})),n.d(e,"h",(function(){return d})),n.d(e,"k",(function(){return p})),n.d(e,"i",(function(){return h})),n.d(e,"j",(function(){return v})),n.d(e,"a",(function(){return g})),n.d(e,"l",(function(){return y})),n.d(e,"d",(function(){return m}));var r=n("b775");function a(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=".concat(t),method:"post"})}function i(t){return Object(r["a"])({url:"/dicCode/addDicCode",method:"post",data:t})}function o(t){return Object(r["a"])({url:"/dicCode/queryDicValueByType",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/dicCode/queryDicById",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/dicCode/updateDicCode",method:"post",data:t})}function s(t){return Object(r["a"])({url:"/dicCode/deleteDicCode",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=CITY&parentId=".concat(t),method:"post"})}function f(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=district&parentId=".concat(t),method:"post"})}function d(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=EQUI_MODEL&parentId=".concat(t),method:"post"})}function p(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=PARTS_TYPE_TWO&parentId=".concat(t),method:"post"})}function h(t){return Object(r["a"])({url:"/dicCode/queryAdminDicByType?type=PARTS_TYPE_THREE&parentId=".concat(t),method:"post"})}function v(t){return Object(r["a"])({url:"/dicCode/getList?types=".concat(t),method:"post"})}function g(t){return Object(r["a"])({url:"/applyJob/addApplyRecord",method:"post",data:t})}function y(t){return Object(r["a"])({url:"/applyJob/queryApplyJobGroup",method:"post",data:t})}function m(t){return Object(r["a"])({url:"/excel/uploadExcel",method:"post",data:t})}},3:function(t,e){},"520a":function(t,e,n){"use strict";var r=n("0bfb"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,c="lastIndex",u=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t[c]||0!==e[c]}(),s=void 0!==/()??/.exec("")[1],l=u||s;l&&(o=function(t){var e,n,o,l,f=this;return s&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),u&&(e=f[c]),o=a.call(f,t),u&&o&&(f[c]=f.global?o.index+o[0].length:e),s&&o&&o.length>1&&i.call(o[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)})),o}),t.exports=o},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),a=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},7514:function(t,e,n){"use strict";var r=n("5ca1"),a=n("0a49")(5),i="find",o=!0;i in[]&&Array(1)[i]((function(){o=!1})),r(r.P+r.F*o,"Array",{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(i)},ae51:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"pageContainer",staticClass:"pageContainer"},[n("div",{ref:"pageSearch",staticClass:"pageSearch"},[n("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[n("el-collapse-item",{attrs:{title:"结果筛选",name:"1"}},[n("div",{staticClass:"searchRow"},[n("span",[n("span",[t._v("省份：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{placeholder:"请选择",size:"small",clearable:""},on:{change:t.provinceChange},model:{value:t.pageQuery.province,callback:function(e){t.$set(t.pageQuery,"province",e)},expression:"pageQuery.province"}},t._l(t.provinces,(function(t){return n("el-option",{key:t.id,attrs:{label:t.lable,value:t.value}})})),1)],1)]),n("span",[n("span",[t._v("员工：")]),n("span",{staticClass:"searchItem"},[n("el-select",{attrs:{placeholder:"请选择",size:"small",clearable:""},model:{value:t.pageQuery.staffName,callback:function(e){t.$set(t.pageQuery,"staffName",e)},expression:"pageQuery.staffName"}},t._l(t.staffNames,(function(t){return n("el-option",{key:t.id,attrs:{label:t.staffName,value:t.staffName}})})),1)],1)]),n("span",[n("span",[t._v("开始时间：")]),n("span",[n("el-date-picker",{attrs:{type:"date",placeholder:"开始时间","value-format":"yyyy-MM-dd",size:"small",clearable:""},model:{value:t.pageQuery.startTime,callback:function(e){t.$set(t.pageQuery,"startTime",e)},expression:"pageQuery.startTime"}})],1)]),n("span",[n("span",[t._v("结束时间：")]),n("span",[n("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"结束时间",size:"small",clearable:""},model:{value:t.pageQuery.endTime,callback:function(e){t.$set(t.pageQuery,"endTime",e)},expression:"pageQuery.endTime"}})],1)]),n("span",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.commonSearch()}}},[t._v("筛选")]),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.excelBtn()}}},[t._v("批量导出")]),n("el-button",{attrs:{size:"small"},on:{click:function(e){return t.returnBtn()}}},[t._v("返回")])],1)])])],1)],1),n("div",{staticClass:"tableRow"},[t._m(0),n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"staffTakeStatisList",attrs:{"element-loading-text":"Loading",data:t.staffTakeStatisList,fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"60"}}),n("el-table-column",{attrs:{property:"staffName",label:"员工",align:"center"}}),n("el-table-column",{attrs:{property:"province",label:"省份",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticStyle:{width:"100%",height:"25px",overflow:"hidden"}},[t._l(e.row.province,(function(r,a){return n("div",{directives:[{name:"show",rawName:"v-show",value:e.row.province.length-1!=a,expression:"scope.row.province.length -1 != index"}],key:a,staticStyle:{display:"inline-block","vertical-align":"top"}},[t._v(t._s(r+","))])})),t._l(e.row.province,(function(r,a){return n("div",{directives:[{name:"show",rawName:"v-show",value:e.row.province.length-1==a,expression:"scope.row.province.length-1==index1"}],key:a,staticStyle:{display:"inline-block","vertical-align":"top"}},[t._v(t._s(r))])}))],2)]}}])}),n("el-table-column",{attrs:{property:"receipt",label:"接单数量",align:"center"}}),n("el-table-column",{attrs:{property:"refusal",label:"拒单数量",align:"center"}}),n("el-table-column",{attrs:{property:"timeOut",label:"接单超时数量",align:"center"}}),n("el-table-column",{attrs:{property:"acceptAndRefusal",label:"接单后拒单数量",align:"center"}}),n("el-table-column",{attrs:{property:"createTime",label:"创建时间",align:"center"}})],1)],1),n("div",{staticClass:"tableBottom"},[n("div"),n("div",{ref:"paginationContainer",staticClass:"paginationContainer"},[n("el-pagination",{attrs:{small:"",background:"","prev-text":"上一页","next-text":"下一页","current-page":t.pageQuery.page,"page-sizes":t.pageSizes,"page-size":t.pageQuery.rows,layout:"prev, pager, next, total, sizes, jumper",total:t.pageQuery.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tableTitle"},[n("span",[n("i",{staticClass:"el-icon-news"}),n("span",[t._v("员工接单-列表统计")])])])}],i=(n("ac6a"),n("28a5"),n("7514"),n("20d6"),n("2934")),o=n("0cc0"),c=n("f855"),u=n("1146"),s=n.n(u),l={filters:{dicFilter:function(t,e){var n=e.findIndex((function(e){return t==e.value}));return n>-1?e[n].lable:t}},data:function(){return{activeNames:["1"],provinces:[],staffNames:[],staffTakeStatisList:[],staffTakeStatisList1:[],multipleSelection:[],pageQuery:{province:"",staffName:"",totalCount:0,page:1,rows:10,startTime:"",endTime:""},listLoading:!0,tableHeight:250,pageSizes:[10,20,30]}},mounted:function(){this.fetchAllDict()},methods:{fetchAllDict:function(){var t=this,e="PROVINCE";Object(i["e"])(e).then((function(e){t.provinces=e.data.PROVINCE,t.fetchListData()}))},provinceChange:function(t){var e=this,n={};if(n=this.provinces.find((function(e){return e.value===t})),void 0!=n){var r={province:n.id,rows:1e5};Object(o["k"])(r).then((function(t){for(var n=t.data.list,r=0;r<=n.length-1;r++){for(var a=[],i=0;i<=n[r].province.split(",").length-1;i++)for(var o=0;o<=e.provinces.length-1;o++)n[r].province.split(",")[i]==e.provinces[o].value&&a.push(e.provinces[o].lable);n[r].province=a}e.staffNames=t.data.list}))}else this.fetchStaffListData()},fetchStaffListData:function(){var t=this,e={province:this.pageQuery.province};Object(o["k"])(e).then((function(e){for(var n=e.data.list,r=0;r<=n.length-1;r++){for(var a=[],i=0;i<=n[r].province.split(",").length-1;i++)for(var o=0;o<=t.provinces.length-1;o++)n[r].province.split(",")[i]==t.provinces[o].value&&a.push(t.provinces[o].lable);n[r].province=a}console.log("1213"),t.staffNames=e.data.list}))},fetchListData:function(){var t=this;this.listLoading=!0;var e=this.pageQuery;Object(c["d"])(e).then((function(e){for(var n=e.data.list,r=0;r<=n.length-1;r++){for(var a=[],i=0;i<=n[r].province.split(",").length-1;i++)for(var o=0;o<=t.provinces.length-1;o++)n[r].province.split(",")[i]==t.provinces[o].value&&a.push(t.provinces[o].lable);n[r].province=a}t.staffTakeStatisList=e.data.list,t.pageQuery.totalCount=e.data.total,t.listLoading=!1}))},handleSizeChange:function(t){this.pageQuery.page=1,this.pageQuery.rows=t,this.fetchListData()},handleCurrentChange:function(t){this.pageQuery.page=t,this.fetchListData()},commonSearch:function(){var t=this;this.listLoading=!0;var e=this.pageQuery;Object(c["d"])(e).then((function(e){for(var n=e.data.list,r=0;r<=n.length-1;r++){for(var a=[],i=0;i<=n[r].province.split(",").length-1;i++)for(var o=0;o<=t.provinces.length-1;o++)n[r].province.split(",")[i]==t.provinces[o].value&&a.push(t.provinces[o].lable);n[r].province=a}t.staffTakeStatisList=e.data.list,t.pageQuery.totalCount=e.data.total,t.listLoading=!1}))},handleSelectionChange:function(t){this.multipleSelection=t},allSelect:function(){this.$refs.staffTakeStatisList.toggleAllSelection()},cancelSelect:function(){this.$refs.staffTakeStatisList.clearSelection()},reverseSelect:function(t){var e=this;t&&t.forEach((function(t){e.$refs.staffTakeStatisList.toggleRowSelection(t)}))},excelBtn:function(){var t=this;this.pageQuery.rows=1e5,Object(c["d"])(this.pageQuery).then((function(e){if(t.pageQuery.rows=10,0==e.data.list.length)t.$message.warning("没有要导出的数据");else{var n=[["员工","省份","接单数量","拒单数量","接单超时数量","接单后拒单数量"]];e.data.list.map((function(e){var r=[];r.push(e.staffName);for(var a="",i=0;i<e.province.split(",").length;i++)e.province.split(",").length-1==i?a+=t.$options.filters.dicFilter(e.province.split(",")[i],t.provinces):a+=t.$options.filters.dicFilter(e.province.split(",")[i],t.provinces)+",";r.push(a),r.push(e.receipt),r.push(e.refusal),r.push(e.timeOut),r.push(e.acceptAndRefusal),n.push(r)}));var r=s.a.utils.book_new(),a=s.a.utils.aoa_to_sheet(n);s.a.utils.book_append_sheet(r,a,"员工接单-列表统计"),s.a.writeFile(r,"员工接单-列表统计.xlsx")}}))},returnBtn:function(){this.$router.push({name:"StaffTakeStatis"})}},destroyed:function(){window.onresize=null}},f=l,d=n("2877"),p=Object(d["a"])(f,r,a,!1,null,null,null);e["default"]=p.exports},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},cd1c:function(t,e,n){var r=n("e853");t.exports=function(t,e){return new(r(t))(e)}},e853:function(t,e,n){var r=n("d3f4"),a=n("1169"),i=n("2b4c")("species");t.exports=function(t){var e;return a(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)||(e=void 0),r(e)&&(e=e[i],null===e&&(e=void 0))),void 0===e?Array:e}},f855:function(t,e,n){"use strict";n.d(e,"g",(function(){return a})),n.d(e,"f",(function(){return i})),n.d(e,"e",(function(){return o})),n.d(e,"d",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return l}));var r=n("b775");function a(t){return Object(r["a"])({url:"dataStatistics/queryProductlineCountPic",method:"post",data:t})}function i(t){return Object(r["a"])({url:"dataStatistics/queryProductlineCountForm",method:"post",data:t})}function o(t){return Object(r["a"])({url:"dataStatistics/queryOrderPic",method:"post",data:t})}function c(t){return Object(r["a"])({url:"dataStatistics/queryOrderForm",method:"post",data:t})}function u(t){return Object(r["a"])({url:"dataStatistics/queryOnlinePic",method:"post",data:t})}function s(t){return Object(r["a"])({url:"dataStatistics/queryOnlineForm",method:"post",data:t})}function l(t){return Object(r["a"])({url:"dataStatistics/queryEmployeeOrderPic",method:"post",data:t})}}}]);