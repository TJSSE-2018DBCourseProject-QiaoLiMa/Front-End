<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 乘务组管理</el-breadcrumb-item>
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
                <el-button type="primary" icon="insert" @click="insert">新建乘务组</el-button>
                <el-button type="primary" icon="allocate" @click="allocate">乘务组调配</el-button>
                <el-button type="primary" icon="findemployee" @click="findemployee">查询员工</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="crewID" label="乘务组ID" sortable width="150":formatter="formatter">
                </el-table-column>
                <el-table-column prop="numberOfPeople" label="人数" width="60">
                </el-table-column>
                <el-table-column prop="chiefOfCrew" label="乘务长" width="120">
                </el-table-column>
                <el-table-column prop="mainDriver" label="主驾驶员" width="120">
                </el-table-column>
                <el-table-column prop="viceDriver" label="副驾驶员" width="120">
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
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="乘务组ID">
                    <el-input v-model="form.crewID"></el-input>
                </el-form-item>
                <el-form-item label="人数">
                    <el-input v-model="form.numberOfPeople"></el-input>
                </el-form-item>
                <el-form-item label="乘务长">
                    <el-input v-model="form.chiefOfCrew"></el-input>
                </el-form-item>
                <el-form-item label="主驾驶员">
                    <el-input v-model="form.mainDriver"></el-input>
                </el-form-item>
                <el-form-item label="副驾驶员">
                    <el-input v-model="form.viceDriver"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>

        </el-dialog>

        <!-- 乘务组调配弹出框 -->
        <el-dialog title="乘务组调配" :visible.sync="allocateVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="乘务组ID">
                    <el-input v-model="form.crewID"></el-input>
                </el-form-item>
                <el-form-item label="员工ID">
                    <el-input v-model="form.staffID"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="allocateVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAllocate">确 定</el-button>
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
        name: 'crewtable',
        data() {
            return {
                url: '../src/components/page/employee/crewTable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                is_insert:false,
                editVisible: false,
                delVisible: false,
                allocateVisible:false,
                form: {
                    crewID:'',
                    numberOfPeople: '',
                    chiefOfCrew: '',
                    mainDriver: '',
                    viceDriver:'',
                    staffID:''
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
                        if (d.crewID === this.del_list[i].crewID) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.numberOfPeople.indexOf(this.select_cate) > -1 &&
                            (d.crewID.indexOf(this.select_word) > -1 ||
                                d.numberOfPeople.indexOf(this.select_word) > -1)
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
            insert() {
                this.is_insert = true;
            },
            allocate(){
                this.allocateVisible=true;
            },
            findemployee(){

            },
            formatter(row, column) {
                return row.crewID;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    crewID:item.crewID,
                    numberOfPeople: item.numberOfPeople,
                    chiefOfCrew: item.chiefOfCrew,
                    mainDriver: item.mainDriver,
                    viceDriver:item.viceDriver
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
                    str += this.multipleSelection[i].crewID + ' ';
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
            //保存调配
            saveAllocate() {
                this.$set(this.tableData, this.idx, this.form);
                this.allocateVisible = false;
                this.$message.success(`调配成功`);
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
