import { all, call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';

import actions from 'redux/Authenticate/actions';
import { postRequest } from 'Config/axiosClient';

function* login(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => postRequest('login', action.payload));
    if (response?.data?.success) {
      notification['success']({
        message: 'Welcome back',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.LOGIN_SUCCESS,
        data: response?.data,
        userType: action.payload.usertype,
      });
    } else {
      notification['error']({
        message: 'Failed to login',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({ type: actions.LOGIN_FAILURE });
    }
  } catch (e) {
    yield put({ type: actions.LOGIN_FAILURE });
  }
}

function* signup(action) {
  try {
    const response = yield call(() => postRequest('signup', action.payload));
    if (response?.data?.success) {
      notification['success']({
        message: 'Welcome to Mcube.',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.LOGIN_SUCCESS,
        data: response?.data,
        userType: action.payload.usertype,
      });
    } else {
    }
  } catch (e) {
    notification['error']({
      message: 'Looks like the request was not successfull.',
      description: e?.message,
      placement: 'bottomRight',
    });
    yield put({ type: actions.LOGIN_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
  yield all([takeLatest(actions.SIGNUP, signup)]);
}
