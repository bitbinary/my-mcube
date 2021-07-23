import actions from 'redux/Forum/actions';

const initialState = {
  forumpage: 'Feeds',
  loader: true,
  searchselectedskills: [],
  searchselectedtypes: [],
  recommselectedtype: 'mentees',
  addPostDraftState: false,
  addPostDraft: {
    postTitle: '',
    postDescription: '',
    relatedProjectID: '',
  },
  addPostLoader: false,
  feedLoading: true,
  contentFeeds: [],
  searchLoader: false,
  contentSearch: [],
  contentRecomm: [],
  contentRecommMentees: [],
  contentRecommMentors: [],
  contentRecommProjects: [],
  recommLoading: true,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    // FEEDS
    case actions.GETFEEDS_SUCCESS:
      return {
        ...state,
        contentFeeds: [...action.data],
        feedLoading: false,
      };
    case actions.GETFEEDS_FAILURE:
      return { ...state, feedLoading: false };
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

    // RECOMMENDATIONS
    case actions.GETRECOMM_SUCCESS:
      switch (action.recommType) {
        case 'project':
          return {
            ...state,
            contentRecommProjects: [...action.data],
            recommLoading: false,
          };

        case 'mentees':
          return {
            ...state,
            contentRecommMentees: [...action.data],
            recommLoading: false,
          };
        case 'mentor':
          return {
            ...state,
            contentRecommMentors: [...action.data],
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
            contentRecommProjects: [
              ...state.contentRecommProjects,
              ...action.data,
            ],
            recommLoading: false,
          };
        case 'mentees':
          return {
            ...state,
            contentRecommMentees: [
              ...state.contentRecommMentees,
              ...action.data,
            ],
            recommLoading: false,
          };
        case 'mentor':
          return {
            ...state,
            contentRecommMentors: [
              ...state.contentRecommMentors,
              ...action.data,
            ],
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
        recommselectedtype: action.payload.recommendationsselectedtypes,
      };
    default:
      return state;
  }
}

export default Reducer;
