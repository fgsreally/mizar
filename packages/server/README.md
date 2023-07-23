# mizar-server

数据库使用`mongodb`,服务端的部分基于`phecda-server`，写法基本和`nestjs`一致，非常简单，

分为五个部分
1. 存储`report`：直接往mongodb的一个集合(`report`)里丢
2. 统计`record`: 定时任务，通过serverless调用：对数据库里的数据操作，并存入另一个集合(`record`)
3. 查询`query`：前端通过api调用，查找集合(`record`)中需要的部分，返回给前端
4. 扩展部分，可以理解为将`mizar`的数据转交给其他应用，现在只有一个`linear`,
5. 其他部分，用户/项目/配置，大可不必关心

> 直接看modules文件夹下就行，需要更改，找对应的部分改就行


假如你想统计


