import {
  SET_SHOP_DATA,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  CLEAR_SHOP_DATA,
  GET_SHOP_INVENTORY,
  TOOGLE_LOADING
} from '../Actions/shopAction';

const initialState = {
  shopData: null,
  dataLoading: false,
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

    case GET_SHOP_INVENTORY: {
      return {
        ...state,
        shopData: {
          ...state.shopData,
          inventory: action.payload,
        },
      };
    }
    case TOOGLE_LOADING: {
      return {
        ...state,
        dataLoading: action.payload,
      };
    }

    case CLEAR_SHOP_DATA: {
      return {
        ...state,
        shopData: null,
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
