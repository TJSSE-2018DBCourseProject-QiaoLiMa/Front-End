<template>
    <div>
        <el-button type="primary" @click="this.$router.go(-1)">返回</el-button>
        <el-table
            :data="carriages"
            stripe
            border
            style="width: 100%">
            <el-table-column prop="ID" label="ID" width="50">
            </el-table-column>
            <el-table-column prop="carriageFreightType" label="客/货运" width="80">
            </el-table-column>
            <el-table-column prop="freightCapacity" label="货运/客运容量" width="100">
            </el-table-column>
            <el-table-column prop="carriageRunningSituation" label="运营状态" width="80">
            </el-table-column>
            <el-table-column prop="carriageCarryingSituation" label="当前运载状况" width="80">
            </el-table-column>
            <el-table-column prop="belongingTrain" label="所属列车编号" width="100">
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button @click="onEditCarriage(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Carriage",
        data: function() {
            return {
                train: {
                    ID: "",
                    trainType: 0,
                    trainFreightType: 0,
                    trainRunningSituation: 0
                },
                carriages: [{
                    ID: "1",
                    carriageFreightType: "客运",
                    freightCapacity: 120,
                    passengerCapacity: 120,
                    carriageRunningSituation: "运营中",
                    belongingTrain: "G2318",
                    carriageCarryingSituation: 0
                },{
                    ID: "2",
                    carriageFreightType: "客运",
                    freightCapacity: 120,
                    passengerCapacity: 120,
                    carriageRunningSituation: "运营中",
                    belongingTrain: "G2318",
                    carriageCarryingSituation: 0
                }],
                tabType: 0,
                links: [{}]
            }
        },
        methods: {
            onEditCarriage(index, row) {//修改列车
                console.log(index,row);
            }
        }
    }
</script>

<style scoped>

</style>
