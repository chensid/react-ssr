// 这里的node代码，会用babel处理
import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter, matchPath, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import proxy from "http-proxy-middleware";
import { getServerStore } from "../src/store/store";
import routes from "../src/App";
import Header from "../src/component/Header";

const store = getServerStore();
const app = express();
app.use(express.static("public"));

// 客户端来的api开头的请求
app.use("/api", proxy({ target: "http://localhost:9090", changeOrigin: true }));

function csrRender(res) {
  // 读取csr文件，返回
  const filename = path.resolve(process.cwd(), "public/index.csr.html");
  const html = fs.readFileSync(filename, "utf-8");
  return res.send(html);
}

app.get("*", (req, res) => {
  if (req.query._mode == "csr") {
    console.log("url参数开启csr降级");
    return csrRender(res);
  }
  // 配置开关开启csr
  // 服务器负载过高开启csr

  // 获取根据路由渲染的组件，并且拿到loadData方法，获取数据

  // if(req.url.startsWith('/api/')) {
  //   // 不渲染页面，使用axios转发
  // }

  // 存储网络请求
  const promises = [];
  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        // 规避报错，可以追加日志
        const promise = new Promise((resolve, reject) => {
          loadData(store)
            .then(resolve)
            .catch(resolve);
        });
        promises.push(promise);
        // promises.push(loadData(store));
      }
    }
  });
  // 等待所有网络请求结束再渲染
  Promise.all(promises)
    .then(() => {
      const context = {};
      // 把react组件。解析成html
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header></Header>
            <Switch>
              {routes.map(route => (
                <Route {...route}></Route>
              ))}
            </Switch>
          </StaticRouter>
        </Provider>
      );
      if (context.statuscode) {
        // 状态切换和页面控制
        res.status(context.statuscode);
      }
      if (context.action == "REPLACE") {
        res.redirect(301, context.url);
      }
      res.send(`
          <html>
              <head>
                  <meta charset="utf-8" />
                  <title>react ssr</title>
              </head>
              <body>
                  <div id="root">${content}</div>
                  <script>
                    window.__context = ${JSON.stringify(store.getState())}
                  </script>
                  <script src="bundle.js"></script>
              </body>
          </html>
      `);
    })
    .catch(err => {
      res.send("出错了");
    });
});

app.listen(9093, () => {
  console.log("端口9093监听完毕");
});
