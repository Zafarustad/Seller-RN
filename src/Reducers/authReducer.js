import {INCREMENT} from '../Actions/authAction';

const initialState = {
  test: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT: {
      return {
        ...state,
        test: state.test + 1,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
