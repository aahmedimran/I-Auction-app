import ActionTypes from "./actionTypes";
const INTIALSTATE = {
  user: {},
  Getuser: [],
};

export const Login = (state = INTIALSTATE, action) => {
  switch (action.type) {
    case ActionTypes.Login_User_LOADING:
      return {
        ...state,
        dataLoading: true,
      };
    case ActionTypes.Login_User_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataLoading: false,
      };
    case ActionTypes.Login_User_FAIL:
      return {
        ...state,
        dataLoading: false,
      };
    default:
      return state;
  }
};
export const Signup = (state = INTIALSTATE, action) => {
  switch (action.type) {
    case ActionTypes.User_Create_LOADING:
      return {
        ...state,
        dataLoading: true,
      };
    case ActionTypes.User_Create_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataLoading: false,
      };
    case ActionTypes.User_Create_FAIL:
      return {
        ...state,
        dataLoading: false,
      };
    default:
      return state;
  }
};
