import { all, call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';

import actions from 'redux/Messages/actions';
import { getRequest, postRequest } from 'Config/axiosClient';

function* getContacts(action) {
  try {
    const response = yield call(() =>
      getRequest(`chat_contactlist/${action.userId}`),
    );
    if (response?.data?.success) {
      yield put({
        type: actions.GETCONTACTS_SUCCESS,
        contacts: response?.data?.data,
      });
    } else {
      yield put({ type: actions.GETCONTACTS_FAILURE });
    }
  } catch (e) {
    yield put({ type: actions.GETCONTACTS_FAILURE });
  }
}
function* getMessages(action) {
  try {
    const response = yield call(() =>
      getRequest(`chat/${action.fromUser}/${action.toUser}`),
    );
    if (response?.data?.success) {
      // notification['success']({
      //   message: 'Welcome back',
      //   description: response?.data?.message,
      //   placement: 'bottomRight',
      // });
      yield put({
        type: actions.GETMESSAGES_SUCCESS,
        messages: response?.data?.data,
        toUser: action.toUser,
      });
    } else {
      yield put({
        type: actions.GETMESSAGES_FAILURE,
        toUser: action.toUser,
      });
    }
  } catch (e) {
    yield put({ type: actions.GETMESSAGES_FAILURE });
  }
}

function* postMessages(action) {
  try {
    const response = yield call(() => postRequest('chat', action.payload));
    if (response?.data?.success) {
      yield put({
        type: actions.GET_MESSAGES,
        toUser: action.payload.to_user_id,
        fromUser: action.payload.from_user_id,
      });
    } else {
      yield put({ type: actions.POSTMESSAGE_FAILURE });
    }
  } catch (e) {
    yield put({ type: actions.POSTMESSAGE_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GETCONTACTS, getContacts)]);
  yield all([takeLatest(actions.GET_MESSAGES, getMessages)]);
  yield all([takeLatest(actions.POSTMESSAGE, postMessages)]);
}
