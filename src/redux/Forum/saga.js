import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Forum/actions';
import { getRequest, postRequest } from 'Config/axiosClient';

function* getFeeds(action) {
  try {
    const response = yield call(() => getRequest(`posts/${10}/${10}`));
    if (response.status >= 200 || response.status <= 204)
      yield put({ type: actions.GETFEEDS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETFEEDS_FAILURE });
  }
}

function* addFeeds(action) {
  try {
    const response = yield call(() => getRequest(`posts/${10}/${10}`));
    if (response.status >= 200 || response.status <= 204)
      yield put({ type: actions.ADDFEEDS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDFEEDS_FAILURE, e });
  }
}

function* addpost(action) {
  console.log('successfullcall ');
  try {
    const response = yield call(() => postRequest('posts', action.payload));
    if (response.status >= 200 || response.status <= 204) {
      yield put({ type: actions.ADDPOST_SUCCESS, data: response.data });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDPOST_FAILURE, e });
  }
}

//Recommendations
function* getRecomm(action) {
  try {
    const response = yield call(() =>
      getRequest(`recommendation/${action.params.recommType}/7`),
    );
    if (response.status >= 200 || response.status <= 204)
      yield put({
        type: actions.GETRECOMM_SUCCESS,
        data: response.data.recommendations,
        recommType: action.params.recommType,
      });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETRECOMM_FAILURE, e });
  }
}
function* addRecomm(action) {
  try {
    const response = yield call(() =>
      getRequest(`recommendation/${action.params.recommType}/7`),
    );
    if (response.status >= 200 || response.status <= 204)
      yield put({
        type: actions.ADDRECOMM_SUCCESS,
        data: response.data.recommendations,
        recommType: action.params.recommType,
      });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDRECOMM_FAILURE, e });
  }
}

function* searchPosts(action) {
  console.log('going to call ', action.params.searchString);
  try {
    const response = yield call(() =>
      postRequest(`search/${action.params.searchString}`),
    );
    console.log(response);
    if (response.status >= 200 || response.status <= 204)
      yield put({
        type: actions.SEARCH_SUCCESS,
        data: response.data.recommendations,
        success: response.data.success,
      });
    else throw response.statusText;
  } catch (e) {
    yield put({
      type: actions.SEARCH_FAILURE,
      success: false,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GETFEEDS, getFeeds),
    takeLatest(actions.ADDFEEDS, addFeeds),
    takeLatest(actions.GETRECOMM, getRecomm),
    takeLatest(actions.ADDRECOMM, addRecomm),
    takeLatest(actions.SEARCHFEEDS, searchPosts),
    takeLatest(actions.ADDPOST, addpost),
  ]);
}
