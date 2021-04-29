import {
  PENDING_ORDER_DATA,
  COMPLETED_ORDER_DATA,
  CLEAR_ORDER_DATA,
  SET_ORDER_COMPLETE,
} from '../Actions/orderAction';

const initialState = {
  openOrders: null,
  completedOrders: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING_ORDER_DATA: {
      return {
        ...state,
        openOrders: action.payload,
      };
    }
    case COMPLETED_ORDER_DATA: {
      return {
        ...state,
        completedOrders: action.payload,
      };
    }

    case SET_ORDER_COMPLETE: {
      const filteredArray = state.openOrders.filter(
        (order) => order._id !== action.payload._id,
      );
      return {
        ...state,
        openOrders: filteredArray,
      };
    }

    case CLEAR_ORDER_DATA: {
      return {
        ...state,
        openOrders: null,
        completedOrders: null,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
