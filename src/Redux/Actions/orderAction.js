import {axiosInstance} from '../../utils/utils';

export const PENDING_ORDER_DATA = 'PENDING_ORDER_DATA';
export const COMPLETED_ORDER_DATA = 'COMPLETED_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';

export const getPendingOrderDataAction = (data) => ({
  type: PENDING_ORDER_DATA,
  payload: data,
});

export const getCompletedOrderDataAction = (data) => ({
  type: COMPLETED_ORDER_DATA,
  payload: data,
});

export const clearOrderDataAction = () => ({
  type: CLEAR_ORDER_DATA
})

export const getPendingOrderDataDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/seller/order/pending/${shopId}`);
    dispatch(getPendingOrderDataAction(res.data));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getCompletedOrderDataDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/seller/order/completed/${shopId}`);
    dispatch(getCompletedOrderDataAction(res.data));
  } catch (e) {
    console.log(e.response.data);
  }
};


