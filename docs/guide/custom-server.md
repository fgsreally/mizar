# 自定义服务端
服务端部分使用了[phecda-server]和[typegoose]，相当于`nestjs`写法的`express`，
可以直接将[server]()直接复制一份，也可以用`npm`引入需要的模块。
建议关注两部分
## 定时操作
> 以`npm`引入为例
> 相当于项目下的`record`模块
使用`typegoose`的查询`report`的集合，（主要利用聚合查询），统计数据，并放到统计数据的集合中

## 查询操作
> 以`npm`引入为例
> 相当于项目下的`query`模块
使用`typegoose`的查询`report/record`的集合，创建接口用于自定义视图
