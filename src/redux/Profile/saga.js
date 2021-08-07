import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Profile/actions';
import { postRequest, getRequest, putRequest } from 'Config/axiosClient';
import { notification } from 'antd';

function* getUserDetails(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/${action.payload.user_id}`),
    );
    if (response.status === 200) {
      yield put({ type: actions.GETUSERDETAILS_SUCCESS, data: response.data });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETUSERDETAILS_FAILURE, e });
  }
}

function* editUserDetails(action) {
  try {
    const response = yield call(() =>
      putRequest(
        `user/profile/${action.payload.user_id}`,
        action.payload.profile,
      ),
    );
    if (response.status === 200) {
      notification['info']({
        message: 'Updated user details',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({ type: actions.EDITUSERDETAILS_SUCCESS, data: response.data });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.EDITUSERDETAILS_FAILURE, e });
  }
}

function* getUserProjects(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/projects/${action.payload.user_id}`),
    );
    if (response.status === 200)
      yield put({ type: actions.GETUSERPROJECTS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETUSERPROJECTS_FAILURE, e });
  }
}

function* getSkills(action) {
  try {
    const response = yield call(() => getRequest('skill'));
    if (response.status === 200)
      yield put({ type: actions.GETSKILLS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETSKILLS_FAILURE, e });
  }
}

function* addSkill(action) {
  try {
    const response = yield call(() =>
      postRequest(`skill/${action.payload.skill}`),
    );
    if (response.status === 200 && response.data.success === true)
      yield put({ type: actions.ADDSKILL_SUCCESS, data: response.data });
    else if (response.status === 200 && response.data.success === false)
      yield put({ type: actions.ADDSKILL_ERROR, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDSKILL_FAILURE, e });
  }
}

function* getUserSkills(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/skills/${action.payload.user_id}`),
    );
    if (response.status === 200)
      yield put({ type: actions.GETUSERSKILLS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETUSERSKILLS_FAILURE, e });
  }
}

function* getUserReviews(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/review/${action.payload.user_id}`),
    );
    if (response.status === 200)
      yield put({ type: actions.GETUSERREVIEWS_SUCCESS, data: response.data });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETUSERREVIEWS_FAILURE, e });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GETUSERDETAILS, getUserDetails),
    takeLatest(actions.EDITUSERDETAILS, editUserDetails),
    takeLatest(actions.GETUSERPROJECTS, getUserProjects),
    takeLatest(actions.GETSKILLS, getSkills),
    takeLatest(actions.ADDSKILL, addSkill),
    takeLatest(actions.GETUSERSKILLS, getUserSkills),
    takeLatest(actions.GETUSERREVIEWS, getUserReviews),
  ]);
}
