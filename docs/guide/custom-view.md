# 自定义视图
> 这不限制任何框架/打包器，没有任何规范要求
> 案例[详见]()

## 获取配置信息
额，虽然没有强制规定，但建议遵守:配置信息来自三部分，一部分是通过`query`，一部分是通过`puppeteer`注入,[详见]()，一部分通过`mizar-monitor`注入,[详见]()。
直接复制以下就好
```ts
export function getQuery(key: string) {
  return new URLSearchParams(location.href.split('?')[1] || '').get(key)
}

// config injected from mizar-cli(puppeteer)
export function getPuppeteerState(key?: string) {
  return key ? window.MIZAR_PUPPETEER_STATE?.[key] : window.MIZAR_PUPPETEER_STATE
}

// config injected from mizar-monitor
export function getMonitorState(key?: string) {
  return key ? window.MIZAR_SDK?.[key] : window.MIZAR_SDK
}

export function getGlobal(key: string) {
  return getQuery(key) || getPuppeteerState(key) || getMonitorState(key)
}
```
然后所有需要的配置信息，就通过`getGlobal`拿


## 添加视图到`mizar-cli`
如果不在乎诸如`css/js`的隔离，直接打包，把对应`js/css`资源以标签的形式写到`cli`的配置中

```ts
import { defineConfig, merakTag } from 'mizar-cli'
export default defineConfig({
// ..
  fetch: {
    htmlTags: [
      '<script src="xx"></script>', // js
      '<link href="xx" rel="stylesheet"></link>'// css
    ],
  },

})
```

如果需要隔离，安装插件`vite-plugin-merak`/`webpack-plugin-merak`(具体详见[merak]())，然后打包,`cli`配置如下
```ts
import { defineConfig, merakTag } from 'mizar-cli'
export default defineConfig({
// ..
  fetch: {

    htmlTags: [
      merakTag('name', 'html对应的url'),
    ],
  },

})
```
