import actions from 'redux/Authenticate/actions';

const initialState = {
  isAuthenticated: false,
  loader: false,
  authToken: null,
  userType: null,
  userId: null,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, loader: true };
    case actions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        authToken: null,
        userType: null,
        loader: false,
      };
    case actions.LOGIN_SUCCESS:
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
