# 插件
负责浏览器中采集并上报数据
在应用中添加
> 需要什么功能就加什么插件，没有插件，就没有任何功能，不会上报任何东西
```ts
import { type Plugin, monitor } from 'mizar-monitor'
monitor({
  // ..
  plugins: [] as Plugin[],

})
```
类型声明如下
```ts
export type Plugin = (ctx: MonitorCtx) => void
```

内置插件[详见]()