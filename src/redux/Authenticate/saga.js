import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Authenticate/actions';
import { getRequest } from 'Config/axiosClient';

function* login(action) {
  try {
    const response = yield call(() => getRequest('login/1', action.payload));
    yield put({ type: actions.LOGIN_SUCCESS, status: response.data.status });
  } catch (e) {
    yield put({ type: actions.LOGIN_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.LOGIN, login)]);
}
