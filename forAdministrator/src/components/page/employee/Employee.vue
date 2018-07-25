<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 员工管理</el-breadcrumb-item>
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
                <el-button type="primary" icon="insert" @click="insert">添加员工</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="staffID" label="员工ID" sortable width="150":formatter="formatter">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="60">
                </el-table-column>
                <el-table-column prop="IDCardNumber" label="身份证号" width="150">
                </el-table-column>
                <el-table-column prop="typeOfWork" label="工种" width="120">
                </el-table-column>
                <el-table-column prop="position" label="职称" width="120">
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

            <el-form ref="form" :model="form" label-width="70px">

                <el-form-item label="员工ID">
                    <el-input v-model="form.staffID"></el-input>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-input v-model="form.gender"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-select v-model="form.gender" placeholder="请选择">
                        <el-option key="man" label="男" value="man"></el-option>
                        <el-option key="woman" label="女" value="woman"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input v-model="form.IDCardNumber"></el-input>
                </el-form-item>

                <el-form-item label="工种">
                    <el-input v-model="form.typeOfWork"></el-input>
                </el-form-item>

                <el-form-item label="职称">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>

        </el-dialog>

        <!-- 添加员工弹出框 -->
        <el-dialog title="添加员工" :visible.sync="insertVisible" width="30%">

            <el-form ref="form" :model="form" label-width="70px">

                <el-form-item label="员工ID">
                    <el-input v-model="form.staffID"></el-input>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-select v-model="form.gender" placeholder="请选择">
                        <el-option key="man" label="男" value="man"></el-option>
                        <el-option key="woman" label="女" value="woman"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input v-model="form.IDCardNumber"></el-input>
                </el-form-item>

                <el-form-item label="工种">
                    <el-input v-model="form.typeOfWork"></el-input>
                </el-form-item>

                <el-form-item label="职称">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="insertVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveinsert">确 定</el-button>
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
    export default {
        name: 'stafftable',
        data() {
            return {
                url: '../src/components/page/employee/staffTable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                insertVisible:false,
                editVisible: false,
                delVisible: false,
                form: {
                    staffID:'',
                    name: '',
                    gender: '',
                    IDCardNumber: '',
                    typeOfWork:'',
                    position:''
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
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.staffID.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.staffID.indexOf(this.select_word) > -1)
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
               // if (process.env.NODE_ENV === 'development') {
                 //   this.url =  '/ms/table/list';
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
            insert(){
                this.insertVisible = true;
            },
            formatter(row, column) {
                return row.staffID;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    staffID:item.staffID,
                    name: item.name,
                    gender: item.gender,
                    IDCardNumber: item.IDCardNumber,
                    typeOfWork:item.typeOfWork,
                    position:item.position
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
            //添加员工
            saveinsert(){
                this.insertVisible=false;
                this.$message.success('添加成功');
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
