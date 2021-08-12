import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from 'redux/Profile/actions';
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from 'Config/axiosClient';
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

function* getTempUserDetails(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/${action.payload.user_id}`),
    );
    if (response.status === 200) {
      yield put({
        type: actions.GETTEMPUSERDETAILS_SUCCESS,
        data: response.data,
        userId: action.payload.user_id,
      });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETTEMPUSERDETAILS_FAILURE, e });
  }
}

function* getAvgUserRating(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/avg_ratings/${action.payload.user_id}`),
    );
    console.log(response.data);
    if (response.status === 200)
      yield put({
        type: actions.GETAVGUSERRATING_SUCCESS,
        data: response.data,
      });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETAVGUSERRATING_FAILURE, e });
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
      yield put({ type: actions.GETUSERDETAILS });
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

function* getTempUserProjects(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/projects/${action.payload.user_id}`),
    );
    if (response.status === 200)
      yield put({
        type: actions.GETTEMPUSERPROJECTS_SUCCESS,
        data: response.data,
        userId: action.payload.user_id,
      });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETTEMPUSERPROJECTS_FAILURE, e });
  }
}

function* addUserProject(action) {
  try {
    const response = yield call(() =>
      postRequest(
        `project/${action.payload.user_id}`,
        action.payload.project_details,
      ),
    );
    if (response.status === 200) {
      notification['success']({
        message: 'Added new project',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.CREATEUSERPROJECT_SUCCESS,
        data: response.data,
      });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.CREATEUSERPROJECT_FAILURE, e });
  }
}

function* deleteOrUnfollowProject(action) {
  try {
    const response = yield call(() =>
      deleteRequest(
        `project/user_id/${action.payload.project_id}/${action.payload.user_id}`,
      ),
    );
    if (response.status === 200) {
      notification['success']({
        message: 'Removed project successfully',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.DELETEORUNFOLLOWPROJECT_SUCCESS,
        data: response.data,
      });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.DELETEORUNFOLLOWPROJECT_FAILURE, e });
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
    if (response.status === 200 && response.data.success === true) {
      notification['success']({
        message: 'Added new skill',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({ type: actions.GETSKILLS });
    } else if (response.status === 200 && response.data.success === false) {
      notification['error']({
        message: 'Error while adding new skill',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({ type: actions.ADDSKILL_ERROR, data: response.data });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDSKILL_FAILURE, e });
  }
}

function* getUserSkills(action) {
  console.log('calling Saga');
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

function* updateUserSkills(action) {
  try {
    const response = yield call(() =>
      putRequest(
        `user/skills/${action.payload.user_id}`,
        action.payload.skills,
      ),
    );
    if (response.status === 200) {
      notification['info']({
        message: 'Updated user skills',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.GETUSERSKILLS,
        payload: {
          user_id: action.payload.user_id,
        },
      });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.UPDATEUSERSKILLS_FAILURE, e });
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
function* getTempUserReviews(action) {
  try {
    const response = yield call(() =>
      getRequest(`user/review/${action.payload.user_id}`),
    );
    if (response.status === 200)
      yield put({
        type: actions.GETTEMPUSERREVIEWS_SUCCESS,
        data: response.data,
        userId: action.payload.user_id,
      });
    else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.GETUSERREVIEWS_FAILURE, e });
  }
}

function* addUserReview(action) {
  try {
    const response = yield call(() =>
      postRequest(`user/review`, action.payload),
    );
    if (response.status === 200 && response.data.success === true) {
      notification['success']({
        message: 'Added new review',
        description: response?.data?.message,
        placement: 'bottomRight',
      });
      yield put({
        type: actions.GETUSERREVIEWS,
        payload: {
          user_id: action.payload.toUserID,
        },
      });
    } else throw response.statusText;
  } catch (e) {
    yield put({ type: actions.ADDUSERREVIEW_FAILURE, e });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GETUSERDETAILS, getUserDetails),
    takeLatest(actions.GETTEMPUSERDETAILS, getTempUserDetails),
    takeLatest(actions.GETAVGUSERRATING, getAvgUserRating),
    takeLatest(actions.EDITUSERDETAILS, editUserDetails),
    takeLatest(actions.GETUSERPROJECTS, getUserProjects),
    takeLatest(actions.GETTEMPUSERPROJECTS, getTempUserProjects),
    takeLatest(actions.CREATEUSERPROJECT, addUserProject),
    takeLatest(actions.DELETEORUNFOLLOWPROJECT, deleteOrUnfollowProject),
    takeLatest(actions.GETSKILLS, getSkills),
    takeLatest(actions.ADDSKILL, addSkill),
    takeLatest(actions.GETUSERSKILLS, getUserSkills),
    takeLatest(actions.UPDATEUSERSKILLS, updateUserSkills),
    takeLatest(actions.GETUSERREVIEWS, getUserReviews),
    takeLatest(actions.GETTEMPUSERREVIEWS, getTempUserReviews),
    takeLatest(actions.ADDUSERREVIEW, addUserReview),
  ]);
}
