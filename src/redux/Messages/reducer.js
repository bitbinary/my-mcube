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
      return { ...state, contacts: action.contacts };
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
    case actions.POSTMESSAGE_FAILURE:
      return { ...state, contacts: action.contacts };
    default:
      return state;
  }
}

export default Reducer;
