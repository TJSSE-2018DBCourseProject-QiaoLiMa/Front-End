webpackJsonp([5],{mvHQ:function(t,e,l){t.exports={default:l("qkKv"),__esModule:!0}},qkKv:function(t,e,l){var a=l("FeBl"),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},qwCG:function(t,e){},rSZx:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("mvHQ"),i=l.n(a),s={name:"basetable",data:function(){return{url:"../static/vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"",select_word:"",del_list:[],is_search:!1,editVisible:!1,delVisible:!1,form:{staffID:"",name:"",gender:"",IDCardNumber:"",typeOfWork:"",position:""},idx:-1}},created:function(){this.getData()},computed:{data:function(){var t=this;return this.tableData.filter(function(e){for(var l=!1,a=0;a<t.del_list.length;a++)if(e.name===t.del_list[a].name){l=!0;break}if(!l&&e.gender.indexOf(t.select_cate)>-1&&(e.name.indexOf(t.select_word)>-1||e.gender.indexOf(t.select_word)>-1))return e})}},methods:{handleCurrentChange:function(t){this.cur_page=t,this.getData()},getData:function(){var t=this;this.$axios.post(this.url,{page:this.cur_page}).then(function(e){t.tableData=e.data.list})},search:function(){this.is_search=!0},formatter:function(t,e){return t.staffID},filterTag:function(t,e){return e.tag===t},handleEdit:function(t,e){this.idx=t;var l=this.tableData[t];this.form={staffID:l.staffID,name:l.name,gender:l.gender,IDCardNumber:l.IDCardNumber,typeOfWork:l.typeOfWork,position:l.position},this.editVisible=!0},handleDelete:function(t,e){this.idx=t,this.delVisible=!0},delAll:function(){var t=this.multipleSelection.length,e="";this.del_list=this.del_list.concat(this.multipleSelection);for(var l=0;l<t;l++)e+=this.multipleSelection[l].name+" ";this.$message.error("删除了"+e),this.multipleSelection=[]},handleSelectionChange:function(t){this.multipleSelection=t},saveEdit:function(){this.$set(this.tableData,this.idx,this.form),this.editVisible=!1,this.$message.success("修改第 "+(this.idx+1)+" 行成功")},deleteRow:function(){this.tableData.splice(this.idx,1),this.$message.success("删除成功"),this.delVisible=!1},setSlist:function(t){this.slist=JSON.parse(i()(t))}}},n={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"table"},[l("div",{staticClass:"crumbs"},[l("el-breadcrumb",{attrs:{separator:"/"}},[l("el-breadcrumb-item",[l("i",{staticClass:"el-icon-tickets"}),t._v(" 员工管理")])],1)],1),t._v(" "),l("div",{staticClass:"container"},[l("div",{staticClass:"handle-box"},[l("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"delete"},on:{click:t.delAll}},[t._v("批量删除")]),t._v(" "),l("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"筛选省份"},model:{value:t.select_cate,callback:function(e){t.select_cate=e},expression:"select_cate"}},[l("el-option",{key:"1",attrs:{label:"广东省",value:"广东省"}}),t._v(" "),l("el-option",{key:"2",attrs:{label:"湖南省",value:"湖南省"}})],1),t._v(" "),l("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"筛选关键词"},model:{value:t.select_word,callback:function(e){t.select_word=e},expression:"select_word"}}),t._v(" "),l("el-button",{attrs:{type:"primary",icon:"search"},on:{click:t.search}},[t._v("搜索")])],1),t._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.data,border:""},on:{"selection-change":t.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),l("el-table-column",{attrs:{prop:"staffID",label:"员工ID",sortable:"",width:"150",formatter:t.formatter}}),t._v(" "),l("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"gender",label:"性别",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"IDCardNumber",label:"身份证号",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"typeOfWork",label:"工种",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"position",label:"职称",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{size:"small"},on:{click:function(l){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),l("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(l){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),l("div",{staticClass:"pagination"},[l("el-pagination",{attrs:{layout:"prev, pager, next",total:1e3},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"30%"},on:{"update:visible":function(e){t.editVisible=e}}},[l("el-form",{ref:"form",attrs:{model:t.form,"label-width":"50px"}},[l("el-form-item",{attrs:{label:"员工ID"}},[l("el-input",{model:{value:t.form.staffID,callback:function(e){t.$set(t.form,"staffID",e)},expression:"form.staffID"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"姓名"}},[l("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"性别"}},[l("el-input",{model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}})],1)],1),t._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"提示",visible:t.delVisible,width:"300px",center:""},on:{"update:visible":function(e){t.delVisible=e}}},[l("div",{staticClass:"del-dialog-cnt"},[t._v("删除不可恢复，是否确定删除？")]),t._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.delVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.deleteRow}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var r=l("VU/8")(s,n,!1,function(t){l("qwCG")},"data-v-1894da9a",null);e.default=r.exports}});