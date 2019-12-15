# react-ssr

#### 一、 同构应用架构讲解

简单点理解就是：将组件或页面通过服务器解析然后生成html字符串，再发送给浏览器，最后再将功能js"混合"为客户端浏览器上完全交互的应用程序

#### 二、 SSR利弊

- 优势
  1. 更利于SEO
  2. 更利于首屏渲染
- 劣势
  1. 服务器压力较大（高并发情况下）
  2. ...（待补充）

#### 三、涉及核心API

1. renderToString

```react
import { renderToString } from 'react-dom/server';
React 提供了renderToString 方法用来将组件输出成 HTML 字符串
```

2. StaticRouter 以及 BrowserRouter

```react
import { StaticRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
StaticRouter: 用于服务端端渲染
BrowserRouter: 用于客户端
```

	- StaticRouter 以及 BrowserRouter区别（待补充）

3. matchPath

```react
import { matchPath } from 'react-router-dom';
服务端匹配路由
```

#### 四、待补充...