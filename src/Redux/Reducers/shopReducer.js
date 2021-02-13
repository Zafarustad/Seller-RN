import {SET_SHOP_DATA} from '../Actions/shopAction';

const initialState = {
  shopData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOP_DATA: {
      return {
        ...state,
        shopData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
