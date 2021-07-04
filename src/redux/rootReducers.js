import authenticateReducer from 'redux/Authenticate/reducer';
import forumReducer from 'redux/Forum/reducer';

//Include all the reducer to combine and provide to configure store.
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  authenticateReducer,
  forumReducer,
};
