import actions from 'redux/Forum/actions';

const initialState = {
  forumpage: 'Feeds',
  loader: true,
  searchselectedskills: [],
  searchselectedtypes: [],
  recommendationsselectedtypes: [],
  addPostDraftState: false,
  addPostDraft: {
    postTitle: '',
    postDescription: '',
    relatedProjectID: '',
  },
  addPostLoader: false,
  searchLoader: false,
  recommendationLoader: false,
  contentFeeds: [],
  contentSearch: [],
  contentRecom: [],
  feedLoading: true,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETFEEDS_SUCCESS:
      return {
        ...state,
        contentFeeds: [...action.data],
        feedLoading: false,
      };
    case actions.GETFEEDS_FAILURE:
      return { ...state };
    case actions.ADDFEEDS_SUCCESS:
      return {
        ...state,
        contentFeeds: [...state.contentFeeds, ...action.data],
        feedLoading: false,
      };
    case actions.ADDFEEDS_FAILURE:
      return { ...state };
    case actions.FEEDLOADING:
      return { ...state, feedLoading: action.isloading };
    case actions.FORUMPAGECHANGE:
      return { ...state, forumpage: action.payload.forumpage, loader: false };
    case actions.TOGGLELOADING:
      return { ...state, loader: action.payload.loader };
    case actions.TOGGLESTATE:
      return { ...state, [action.payload.label]: action.payload.value };
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
    case actions.UPDATERECOMTYPES:
      return {
        ...state,
        recommendationsselectedtypes:
          action.payload.recommendationsselectedtypes,
      };
    default:
      return state;
  }
}

export default Reducer;
