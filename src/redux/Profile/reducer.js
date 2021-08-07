import actions from 'redux/Profile/actions';

const initialState = {
  profileData: null,
  userId: null,
  skillList: [],
  skillErrorMessage: '',
  skillDisplayError: false,
  userProjectList: [],
  userSkillList: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    //PROFILE
    case actions.GETUSERDETAILS_SUCCESS:
      return { ...state, profileData: action.data.data };
    case actions.EDITUSERDETAILS_SUCCESS:
      return { ...state };
    //PROJECTS
    case actions.GETUSERPROJECTS_SUCCESS:
      return { ...state, userProjectList: action.data.data };
    //SKILLS
    case actions.GETSKILLS_SUCCESS:
      return {
        ...state,
        skillList: Object.values(action.data.data['skill_name']),
      };
    case actions.ADDSKILL_SUCCESS:
      return {
        ...state,
        skillErrorMessage: action.data.message,
        skillDisplayError: false,
      };
    case actions.ADDSKILL_ERROR:
      return {
        ...state,
        skillErrorMessage: action.data.message,
        skillDisplayError: true,
      };
    case actions.GETUSERSKILLS_SUCCESS:
      return { ...state, userSkillList: [...action.data.data] };
    //REVIEWS
    case actions.GETUSERREVIEWS_SUCCESS:
      return { ...state, userReviewsList: [...action.data.data] };
    default:
      return state;
  }
}

export default Reducer;
