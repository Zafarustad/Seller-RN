import {
  IS_AUTHENTICATED,
  SET_ERRORS,
  AUTH_LOADING,
} from '../Actions/authAction';

const initialState = {
  isAuthenticated: null,
  errors: null,
  authLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    case SET_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case AUTH_LOADING: {
      return {
        ...state,
        authLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
