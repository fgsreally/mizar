# 上报数据格式
## 请求
### xhr/fetch
```ts
const data = {
  // ...
  // level:'error'/'log'
  type: 'xhr', // 'fetch'
  message: `${method} "${url}" with "${JSON.stringify(params)}" took ${elapsedTime! / 1000} seconds`,
  data: { method, url, params, elapsedTime, status },
}
```

## 错误

### error
```ts
const data = {
  message: `fail to load ${source_type} from '${href}'`,
  type: 'resource',
  level: 'error',
  data: {
    source_type,
    href,

  },
}
```

### reject

```ts
const data = {
// ..
  type: 'reject',
  level: 'error',
  message,
  data: { stack },
}
```

## 行为

### history/hash
```ts

const data={
    //...
    type:'hash'//history
      data: {
          from, to,
        },
}
```

### dom
```ts
const data = {
  type: 'dom',
  message: `click dom (${htmlString})`,
  data: {
    xpath,
    htmlString,
  },
}
```


## 性能
```ts
const data = {
  // ..
  level: 'performance',
  type,
  data
}
```




## 特殊