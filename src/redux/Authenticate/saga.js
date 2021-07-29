import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Authenticate/actions';
import { postRequest } from 'Config/axiosClient';

function* login(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => postRequest('login', action.payload));
    if (response?.data?.success) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        data: response?.data,
        userType: action.payload.usertype,
      });
    } else if (response?.data?.success === false) {
      yield put({
        type: actions.LOGIN_FAILURE,
        message: response?.data?.message,
      });
    } else {
      yield put({
        type: actions.LOGIN_FAILURE,
        message: 'Failed to complete login request',
      });
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
    } else if (response?.data?.success === false) {
      yield put({
        type: actions.LOGIN_FAILURE,
        message: response?.data?.message,
      });
    } else {
      yield put({
        type: actions.LOGIN_FAILURE,
        message: 'Failed to complete login request',
      });
    }
  } catch (e) {
    yield put({ type: actions.LOGIN_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
  yield all([takeLatest(actions.SIGNUP, signup)]);
}
