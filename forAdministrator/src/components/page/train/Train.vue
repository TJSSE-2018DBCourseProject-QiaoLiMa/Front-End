<template>
    <div>
        <div class="container">
            <h1>列车页面</h1>
            <div class="form-box">
                <el-tabs type="border-card">
                    <el-tab-pane label="添加列车">
                        <el-form ref="train" :model="train" label-width="80px" @click="handleTabClick">
                            <el-form-item label="列车ID">
                                <el-input v-model="train.ID" placeholder="请输入列车ID"></el-input>
                            </el-form-item>
                            <el-form-item label="列车型号">
                                <el-radio-group v-model="train.trainType">
                                    <el-radio label="高铁"></el-radio>
                                    <el-radio label="动车"></el-radio>
                                    <el-radio label="普快"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="客/货运">
                                <el-radio-group v-model="train.trainFreightType">
                                    <el-radio label="客运"></el-radio>
                                    <el-radio label="货运"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onAddSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="删除列车">
                        <el-form ref="train" :model="train" label-width="80px" @click="handleTabClick">
                            <el-form-item label="列车ID">
                                <el-input v-model="train.ID" placeholder="请输入列车ID"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onDeleteSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="查找列车">
                        <el-form ref="train" :model="train" label-width="80px" @click="handleTabClick">
                            <el-form-item label="列车ID">
                                <el-input v-model="train.ID" placeholder="请输入列车ID"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSearchSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>

                    </el-tab-pane>

                    <el-tab-pane label="修改列车">
                        <div>

                            <el-form ref="train" :model="train" label-width="80px" @click="handleTabClick">
                                <el-form-item label="列车ID">
                                    <el-input v-model="train.ID" placeholder="请输入列车ID"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onChangeSubmit">提交</el-button>
                                </el-form-item>
                            </el-form>

                        </div>
                        <router-view ></router-view>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Train",
        command: {},
        data: function() {
            return {
                searchForCarriages: true,
                train: {
                    ID: "",
                    trainType: 0,
                    trainFreightType: 0,
                    trainRunningSituation: 0
                },
                carriage: {
                    ID: "",
                    carriageFreightType: "",
                    freightCapacity: 0,
                    passengerCapacity: 0,
                    carriageRunningSituation: "运营中",
                    belongingTrain: "",
                    carriageCarryingSituation: 0
                },
                tabType: 0,
                links: [{}]
            }
        },
        methods: {
            handleTabClick(tab, e) {//点击选项卡
                this.tabType = tab.index;
                var _val = tab.index;
                this.getWaterDetails(_val);
            },
            onAddSubmit() {
                this.$message.success('列车添加成功！');
            },
            onDeleteSubmit() {
                this.$message.success('列车删除成功！');
            },
            onSearchSubmit() {
                this.$message.success('列车查找成功！');
                this.$goRoute('/page/train/carriage');
            },
            onChangeSubmit() {
                this.$router.push('/carriageInTrain');
                this.$searchForCarriages = false;
                this.$message.success('列车更改成功！');
            }
        }
    }
</script>
