import {IS_AUTHENTICATED} from '../Actions/authAction';

const initialState = {
  isAuthenticated: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
