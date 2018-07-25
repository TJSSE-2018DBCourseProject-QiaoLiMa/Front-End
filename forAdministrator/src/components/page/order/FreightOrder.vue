<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-tickets"></i> 货运订单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderID" label="订单ID" sortable width="150":formatter="formatter">
            </el-table-column>
            <el-table-column prop="senderName" label="寄件人姓名" width="90">
            </el-table-column>
            <el-table-column prop="senderID" label="寄件人身份证号" width="120">
            </el-table-column>
            <el-table-column prop="senderPhoneNumber" label="寄件人联系方式" width="120">
            </el-table-column>
            <el-table-column prop="receiverName" label="收件人姓名" width="90">
            </el-table-column>
            <el-table-column prop="receiverPhoneNumber" label="收件人联系方式" width="120">
            </el-table-column>
            <el-table-column prop="startStation" label="出发站" width="90">
            </el-table-column>
            <el-table-column prop="endStation" label="目的地站" width="90">
            </el-table-column>
            <el-table-column prop="createDate" label="提交时间" width="120">
            </el-table-column>
            <el-table-column prop="dueDate" label="最晚到达时间" width="120">
            </el-table-column>
            <el-table-column prop="transferID" label="运单编号" width="120">
            </el-table-column>
            <el-table-column prop="packageID" label="货物编号" width="120">
            </el-table-column>
            <el-table-column prop="orderBill" label="金额" width="60">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="订单ID">
                <el-input v-model="form.orderID"></el-input>
            </el-form-item>
            <el-form-item label="寄件人姓名">
                <el-input v-model="form.senderName"></el-input>
            </el-form-item>
            <el-form-item label="寄件人身份证号">
                <el-input v-model="form.senderID"></el-input>
            </el-form-item>
            <el-form-item label="寄件人联系方式">
                <el-input v-model="form.senderPhoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="收件人姓名">
                <el-input v-model="form.receiverName"></el-input>
            </el-form-item>
            <el-form-item label="收件人联系方式">
                <el-input v-model="form.receiverPhoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="出发站">
                <el-input v-model="form.startStation"></el-input>
            </el-form-item>
            <el-form-item label="目的地站">
                <el-input v-model="form.endStation"></el-input>
            </el-form-item>
            <el-form-item label="提交时间">
                <el-input v-model="form.createDate"></el-input>
            </el-form-item>
            <el-form-item label="最晚到达时间">
                <el-input v-model="form.dueDate"></el-input>
            </el-form-item>
            <el-form-item label="运单编号">
                <el-input v-model="form.transferID"></el-input>
            </el-form-item>
            <el-form-item label="货物编号">
                <el-input v-model="form.packageID"></el-input>
            </el-form-item>
            <el-form-item label="金额">
                <el-input v-model="form.orderBill"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
</div>
</template>

<script>
    export default {
        name: 'freightordertable',
        data() {
            return {
                url: '../src/components/page/order/freightOrderTable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    orderID:'',
                    senderName: '',
                    senderID: '',
                    senderPhoneNumber: '',
                    receiverName:'',
                    receiverPhoneNumber:'',
                    startStation:'',
                    endStation:'',
                    createDate:'',
                    dueDate:'',
                    transferID:'',
                    packageID:'',
                    orderBill:''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.orderID === this.del_list[i].orderID) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.senderName.indexOf(this.select_cate) > -1 &&
                            (d.orderID.indexOf(this.select_word) > -1 ||
                                d.senderName.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                //if (process.env.NODE_ENV === 'development') {
                //    this.url =  '/ms/table/list';
                //};
                this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },

            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.orderID;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    orderID:item.orderID,
                    senderName: item.senderName,
                    senderID: item.senderID,
                    senderPhoneNumber: item.senderPhoneNumber,
                    receiverName:item.receiverName,
                    receiverPhoneNumber:item.receiverPhoneNumber,
                    startStation:item.startStation,
                    endStation:item.endStation,
                    createDate:item.createDate,
                    dueDate:item.dueDate,
                    transferID:item.transferID,
                    packageID:item.packageID,
                    orderBill:item.orderBill
                };
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>

