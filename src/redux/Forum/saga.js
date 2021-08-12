import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Forum/actions';
import { getRequest, postRequest } from 'Config/axiosClient';
import { notification } from 'antd';
function* getFeeds(action) {
  try {
    const response = yield call(() => getRequest('posts'));
    if (response.status >= 200 || response.status <= 204)
      yield put({ type: actions.GETFEEDS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETFEEDS_FAILURE });
  }
}

function* addFeeds(action) {
  try {
    const response = yield call(() => getRequest('posts'));
    if (response.status >= 200 || response.status <= 204) {
      yield put({ type: actions.ADDFEEDS_SUCCESS, data: response.data });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDFEEDS_FAILURE, e });
  }
}

function* addpost(action) {
  try {
    const response = yield call(() => postRequest('posts', action.payload));
    if (response?.data?.success) {
      notification['success']({
        message: 'Added new post',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({ type: actions.GETFEEDS, data: response.data });
    } else {
      notification['error']({
        message: 'Failed to add new post',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.ADDPOST_FAILURE,
        message: response?.data?.message,
      });
    }
  } catch (e) {
    notification['error']({
      message: 'Failed to add new post',
      description: 'There is an internal error',
      placement: 'bottomRight',
    });
    yield put({ type: actions.ADDPOST_FAILURE, e });
  }
}

//Recommendations
function* getRecomm(action) {
  try {
    const response = yield call(() =>
      getRequest(
        `recommendation/${action.params.recommType}/${action.params.user_id}`,
      ),
    );
    if (response.status >= 200 || response.status <= 204) {
      notification['info']({
        message: 'Updated Recommendations',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.GETRECOMM_SUCCESS,
        data: response.data.recommendations,
        recommType: action.params.recommType,
      });
    } else throw response.statusText;
  } catch (e) {
    yield put({
      type: actions.GETRECOMM_FAILURE,
      e: 'Failed to collect Recommendations',
    });
  }
}
function* addRecomm(action) {
  try {
    const response = yield call(() =>
      getRequest(
        `recommendation/${action.params.recommType}/${action.params.user_id}`,
      ),
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
  try {
    const response = yield call(() =>
      postRequest(`search/${action.params.searchString}`),
    );
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

// COMMENTS
function* addComment(action) {
  const { userId, postId, comment } = action.payload;
  try {
    const response = yield call(() =>
      postRequest(`posts/comments/${userId}/${postId}/${comment}`),
    );
    if (response?.data?.success) {
      notification['success']({
        message: 'Added new comment',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({ type: actions.GETFEEDS });
    } else {
      notification['error']({
        message: 'Failed to add new post',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.ADDCOMMENT_FAILURE,
        message: response?.data?.message,
      });
    }
  } catch (e) {
    notification['error']({
      message: 'Failed to add new post',
      description: 'There is an internal error',
      placement: 'bottomRight',
    });
    yield put({ type: actions.ADDCOMMENT_FAILURE, e });
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
    takeLatest(actions.ADDCOMMENT, addComment),
  ]);
}
