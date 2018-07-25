<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-tickets"></i> 客运订单</el-breadcrumb-item>
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
            <el-table-column prop="orderID" label="订单号" sortable width="120":formatter="formatter">
            </el-table-column>
            <el-table-column prop="accountID" label="订票账户" width="120">
            </el-table-column>
            <el-table-column prop="passengerID" label="乘客身份证" width="150">
            </el-table-column>
            <el-table-column prop="trainNum" label="车次" width="80">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="120">
            </el-table-column>
            <el-table-column prop="start" label="始发站" width="80">
            </el-table-column>
            <el-table-column prop="end" label="终点站" width="80">
            </el-table-column>
            <el-table-column prop="carNumber" label="车厢" width="60">
            </el-table-column>
            <el-table-column prop="seatNumber" label="座位号" width="60">
            </el-table-column>
            <el-table-column prop="cost" label="价格" width="60">
            </el-table-column>
            <el-table-column prop="changeableTimes" label="可改签次数" width="100">
            </el-table-column>
            <el-table-column prop="completeMethod" label="订单完成方式" width="120">
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
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="订单号">
                <el-input v-model="form.orderID"></el-input>
            </el-form-item>
            <el-form-item label="订票账户">
                <el-input v-model="form.accountID"></el-input>
            </el-form-item>
            <el-form-item label="乘客身份证">
                <el-input v-model="form.passengerID"></el-input>
            </el-form-item>
            <el-form-item label="车次">
                <el-input v-model="form.trainNum"></el-input>
            </el-form-item>
            <el-form-item label="日期">
                <el-input v-model="form.date"></el-input>
            </el-form-item>
            <el-form-item label="始发站">
                <el-input v-model="form.start"></el-input>
            </el-form-item>
            <el-form-item label="终点站">
            <el-input v-model="form.end"></el-input>
            </el-form-item>
            <el-form-item label="车厢">
                <el-input v-model="form.carNumber"></el-input>
            </el-form-item>
            <el-form-item label="座位号">
                <el-input v-model="form.seatNumber"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="form.cost"></el-input>
            </el-form-item>
            <el-form-item label="可改签次数">
                <el-input v-model="form.changeableTimes"></el-input>
            </el-form-item>
            <el-form-item label="订单完成方式">
                <el-input v-model="form.completeMethod"></el-input>
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
    import VueResource from 'vue-resource';
    import axios from 'axios';
    export default {
        name: 'bookorderingtable',
        data() {
            return {
                url: '../src/components/page/order/bookorderingTable.json',
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
                    accountID: '',
                    passengerID: '',
                    trainNum: '',
                    date:'',
                    start:'',
                    end:'',
                    carNumber:'',
                    seatNumber:'',
                    cost:'',
                    changeableTimes:'',
                    completeMethod:''
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
                        if (d.accountID.indexOf(this.select_cate) > -1 &&
                            (d.orderID.indexOf(this.select_word) > -1 ||
                                d.accountID.indexOf(this.select_word) > -1)
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
                  //  this.url =  '/ms/table/list';
                ///};
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
                    accountID: item.accountID,
                    passengerID: item.passengerID,
                    trainNum: item.trainNum,
                    date:item.date,
                    start:item.start,
                    end:item.end,
                    carNumber:item.carNumber,
                    seatNumber:item.seatNumber,
                    cost:item.cost,
                    changeableTimes:item.changeableTimes,
                    completeMethod:item.completeMethod
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
                    str += this.multipleSelection[i].orderID + ' ';
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

