import actions from 'redux/Messages/actions';
const initialState = {
  contacts: [],
  messages: {},
  // isAuthenticated: sessionStorage.getItem('userToken'),
  // loader: false,
  // authToken: sessionStorage.getItem('userToken'),
  // userType: sessionStorage.getItem('userType'),
  // userId: sessionStorage.getItem('userId'),
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETCONTACTS_SUCCESS:
      if (!shallowCompare(state.contacts, action.contacts))
        return { ...state, contacts: [...action.contacts] };
      else return state;

    case actions.GETMESSAGES_SUCCESS:
      let newMessages = { ...state.messages };
      newMessages[action.toUser] = action.messages;
      return {
        ...state,
        messages: {
          ...newMessages,
        },
      };
    case actions.POSTMESSAGE_SUCCESS:
      return { ...state, contacts: action.contacts };
    // case actions.POSTMESSAGE_FAILURE:
    //   return { ...state, contacts: action.contacts };
    default:
      return state;
  }
}

export default Reducer;

const shallowCompare = (a, b) => {
  for (var key in a) {
    if (!(key in b)) {
      return false;
    }
  }
  for (var key in b) {
    if (!(key in a)) {
      return false;
    }
  }
  return true;
};
