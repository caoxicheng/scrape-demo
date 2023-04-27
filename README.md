# scrape-demo

## 基础使用

```sh
pnpm start
// 或者
npm start
```

## 关键代码
```src/scraper.ts
根据URL以及需要捕获的标签获取内容
```

```src/index.ts
web-service
// 调用方式参考http://localhost:3000/scrape?url=https://godlike.top
// 修改文件中的标签名来自定义选取内容
```
