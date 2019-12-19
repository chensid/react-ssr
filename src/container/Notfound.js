import React from "react";
import { Route } from "react-router-dom";

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statuscode = code;
        }
        return children;
      }}
    ></Route>
  );
}

function Notfound(props) {
  // 渲染了这个组件，给staticContext赋值，statusCode=404
  return (
    <Status code={404}>
      <h1>图片</h1>
      <img id="img-404" src="/404.jpg" alt="" />
    </Status>
  );
}

export default Notfound;
