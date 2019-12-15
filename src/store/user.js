// 首页的逻辑
import axios from 'axios';
const GET_LIST = 'INDEX/USER_INFO';

// actionCreator
const changeUserInfo = data => ({
  type: GET_LIST,
  data
});

export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:9090/api/user/info').then(res => {
      const { data } = res.data;
      dispatch(changeUserInfo(data));
    });
  };
};

const defaultState = {
  userinfo: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        userinfo: action.data
      };
      return newState;
    default:
      return state;
  }
};
