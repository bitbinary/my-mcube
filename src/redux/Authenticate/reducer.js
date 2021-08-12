import actions from 'redux/Authenticate/actions';
const initialState = {
  isAuthenticated: sessionStorage.getItem('userToken'),
  loader: false,
  authToken: sessionStorage.getItem('userToken'),
  userType: sessionStorage.getItem('userType'),
  userId: sessionStorage.getItem('userId'),
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, loader: true };
    case actions.LOGOUT:
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('userType');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');

      return {
        ...state,
        isAuthenticated: false,
        authToken: null,
        userType: null,
        loader: false,
        userId: null,
      };
    case actions.LOGIN_SUCCESS:
      try {
        sessionStorage.setItem('userToken', action.data.token);
        sessionStorage.setItem('userType', action.userType);
        sessionStorage.setItem('userId', action.data.user_id.split('_')[1]);
      } catch (e) {
        console.error(e);
      }
      return {
        ...state,
        isAuthenticated: action.data.success,
        authToken: action.data.token,
        userType: action.userType,
        loader: false,
        userId: action.data.user_id.split('_')[1],
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        authToken: null,
        userType: null,
        loader: false,
      };
    default:
      return state;
  }
}

export default Reducer;
