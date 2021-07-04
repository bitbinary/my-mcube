import actions from 'redux/Forum/actions';

const initialState = {
  forumpage: 'Feeds',
  loader: true,
  searchselectedskills: [],
  searchselectedtypes: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    // case actions.LOGIN:
    //   return { ...state, loader: true };
    // case actions.LOGOUT:
    //   return { ...state, isAuthenticated: false, loader: false };
    // case actions.LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     isAuthenticated: !!action.response.data.token,
    //     loader: false,
    //   };
    case actions.FORUMPAGECHANGE:
      return { ...state, forumpage: action.payload.forumpage, loader: false };
    case actions.TOGGLELOADING:
      return { ...state, loader: action.payload.loader };
    case actions.UPDATESEARCHSKILLS:
      return {
        ...state,
        searchselectedskills: action.payload.searchSkillsSelected,
      };
    case actions.UPDATESEARCHTYPES:
      return {
        ...state,
        searchselectedtypes: action.payload.searchselectedtypes,
      };
    default:
      return state;
  }
}

export default Reducer;
