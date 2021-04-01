import {
  SET_SHOP_DATA,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from '../Actions/shopAction';

const initialState = {
  shopData: null,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOP_DATA: {
      return {
        ...state,
        shopData: action.payload,
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        shopData: {
          ...state.shopData,
          inventory: [action.payload, ...state.shopData.inventory],
        },
      };
    }
    case DELETE_PRODUCT: {
      const filteredArray = state.shopData.inventory.filter(
        (product) => product._id !== action.payload,
      );
      return {
        ...state,
        shopData: {
          ...state.shopData,
          inventory: filteredArray,
        },
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
