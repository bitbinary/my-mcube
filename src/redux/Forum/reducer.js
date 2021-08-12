import actions from 'redux/Forum/actions';

const initialState = {
  forumpage: 'Feeds',
  loader: true,
  searchselectedskills: [],
  searchselectedtypes: [],
  recommselectedtype: 'mentees',
  addPostDraftState: false,
  addPostLoading: false,
  addPostDraft: {
    postTitle: '',
    postDescription: '',
    relatedProjectID: '',
  },
  addPostLoader: false,
  feedLoading: true,
  feedSortBy: 'timestamp',
  contentFeeds: [],
  searchLoader: false,
  contentSearch: [],
  contentRecomm: [],
  contentRecommMentees: [],
  contentRecommMentors: [],
  contentRecommProjects: [],
  recommLoading: true,
  searchData: [],
  searchLoading: false,
  searchString: '',
  feedSearchString: '',
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    // FEEDS
    case actions.GETFEEDS_SUCCESS:
      return {
        ...state,
        contentFeeds: [...action.data.data],
        feedLoading: false,
        addPostLoading: false,
        addPostDraftState: false,
      };
    case actions.GETFEEDS_FAILURE:
      return { ...state, feedLoading: false };
    case actions.ADDFEEDS_SUCCESS:
      return {
        ...state,
        contentFeeds: action.data.data,
        feedLoading: false,
      };
    case actions.ADDFEEDS_FAILURE:
      return { ...state };

    case actions.ADDPOST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDraftState: true,
      };
    case actions.ADDPOST_FAILURE:
      return { ...state, addPostLoading: false };

    case actions.FEEDLOADING:
      return { ...state, feedLoading: action.isloading };

    // RECOMMENDATIONS
    case actions.GETRECOMM_SUCCESS:
      switch (action.recommType) {
        case 'project':
          return {
            ...state,
            contentRecommProjects: action.data,
            recommLoading: false,
          };

        case 'mentees':
          return {
            ...state,
            contentRecommMentees: action.data,
            recommLoading: false,
          };
        case 'mentor':
          return {
            ...state,
            contentRecommMentors: action.data,
            recommLoading: false,
          };
        default:
          return { ...state };
      }

    case actions.GETRECOMM_FAILURE:
      return { ...state, recommLoading: false };

    case actions.ADDRECOMM_SUCCESS:
      switch (action.recommType) {
        case 'project':
          return {
            ...state,
            contentRecommProjects: action.data,
            recommLoading: false,
          };
        case 'mentees':
          return {
            ...state,
            contentRecommMentees: action.data,
            recommLoading: false,
          };
        case 'mentor':
          return {
            ...state,
            contentRecommMentors: action.data,
            recommLoading: false,
          };
        default:
          return { ...state };
      }

    case actions.ADDRECOMM_FAILURE:
      return { ...state };
    case actions.RECOMMLOADING:
      return { ...state, recommLoading: action.isloading };

    // OTHERS
    case actions.FORUMPAGECHANGE:
      return { ...state, forumpage: action.payload.forumpage, loader: false };
    case actions.TOGGLELOADING:
      return { ...state, loader: action.payload.loader };
    case actions.TOGGLESTATE:
      return { ...state, [action.payload.label]: action.payload.value };

    case actions.UPDATESEARCHSTRING:
      return { ...state, searchString: action.searchString };
    case actions.SEARCH_SUCCESS:
      return { ...state, searchData: [...action.data], searchLoading: false };

    case actions.SEARCH_FAILURE:
      return { ...state, searchLoading: false };

    case actions.UPDATERECOMTYPES:
      return {
        ...state,
        recommselectedtype: action.payload.recommendationsselectedtypes,
      };
    case actions.FORCEUPDATE:
      return { ...state, [action.payload.item]: action.payload.value };
    default:
      return state;
  }
}

export default Reducer;
