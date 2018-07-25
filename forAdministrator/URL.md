


# 接口编号（前端）

### 1-100 袁昊

### 101-200 赵欣宇+肖睿

### 201-300 陶思霖

# 问题接口

### 9.修改过，请前端查看修改后是否有接口能满足“修改”



### 101+103+107=107

### 110+120

### 103+115+118

### 112+122



### 207.修改过



# 后端分配

# 基础     郎+韦

## train       韦

### 1.查询列车状态

##### index GET

参数：
{
	"ID": "G2318"
}

返回：
{
	"trainType"："express",
	"trainFreightType": "freight",
	"trainRunningSituation": "running"
}

### 3.添加列车

##### index POST

参数：
{
	"ID": "G2318",
	"trainType": "express",
	"trainFreightType": "freight",
	"trainRunningSituation": "running"
}

### 4.删除列车

##### index DELETE

参数：
{
	"ID": "G2318"
}

### 5.修改列车状态

##### index PUT

参数：
{
	"ID": "G2318",
	"shouldChangeCarriage": true	//是否改变具体某一节车厢的状态
}

返回：
{
	"carriageNumbers": []	//所有车厢的编号
}

### 114.检修中列列⻋车数/全部列列⻋车数

##### status GET

返回：
{
"BrokenTrainNumber":300,
"TotalTrainNumber":200000
}



## carriage      韦

### 7.修改车厢运行状态

##### status PUT

参数：
{
	"ID": 12
	"carriageRunningSituation": "running"
}



### 8.修改车厢其他状态

##### index PUT

参数：
{
	"ID": 12,
	"carriageFreightType": "freight",
	"freightCapacity": 80,
	"passengerCapacity": 80,
	"carriageRunningSituation": "running",
	"belongingTrain": "G2318",
	"carriageCarryingSituation": 800
}



## route      郎

### 15.删除route

##### index PUT

参数:
{
	"ID": "S200"
}

### 16.添加route

##### Index POST

参数:
{
	"route-ID": "S200",
	"ID-left": "CS287",
	"ID-right": "CS288"
}



## track      郎

### 9.查找该route上track

##### route GET

参数:
{
	"route-ID": "S200",	//route的ID
	"SortedBy": "track-ID"
}

返回：

{	//返回状态数组
	"tracks":[
		{
			"ID": "B123",
			"loadType": "express",
			"speedLimitation": 300,
			"trackRunningSituation": "running",
			"trackLength": 200,
			"constructionAndOverhaulInformation": "CC23714"
		}
	]
}

### 11.查找track

##### index GET

参数：
{
	"route-ID": "S200",
	"ID": "B123"
}

返回：
{
	"loadType": "express",
	"speedLimitation": 300,
	"trackRunningSituation": "running",
	"trackLength": 200,
	"constructionAndOverhaulInformation": "CC23714"
}

### 13.修改track

##### index PUT

参数：
{
	"route-ID": "S200",
	"ID": "B123",
	"loadType": "express",
	"speedLimitation": 300,
	"trackRunningSituation": "running",
	"trackLength": 200,
	"constructionAndOverhaulInformation": "CC23714"
}

### 14.删除track

##### index DELETE

参数:
{
	"route-ID": "S200",
	"ID": "B123"
}

### 17.添加track

##### index POST

参数:
{
	"route-ID": "S200",
	"ID": "B123",
	"loadType": "express",
	"speedLimitation": 300,
	"trackRunningSituation": "running",
	"trackLength": 200,
	"constructionAndOverhaulInformation": "CC23714"
}



### 115.检修中的轨道数

##### count GET

返回：
{
"BrokenTrackNumber":1000
}



## station      郎



### 116.⽤户输⼊城市，显示该城市全部站点

##### city GET

{
"CityName":"上海海市"
}

返回该城市全部站点：
{
"Stations":[
{"StationName":"上海海虹桥站"},
{"StationName":"上海海站"},
{"StationName":"上海海南站"},
]
}

### 124.显示站点基本信息

##### index GET

{
"StationName":"上海海虹桥站"
}

返回
{
"stationAltitude":10.321,
"stationLatitude":-10.321,
"platformNum":10,
"stationType":"客运",
"stationRunningSituation":"运营中",
"TIMEIntoService":"2016/09/01",
"overhaulCycle":"1year",
"lastOverhaulDate":"2017/12/01",
"lastOverhaulResult" :"设施完好",
"constructionDate":"2016/05/01",
"constructionUnit":"同济⼤学施工队",
"reliableAge":"3year"，
"routes":[
"routeName":"京沪线",
"routeName":"四嘉线"
]
}
//以上属性从reliableAge及之前的都为数据库中stationTable和 constructionAndOverhaulInformationTable的属性。
//routes为以该站点为端点的所有线路路。



### 126.修改站点基本信息

##### index PUT

{
"StationName":"上海海虹桥站",
"overhaulCycle":"2year",
"lastOverhaulDate":"2018/03/01",
"lastOverhaulResult" :"设施完好"
}
//后⾯面三个属性为⽤用户在⻚页⾯面更更改后的数据，需要将三个属性 对⽐比，如有变化则更更改为新的数据。

返回
{
"ChangeResult":true
}
//ChangeResult表示更更改结果，可取值为1.true，2.false
//true 表示修改成功，出现"修改成功"提示框，同时刷新界⾯面 展示最新信息，false表示修改失败，出现"修改失败"提示 框。

### 128.删除站点

##### index DELETE

{
"StationName":"上海海虹桥站"
}

返回
{
"DeleteResult":true
}
//DeleteResult表示更更改结果，可取值为1.true，2.false
//true 表示删除成功，出现"删除成功"提示框，返回初始未选 择站点界⾯面，false表示删除失败，出现"删除失败"提示框， 关闭弹窗返回上⼀一步界⾯面。



### 130.添加站点：

##### index POST

{
"StationName":"上海海虹桥站",
"stationAltitude":10.321,
"stationLatitude":-10.321,
"platformNum":10,
"stationType":"客运",
"stationRunningSituation":"运营中",
"TIMEIntoService":"2016/09/01",
"overhaulCycle":"1year",
"lastOverhaulDate":"2017/12/01",
"lastOverhaulResult" :"设施完好",
"constructionDate":"2016/05/01",
"constructionUnit":"同济⼤学施⼯队",
"reliableAge":"3year"
}

返回：
{
"AddResult":true
}
//AddResult表示更更改结果，可取值为1.true，2.false
//true 表示添加成功，出现"添加成功"提示框，⼏几秒钟后关闭 弹窗返回上⼀一步界⾯面，false表示添加失败，出现"添加失败" 提示框，⼏几秒钟后关闭弹窗返回上⼀一步界⾯面。
//点击"确认"按钮后，开始执⾏行行添加。





# 货运     韦

## freightOrder

### 107.订单统计

##### count GET

{
"queryType":"passengerCount"

"from":"2018/07/20/19:32:15"

“to“:“2019/07/20/19:32:15"

}

"freightCount","freightDailyCount"

//queryType为"frightCount"时
{
"freightOrderNumber":1500
}

//queryType为"freightDailyCount"时
{
"dailyOrderFlow":[
{"Date":"2018/07/20","freightOrderNumber":1500},
{"Date":"2018/07/19","freightOrderNumber":1400},
{"Date":"2018/07/18","freightOrderNumber":1300},
{"Date":"2018/07/17","freightOrderNumber":1200},
……
{"Date":"2018/07/11","freightOrderNumber":1500}
]
}

## priceList

### 216.请求货运价格列表

##### index GET

资源：货运价格表priceTable
方法：GET
参数：
返回：
{
"valuationID"：
"freightType"：
"basePriceOneUnit"：
"basePriceOne"：
"basePriceTwoUnit"：
"basePriceTwo"：
}

### 218.修改货运价格

##### index PUT

资源：priceTable
方法：PUT
参数：
{
"valuationID"：
"freightType"：
"basePriceOneUnit"：
"basePriceOne"：
"basePriceTwoUnit"：
"basePriceTwo"：
}



# 客运         周

## user

### 211.注册

##### register POST

资源：用户信息表
方法：POST
参数：
{
"ID"：输入
"Password"：输入
}



### 212.修改密码

##### index PUT

资源：用户信息表
方法：PUT
参数：
{
"ID"：输入
"newPassword"：输入
}



### 109.当前系统内账户数

##### count GET

返回:
{
"AccountNumber":3000000
}
//返回值为当前系统内账户数



## passenger

### 213.添加乘客

##### index POST

资源：passengerTable，用户_乘客表
方法：POST
参数：
{
"passengerID"：
"name"：
"age"：
"conInfo"：
}

### 214.删除乘客

##### Index DELETE

资源：乘客表，用户_乘客表
方法：DELETE
参数：
{
"passengerID"：
}

## costList

### 215.请求客运价格列表

##### index GET

资源：costTable
方法：GET
参数：
返回：
{
"trainType"：
"seatType"：
"accountType"：
"costPerKm"：
}

### 217.修改客运价格

##### Index PUT

资源：costTable
方法：PUT
参数：
{
"trainType"：
"seatType"：
"accountType"：
"costPerKm"：
}

## passengerOrder



### 107.订单统计

##### count GET

{
"queryType":"passengerCount"

"from":"2018/07/20/19:32:15"

“to“:“2019/07/20/19:32:15"

}

//queryType为"passengerCount","passengerDailyCount"

返回：
//queryType为"passengerCount"时
{
"passengerOrderNumber":1500
}

//queryType为"freightDailyCount"时
{
"dailyOrderFlow":[
{"Date":"2018/07/20","passengerOrderNumber":1500},
{"Date":"2018/07/19","passengerOrderNumber":1400},
{"Date":"2018/07/18","passengerOrderNumber":1300},
{"Date":"2018/07/17","passengerOrderNumber":1200},
……
{"Date":"2018/07/11","passengerOrderNumber":1500}
]
}



### 219.查询订单

##### index GET

资源：orderTable
方法：GET
参数：
{
"passengerID"
"trainNum"
}

返回：
{

"order":

[

{
"orderID"
"accountID"
"passengerID"
"trainNum"
"date"
"start"
"end"
"carNumber"
"seatNumber"
"cost"
"completeMethod"
}

]

}

### 221.取消订单

##### index PUT

资源：orderTable
方法：PUT
参数：
{
"passengerID"：
}
Or
{
"trainNum"：
}
修改订单状态completeMethod



### 110+120.某日列车上座率

##### attendance GET

{

"TrainNumber":"Z196",

"Date":"2018/07/21"//若TrainNumber:"all"则无该属性

}

返回：

{

"Percent":0.6922

}

//"TrainNumber":"all“统计所有车上座率



### 103+105+118 流量统计

##### flowCount GET

//以下三种输入输出格式按照queryType依次为"topStations","someStations","pastTenTotal"来区分

统计最高的十个站点客流量
{
"queryType":"topStations",
"Date":"2018/07/21",
"FlowInOut":"流⼊入流量量"
}
//CurrentDate是当前⽇日期，
//FlowInOut表示统计的是流量量类型，in流⼊入流量量，out流出流量量

返回：
{
"TopStations":[
{"StationName":"上海海虹桥站","FlowNumber":10000},
{"StationName":"上海海站","FlowNumber":9000},
{"StationName":"北北京⻄西站","FlowNumber":8000},
{"StationName":"安亭北北站","FlowNumber":7000},
{"StationName":"上海海南站","FlowNumber":6000},
{"StationName":"北北京东站","FlowNumber":5000},
{"StationName":"北北京南站","FlowNumber":4000},
{"StationName":"北北京北北站","FlowNumber":3000},
{"StationName":"南京站","FlowNumber":2000},
{"StationName":"杭州站","FlowNumber":1000}
]
}
//从前到后分别是前⼗十名的站点及其对应的客流量量。

统计站点客流量量
{
"queryType":"someStations",
"stations":[
{"stationName":"上海海虹桥站"},
{"stationName":"上海海站"},
{"stationName":"上海海南站"},
],
"flowType":"按⽇日查询"，
"flowInOut":"流⼊入流量量"
}
//flowType流量量类型，包括：1.按⽇日查询 2.按⽉月查询 3.按年年查 询

返回:
{
"flowResult":[
{"flowNumber":1000},
{"flowNumber":1000},
{"flowNumber":1000},
}
//flowResult与stations⼀一⼀一对应，表示每个站点的客流量量。

展示过去10天的每⽇日流量量
期限：10天（查询当前⽇日期之前的10天内每天的订单数）
{
"queryType":"pastTenTotal",

}

返回：
{
"dailyOrderFlow":[
{"Date":"2018/07/20","orderNumber":1500},
{"Date":"2018/07/19","orderNumber":1400},
{"Date":"2018/07/18","orderNumber":1300},
{"Date":"2018/07/17","orderNumber":1200},
……
{"Date":"2018/07/11","OrderNumber":1500}
]
}
//传回的数组应包含10个元素，即过去⼗十天⾥里里每天的⽇日期和对 应的订单数。



# 运营        张



## trainNumber

### 18.新增车次参数：

##### index POST

{
	"trainNumber": "G2318",
}

## timeTable

### 19.添加固定时刻表

##### index POST

参数：
{
	"trainNumber": "G2318",
	"stationOrder": 0,		//stationOrder应该只有0，1两种取值，代表去向和回向
	"stationID": "P2394",
	"platformNum": "A5",
	"arriveTime": 15:40,
	"leaveTime": 16:00,
	"duration": 00:20
}

### 21.删除固定时刻表

##### index DELETE

参数：

{
	"trainNumber": "G2318",
	"stationOrder": 0
}

### 23.修改固定时刻表

##### index PUT

参数：

//具体如何修改时刻表，以及有何操作待定
{
	"trainNumber": "G2318",
	"stationOrder": 2,
	"stationID": "P2394",
	"platformNum": "A5",
	"arriveTime": 15:40:00,
	"leaveTime": 16:00:00,
	"duration": 00:20:00
}

## dynamicInfo



### 112+122.列车准点率

##### on-time GET

{
"trainNumber":"Z196",

"timeFrame":"过去⼀一周"//若"trainNumber":"yesterdayAll"则无该属性
}
//timeFrame准点率统计期限：
//1.过去⼀一周、 2.过去⼀一⽉月、 3.过去⼀一年年

返回：
//若"trainNumber":"yesterdayAll"
{
"YesterdayFiducialPercent":69.22%
//返回值为昨天所有列列⻋车的准点率。
}

否则
{
"fiducialRate":0.7822
}
//"fiducialRate"计算⽅方式为⽤用（过去⼀一周、 过去⼀一⽉月、 过去 ⼀一年年 ）该⻋车次准点的次数/全部次数。



### 20.添加可变时刻表

### index POST

参数：
{
	"trainNumber": "G2318",
	"stationOrder": 0,
	"DATE": 5/20/2018,
	"stationID": "P2394",
	"platformNum": "A5",
	"arriveTime": 15:40:00,
	"leaveTime": 16:00:00,
	"duration": 00:20:00,
	"condition": "runing",
	"remainingSeatsNumber": 52,
	"crewID": "P348"
}

### 22.删除可变时刻表

### index DELETE

参数:

{
	"trainNumber": "G2318",
	"stationOrder": 0,
	"DATE": 5/20/2018
}





## staff

### 202.删除员工

##### index DELETE

资源：staffTable
方法：DELETE
参数：{"staffID"：输入}

### 203.修改员工信息

##### index PUT

资源：staffTable
方法：PUT
参数：
{
"staffID"：输入
"name"：
"gender"：
"IDCardNumber"：
"typeOfWork"：选择
"position"：选择
}

### 204.查询员工信息

##### index GET

资源：staffTable
方法：GET
参数：{"staffID"：}
返回：
{
"staffID"：
"name"：
"gender"：
"IDCardNumber"：
"typeOfWork"：
"position"：
}

## crew

### 205.添加乘务组

##### index POST

资源：crewTable
方法：POST
参数：
{
"crewID"： 自动生成
}

### 206.删除乘务组

##### index DELETE

资源：crewTable，crew_staffTable
方法：DELETE
参数：
{
"crewID"：输入
}

### 207.修改乘务组信息

##### index PUT

资源：crewTable，crew_staffTable
方法：PUT
参数：

{
"crewID"：
"numberOfPeople"：
"chiefOfCrew"：
"mainDriver"：
"viceDriver"：
}



### 209.查询乘务组

##### index GET

资源：crewTable，crew_staffTable
方法：GET
参数：
{
"crewID"：输入
}

210.返回：
{
"crewID"：
"numberOfPeople"：
"chiefOfCrew"：
"mainDriver"：
"viceDriver"：
}
