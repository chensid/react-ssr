// 这里的node代码，会用babel处理
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { StaticRouter, matchPath, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getServerStore } from '../src/store/store';
import routes from '../src/App';
import Header from '../src/component/Header';

const store = getServerStore();
const app = express();
app.use(express.static('public'));
app.get('*', (req, res) => {
  // 获取根据路由渲染的组件，并且拿到loadData方法，获取数据
  // 存储网络请求
  const promises = [];
  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        promises.push(loadData(store));
      }
    }
  });
  // 对promises数组添加了一个回调函数
  const handlePromise = Promise.all(
    promises.map((item, index) => {
      return item.catch(err => {
        console.log(`第${index + 1}个请求出错`);
        return err;
      });
    })
  );
  // 等待所有网络请求结束再渲染
  handlePromise
    .then(() => {
      // 把react组件。解析成html
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <Header></Header>
            {routes.map(route => (
              <Route {...route}></Route>
            ))}
          </StaticRouter>
        </Provider>
      );
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
      res.send('出错了');
    });
});

app.listen(9093, () => {
  console.log('端口9093监听完毕');
});
