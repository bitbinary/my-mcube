import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Forum/actions';
import { getRequest } from 'Config/axiosClient';

function* getFeeds(action) {
  try {
    const response = yield call(() => getRequest('posts?limit=10'));
    if (response.status >= 200 || response.status <= 204)
      yield put({ type: actions.GETFEEDS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETFEEDS_FAILURE, e });
  }
}

function* addFeeds(action) {
  try {
    const response = yield call(() => getRequest('posts?limit=10'));
    if (response.status >= 200 || response.status <= 204)
      yield put({ type: actions.ADDFEEDS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDFEEDS_FAILURE, e });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GETFEEDS, getFeeds),
    takeLatest(actions.ADDFEEDS, addFeeds),
  ]);
}
