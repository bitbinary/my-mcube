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
        message: 'Glad to see you.',
        description: response?.data?.message,
        placement: 'topRight',
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
        placement: 'topRight',
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
    console.log(response);
    if (response?.data?.success) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        data: response?.data,
        userType: action.payload.usertype,
      });
    } else {
    }
  } catch (e) {
    yield put({ type: actions.LOGIN_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
  yield all([takeLatest(actions.SIGNUP, signup)]);
}
