import {axiosInstance, showFlashMessage} from '../../utils/utils';
import {authLoadingAction} from './authAction';

export const PENDING_ORDER_DATA = 'PENDING_ORDER_DATA';
export const COMPLETED_ORDER_DATA = 'COMPLETED_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';
export const SET_ORDER_COMPLETE = 'SET_ORDER_COMPLETE';

export const getPendingOrderDataAction = (data) => ({
  type: PENDING_ORDER_DATA,
  payload: data,
});

export const getCompletedOrderDataAction = (data) => ({
  type: COMPLETED_ORDER_DATA,
  payload: data,
});

export const setOrderCompleteAction = (data) => ({
  type: SET_ORDER_COMPLETE,
  payload: data,
});

export const clearOrderDataAction = () => ({
  type: CLEAR_ORDER_DATA,
});

export const getPendingOrderDataDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/seller/order/pending/${shopId}`);
    dispatch(getPendingOrderDataAction(res.data));
  } catch (e) {
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const getCompletedOrderDataDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/seller/order/completed/${shopId}`);
    dispatch(getCompletedOrderDataAction(res.data));
  } catch (e) {
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const setOrderCompleteDispatch = (orderId) => async (dispatch) => {
  try {
    const res = await axiosInstance.put(`/seller/order/complete/${orderId}`);
    dispatch(setOrderCompleteAction(res.data));
    dispatch(authLoadingAction(false));
    showFlashMessage('Order Delivered!', 'success');
  } catch (e) {
    dispatch(authLoadingAction(false));
    console.log(e)
    showFlashMessage('Something went wrong', 'danger');
  }
};
