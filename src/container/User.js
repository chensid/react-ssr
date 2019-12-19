import React from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user";
import { Redirect } from "react-router-dom";

function User(props) {
  // 比如登录逻辑判断，没登录跳转到登录页，判断cookie等
  return (
    <Redirect to="/about"></Redirect>
    // <div>
    //   <h1>
    //     你好{props.userinfo.name},{props.userinfo.best}
    //   </h1>
    // </div>
  );
}
User.loadData = store => {
  return store.dispatch(getUserInfo());
};
export default connect(state => ({ userinfo: state.user.userinfo }))(User);
