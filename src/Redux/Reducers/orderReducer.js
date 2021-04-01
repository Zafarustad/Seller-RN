import {PENDING_ORDER_DATA, COMPLETED_ORDER_DATA} from '../Actions/orderAction';

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
    default:
      return state;
  }
};

export default orderReducer;
