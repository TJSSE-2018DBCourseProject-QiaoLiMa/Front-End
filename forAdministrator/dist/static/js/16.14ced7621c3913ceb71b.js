webpackJsonp([16],{bExu:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"table"},[l("div",{staticClass:"crumbs"},[l("el-breadcrumb",{attrs:{separator:"/"}},[l("el-breadcrumb-item",[l("i",{staticClass:"el-icon-tickets"}),e._v(" 客运订单")])],1)],1),e._v(" "),l("div",{staticClass:"container"},[l("div",{staticClass:"handle-box"},[l("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"delete"},on:{click:e.delAll}},[e._v("批量删除")]),e._v(" "),l("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"筛选省份"},model:{value:e.select_cate,callback:function(t){e.select_cate=t},expression:"select_cate"}},[l("el-option",{key:"1",attrs:{label:"广东省",value:"广东省"}}),e._v(" "),l("el-option",{key:"2",attrs:{label:"湖南省",value:"湖南省"}})],1),e._v(" "),l("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"筛选关键词"},model:{value:e.select_word,callback:function(t){e.select_word=t},expression:"select_word"}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.data,border:""},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{prop:"staffID",label:"员工ID",sortable:"",width:"150",formatter:e.formatter}}),e._v(" "),l("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"gender",label:"性别",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"IDCardNumber",label:"身份证号",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"typeOfWork",label:"工种",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"position",label:"职称",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"small"},on:{click:function(l){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(l){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("div",{staticClass:"pagination"},[l("el-pagination",{attrs:{layout:"prev, pager, next",total:1e3},on:{"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"50px"}},[l("el-form-item",{attrs:{label:"员工ID"}},[l("el-input",{model:{value:e.form.staffID,callback:function(t){e.$set(e.form,"staffID",t)},expression:"form.staffID"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"姓名"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"性别"}},[l("el-input",{model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}})],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"提示",visible:e.delVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delVisible=t}}},[l("div",{staticClass:"del-dialog-cnt"},[e._v("删除不可恢复，是否确定删除？")]),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.deleteRow}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var i=l("VU/8")({name:"basetable",data:function(){return{url:"../static/vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"",select_word:"",del_list:[],is_search:!1,editVisible:!1,delVisible:!1,form:{staffID:"",name:"",gender:"",IDCardNumber:"",typeOfWork:"",position:""},idx:-1}},created:function(){this.getData()},computed:{data:function(){var e=this;return this.tableData.filter(function(t){for(var l=!1,a=0;a<e.del_list.length;a++)if(t.name===e.del_list[a].name){l=!0;break}if(!l&&t.gender.indexOf(e.select_cate)>-1&&(t.name.indexOf(e.select_word)>-1||t.gender.indexOf(e.select_word)>-1))return t})}},methods:{handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this;this.$axios.post(this.url,{page:this.cur_page}).then(function(t){e.tableData=t.data.list})},search:function(){this.is_search=!0},formatter:function(e,t){return e.staffID},filterTag:function(e,t){return t.tag===e},handleEdit:function(e,t){this.idx=e;var l=this.tableData[e];this.form={staffID:l.staffID,name:l.name,gender:l.gender,IDCardNumber:l.IDCardNumber,typeOfWork:l.typeOfWork,position:l.position},this.editVisible=!0},handleDelete:function(e,t){this.idx=e,this.delVisible=!0},delAll:function(){var e=this.multipleSelection.length,t="";this.del_list=this.del_list.concat(this.multipleSelection);for(var l=0;l<e;l++)t+=this.multipleSelection[l].name+" ";this.$message.error("删除了"+t),this.multipleSelection=[]},handleSelectionChange:function(e){this.multipleSelection=e},saveEdit:function(){this.$set(this.tableData,this.idx,this.form),this.editVisible=!1,this.$message.success("修改第 "+(this.idx+1)+" 行成功")},deleteRow:function(){this.tableData.splice(this.idx,1),this.$message.success("删除成功"),this.delVisible=!1}}},a,!1,function(e){l("ubnb")},"data-v-0340c618",null);t.default=i.exports},ubnb:function(e,t){}});