import { all } from 'redux-saga/effects';
import authenticateSaga from 'redux/Authenticate/saga';
import forumSaga from 'redux/Forum/saga';
import profileSaga from 'redux/Profile/saga';
import messageSaga from 'redux/Messages/saga';

// Here you can include all the saga which you write for components
export default function* rootSaga() {
  yield all([authenticateSaga(), forumSaga(), profileSaga(), messageSaga()]);
}
