import {
  IS_AUTHENTICATED,
  SET_ERRORS,
  AUTH_LOADING,
  SET_USER_DATA,
} from '../Actions/authAction';

const initialState = {
  isAuthenticated: null,
  errors: null,
  authLoading: false,
  userData: null,
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
    case SET_USER_DATA: {
      return {...state, userData: action.payload};
    }
    default:
      return state;
  }
};

export default authReducer;
