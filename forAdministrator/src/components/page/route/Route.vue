<template>
    <div>
        <div class="container">
            <h1>铁路线页面</h1>
         <!--   <div class="form-box" >
                <el-tabs type="border-card" @tab-click="handleTabClick">
                    <el-tab-pane label="添加路线">
                        <el-form ref="routeToAdd" :model="routeToAdd" label-width="80px">
                            <el-form-item label="路线ID">
                                <el-input v-model="routeToAdd.ID" placeholder="请输入路线ID"></el-input>
                            </el-form-item>
                            <el-form-item label="路线名称">
                                <el-input v-model="routeToAdd.name" placeholder="请输入路线名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onAddSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="删除路线">
                        <el-form ref="routeToDelete" :model="routeToDelete" label-width="80px" @click="handleTabClick">
                            <el-form-item label="列车ID">
                                <el-input v-model="routeToDelete.ID" placeholder="请输入路线ID"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onDeleteSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="查找路线">
                        <div v-show="searchButton">
                            <el-form ref="routeToSearch" :model="routeToSearch" label-width="80px" @click="handleTabClick">
                                <el-form-item label="列车ID">
                                    <el-input v-model="routeToSearch.ID" placeholder="请输入路线ID"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSearchSubmit">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-show="searchResult">
                            <el-table :data="trainResult" stripe border style="width: 321px">
                                <el-table-column prop="ID" label="ID" width="80">
                                </el-table-column>
                                <el-table-column prop="trainType" label="列车类型" width="80">
                                </el-table-column>
                                <el-table-column prop="trainFreightType" label="客/货运" width="80">
                                </el-table-column>
                                <el-table-column prop="trainRunningSituation" label="运营状态" width="80">
                                </el-table-column>
                            </el-table>
                            <br/>
                            <el-button type="primary" @click="searchGoBack">返回</el-button>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="修改路线">
                        <div v-show="changeTrainButton">
                            <el-form ref="trainToChange" :model="trainToChange" label-width="80px" @click="handleTabClick">
                                <el-form-item label="列车ID">
                                    <el-input v-model="trainToChange.ID" placeholder="请输入列车ID"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onChangeSubmit">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-show="changeTrainResult">
                            <el-button type="primary" @click="changeGoBack">返回</el-button>
                            <br/>
                            <br/>
                            <el-table :data="carriages" stripe border style="width: 100%">
                                <el-table-column prop="ID" label="ID" width="50">
                                </el-table-column>
                                <el-table-column prop="carriageFreightType" label="客/货运" width="80">
                                </el-table-column>
                                <el-table-column prop="capacity" label="容量" width="100">
                                </el-table-column>
                                <el-table-column prop="carriageRunningSituation" label="运营状态" width="80">
                                </el-table-column>
                                <el-table-column prop="carriageCarryingSituation" label="当前承载量" width="80">
                                </el-table-column>
                                <el-table-column prop="belongingTrain" label="所属列车编号" width="100">
                                </el-table-column>
                                <el-table-column label="修改" width="77">
                                    <template slot-scope="scope">
                                        <el-button @click="onEditCarriage(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-show="carriageData">


                            <el-form ref="aCarriage" :model="aCarriage" label-width="100px">
                                <el-form-item label="车厢编号">
                                    <p>{{aCarriage.ID}}</p>
                                </el-form-item>
                                <el-form-item label="客/货运">
                                    <p>{{aCarriage.carriageFreightType}}</p>
                                </el-form-item>
                                <el-form-item label="容量">
                                    <el-input v-model="aCarriage.capacity" :placeholder="aCarriage.capacity"></el-input>
                                </el-form-item>
                                <el-form-item label="运营状态">
                                    <el-radio-group v-model="aCarriage.carriageRunningSituation">
                                        <el-radio label="运营中"></el-radio>
                                        <el-radio label="维修中"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="当前承载量">
                                    <p>{{aCarriage.carriageCarryingSituation}}</p>
                                </el-form-item>
                                <el-form-item label="所属列车编号">
                                    <p>{{aCarriage.belongingTrain}}</p>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onEditCarriageSubmit">提交</el-button>
                                </el-form-item>
                            </el-form>


                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            -->
        </div>
    </div>
</template>

<script>
   /* import axios from 'axios';
    var trainResult;
    var carriagesInfo;
    export default {
        name: "Train",
        // mounted() {
        //     this.getTrainInfo();
        // },
        data: function() {
            return {
                searchForCarriages: true,
                trainToAdd: {
                    ID: "",
                    trainType: 0,
                    trainFreightType: 0,
                },
                trainToDelete: {
                    ID: ""
                },
                trainToSearch: {
                    ID: ""
                },
                trainToChange: {
                    ID: "",
                },
                trainResult: [{
                    ID: "C200",
                    trainType: "高铁",
                    trainFreightType: "货运",
                    trainRunningSituation: "运营中"
                }],
                carriages: [{
                    ID: "1",
                    carriageFreightType: "客运",
                    capacity: 120,
                    carriageRunningSituation: "运营中",
                    belongingTrain: "G2318",
                    carriageCarryingSituation: 0
                },{
                    ID: "2",
                    carriageFreightType: "客运",
                    capacity: 120,
                    carriageRunningSituation: "运营中",
                    belongingTrain: "G2318",
                    carriageCarryingSituation: 0
                }],
                aCarriage: {
                    ID: "1",
                    carriageFreightType: "客运",
                    capacity: 120,
                    carriageRunningSituation: "运营中",
                    belongingTrain: "G2318",
                    carriageCarryingSituation: 10
                },
                tabType: 0,
                searchButton: true,
                searchResult: false,
                changeTrainButton: true,
                changeTrainResult: false,
                carriageData: false
            }
        },
        methods: {
            handleTabClick(tab, e) {//点击选项卡
                console.log(tab, e);
                this.searchButton = true;
                this.searchResult = false;
                this.changeTrainButton = true;
                this.changeTrainResult = false;
                this.carriageData = false;
                // this.tabType = tab.index;
                // var _val = tab.index;
                // this.getWaterDetails(_val);
            },
            onAddSubmit() {
                this.$message.success('列车添加成功！');
            },
            onDeleteSubmit() {
                this.$message.success('列车删除成功！');
            },
            onSearchSubmit() {
                this.getTrainInfo();
                this.searchButton = !this.searchButton;
                this.searchResult = !this.searchResult;
                this.$message.success('列车查找成功！');
            },
            onChangeSubmit() {
                //this.getCarriagesInfo();
                this.changeTrainButton = !this.changeTrainButton;
                this.changeTrainResult = !this.changeTrainResult;
                this.$message.success('列车更改成功！');
            },
            onEditCarriage(index, row) {//修改列车
                console.log(index);
                this.aCarriage= this.carriages[index];

                this.changeTrainButton=false;
                this.changeTrainResult=false;
                this.carriageData=true;
            },
            onEditCarriageSubmit() {
                this.changeTrainButton=true;
                this.changeTrainResult=false;
                this.carriageData=false;
                this.$message.success('提交成功！');
            },
            changeGoBack() {
                this.changeTrainButton = true;
                this.changeTrainResult = false;
            },
            searchGoBack() {
                this.searchButton = true;
                this.searchResult = false;
            },
            getTrainInfo() {
                var status = true;
                trainResult = this.trainResult;
                axios.get('../Train.json',{
                    params:{
                        ID: "G2318"
                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        // alert(JSON.stringify(response.data.statisticOrder.freightOrderNumber));
                        // document.getElementById("testID").innerHTML=response.data.statisticOrder.freightOrderNumber;
                        status = response.data.status;
                        if(status){
                            var _trainType="";
                            if(response.data.trainType==0){
                                _trainType = "高铁";
                            }else if(response.data.trainType == 1){
                                _trainType = "动车";
                            }else{
                                _trainType = "快车";
                            }

                            var _trainFreightType = "";
                            if (response.data.trainFreightType==0){
                                _trainFreightType="货运";
                            }else if (response.data.trainFreightType == 1){
                                _trainFreightType="客运";
                            } else {
                                _trainFreightType="客货同运";
                            }

                            var _trainRunningSituation = "";
                            if(response.data.trainRunningSituation==0){
                                _trainRunningSituation = "维修中";
                            }else{
                                _trainRunningSituation = "运营中";
                            }

                            var newData={ID: response.data.ID, trainType: _trainType,
                                trainFreightType: _trainFreightType, trainRunningSituation: _trainRunningSituation};
                            trainResult.splice(0,1);
                            trainResult.push(newData);
                        }
                    })
                    .catch(function (error) {
                        alert(error);
                        console.log(error);
                    });
                return status;
            },
            getCarriagesInfo() {
                carriagesInfo = this.carriages;
                axios.get('../Carriages.json',{
                    params:{
                        ID: "G2318"
                    }
                })
                    .then(function (response) {
                        var _carriageFreightType;
                        var _carriageCarryingSituation;
                        var _capacity;
                        var newData;
                        carriagesInfo.splice(0);
                        console.log(carriagesInfo);
                        var data = response.data;

                        for (var i in data) {
                            console.log(data[i]);
                            if (data[i].carriageFreightType==0){
                                _carriageFreightType="货运";
                                _capacity=data[i].freightCapacity;
                            }else {
                                _carriageFreightType="客运";
                                _capacity=data[i].passengerCapacity;
                            }

                            if(data[i].carriageCarryingSituation == 0){
                                _carriageCarryingSituation = "维修中";
                            }else{
                                _carriageCarryingSituation = "运营中";
                            }

                            newData={ID: data[i].ID, carriageFreightType: _carriageFreightType,
                                capacity: _capacity, carriageRunningSituation: _carriageCarryingSituation,
                                belongingTrain: data[i].belongingTrain, carriageCarryingSituation: _carriageCarryingSituation};

                            carriagesInfo.push(newData);
                        }
                        console.log(data);
                    })
                    .catch(function (error) {
                        alert(error);
                        console.log(error);
                    });
            }
        }
    }
    */
</script>
