<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                            <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                        </el-card>
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>功能</span>
                            </div>
                            <el-button type="primary" @click="changepassword">修改密码</el-button>
                            <el-button type="primary">历史订单</el-button>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>未完成订单</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>已完成订单</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>



                </el-row>
                <el-card shadow="hover" :body-style="{ height: '304px'}">
                    <div slot="header" class="clearfix">
                        <span>乘客信息</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="addpassenger">添加乘客</el-button>
                    </div>

                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">

                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" >{{scope.row.pName}}{{scope.row.passengerID}}</div>
                            </template>
                        </el-table-column>

                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>

                    </el-table>

                </el-card>

            </el-col>
        </el-row>

        <!--修改密码编辑框-->
        <el-dialog title="修改密码" :visible.sync="changePassword" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="旧密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.newpassword"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码">
                    <el-input v-model="form.renewpassword"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changePassword = false">取 消</el-button>
                <el-button type="primary" @click="saveChange">确 定</el-button>
            </span>
        </el-dialog>

        <!--添加乘客编辑框-->
        <el-dialog title="添加乘客" :visible.sync="addPassenger" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="乘客身份证">
                    <el-input v-model="form.passengerID"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.pName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.conInfo"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addPassenger = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import VueResource from 'vue-resource';
    import axios from 'axios';
    export default {
        name: 'userinformation',
        data() {
            return {
                url:'../src/components/page/passengerinformation.json',
                todoList: [],
                form:{
                    username:'',
                    password:'',
                    newpassword:'',
                    renewpassword:'',
                    passengerID:'',
                    pName:'',
                    age:'',
                    conInfo:''
                },
                changePassword:false,
                addPassenger:false,
                name: localStorage.getItem('ms_username')

            }
        },
        mounted() {
            this.getData();
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        methods:{
            //修改密码
            changepassword(){
                this.changePassword=true;
            },
            //添加乘客
            addpassenger(){
                this.addPassenger=true;
            },
            //保存修改
            saveChange(){
                //this.$set(this.todoList, this.idx, this.form);
                this.changePassword = false;
                this.$message.success(`修改成功`);
            },
            //保存添加
            saveAdd(){
                //this.$set(this.todoList, this.idx, this.form);
                this.addPassenger = false;
                this.$message.success(`添加成功`);
            },
            getData(){
                this.$axios.get(this.url).then((res) => {
                    this.todoList = res.data.list;
                })
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
