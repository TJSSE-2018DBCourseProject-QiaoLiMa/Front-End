**需要大家更新的部分为请求接口部分**

具体实现的功能点参考之前的文档

_______

_______

# 设计

开放两个前端应用（客户和管理员），用户系统管理登陆状态并与决定请求哪一个应用

### 客户框架

+ 主页
+ 我的订单



### 管理员框架

+ 统计
+ 站点
+ 铁路线
+ 列车
+ 时刻表
+ 价格表
+ 员工
+ 订单



### 用户系统

______

______

# 进度

7.20 24:00截止

1.主框架成型

2.各“模块？”极其延伸子页面设计提交（简单画图，不用考虑优美，表达逻辑就可以）

3.描述所有要求的接口（第一版可更改）

_____

______

# 素材

UI框架：element-angular 

### icon

框架自带icon：https://element-angular.faas.ele.me/basic/icon

第三方icon：http://www.iconfont.cn/collections/index?spm=a313x.7781069.1998910419.3&page=1

如何在此框架下使用第三方icon请自行查询教程

-----------------

--------------

# 其他参考

### 数据要求

比如“请求历史订单跟随参数包括，筛选状态，排序方式”，

参数示例 格式json

```json
{
    "Status":"All",
    "SortedBy":"Time",
    "Count":20
}
```



### REST

> 匹配REST设计风格的Web API称为**RESTful API**。它从以下三个方面资源进行定义：
>
> - 直观简短的资源地址：URI，比如：`http://example.com/resources/`。
> - 传输的资源：Web服务接受与返回的[互联网媒体类型](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%AA%92%E4%BD%93%E7%B1%BB%E5%9E%8B)，比如：[JSON](https://zh.wikipedia.org/wiki/JSON)，[XML](https://zh.wikipedia.org/wiki/XML)，[YAML](https://zh.wikipedia.org/wiki/YAML)等。
> - 对资源的操作：Web服务在该资源上所支持的一系列[请求方法](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95)（比如：POST，GET，PUT或DELETE）。
>
> 下表列出了在实现RESTful API时HTTP请求方法的典型用途。
>
> | 资源                                                   | GET                                                          | PUT                                                   | POST                                                         | DELETE               |
> | ------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------ | -------------------- |
> | 一组资源的URI，比如`https://example.com/resources/`    | **列出**URI，以及该资源组中每个资源的详细信息（后者可选）。  | 使用给定的一组资源**替换**当前整组资源。              | 在本组资源中**创建/追加**一个新的资源。该操作往往返回新资源的URL。 | **删除**整组资源。   |
> | 单个资源的URI，比如`https://example.com/resources/142` | **获取**指定的资源的详细信息，格式可以自选一个合适的网络媒体类型（比如：XML、JSON等） | **替换/创建**指定的资源。并将其追加到相应的资源组中。 | 把指定的资源当做一个资源组，并在其下**创建/追加**一个新的元素，使其隶属于当前资源。 | **删除**指定的元素。 |
>
> 

______

_____



# 请求接口

**大家把请求接口添加在这里！**

示例：

### 模块：订单

#### 1.请求订单列表

资源：订单列表

方法：GET

参数示例：{ "Status":"All", "SortedBy":"Chronological", "Count":20 }

参数描述：

+ Status 订单状态，包括：

  1.All 

  2.Pending

  3.Exceptional

  ......

  

其他：管理员根据条件筛选订单…….

















