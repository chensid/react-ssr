import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../src/App";
import { getClientStore } from "../src/store/store";
import Header from "../src/component/Header";

// 注水 客户端入口
const Page = (
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Header></Header>
      <Switch>
        {routes.map(route => (
          <Route {...route}></Route>
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
);

if (window.__context) {
  // ssr
  ReactDom.hydrate(Page, document.getElementById("root"));
} else {
  ReactDom.render(Page, document.getElementById("root"));
}
