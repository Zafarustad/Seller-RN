import {axiosInstance, showFlashMessage, storeData} from '../../utils/utils';

export const SET_SHOP_DATA = 'SET_SHOP_DATA';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CLEAR_SHOP_DATA = 'CLEAR_SHOP_DATA';
export const GET_SHOP_INVENTORY = 'GET_SHOP_INVENTORY';
export const TOOGLE_LOADING = 'TOOGLE_LOADING';
export const CHANGE_STOCK_AVAILIBILITY = 'CHANGE_STOCK_AVAILIBILITY';

import {authLoadingAction, setUserDetailsAction} from './authAction';

export const setShopDataAction = (data) => ({
  type: SET_SHOP_DATA,
  payload: data,
});

export const addProductToInventoryAction = (data) => ({
  type: ADD_PRODUCT,
  payload: data,
});

export const deleteInventoryProductAction = (data) => ({
  type: DELETE_PRODUCT,
  payload: data,
});

export const getShopInventoryAction = (data) => ({
  type: GET_SHOP_INVENTORY,
  payload: data,
});

export const clearShopDataAction = () => ({
  type: CLEAR_SHOP_DATA,
});

export const toggleLoadingAction = (data) => ({
  type: TOOGLE_LOADING,
  payload: data,
});

export const changeProductAvailabilityAction = (data) => ({
  type: CHANGE_STOCK_AVAILIBILITY,
  payload: data,
});

export const addShopDetailDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/seller/shop', data);
    storeData('userData', res.data.userData);
    storeData('shopData', res.data.shopData);
    dispatch(setUserDetailsAction(res.data.userData));
    dispatch(setShopDataAction(res.data.shopData));
    showFlashMessage('Shop Data Added!', 'success');
    dispatch(authLoadingAction(false));
  } catch (e) {
    dispatch(authLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const addShopCoordinateDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/seller/shop/coordinate', data);
    storeData('userData', res.data.userData);
    dispatch(setUserDetailsAction(res.data.userData));
    dispatch(setShopDataAction(res.data.shopData));
    showFlashMessage('Shop Coordinateds Added!', 'success');
    dispatch(authLoadingAction(false));
  } catch (e) {
    dispatch(authLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const getShopDataDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/seller/shop/${shopId}`);
    storeData('shopData', res.data);
    dispatch(setShopDataAction(res.data));
  } catch (e) {
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const addProductToInventoryDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/seller/shop/product', data);
    dispatch(addProductToInventoryAction(res.data));
    dispatch(authLoadingAction(false));
    showFlashMessage('Product added!', 'success');
  } catch (e) {
    dispatch(authLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const getShopInventoryDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/seller/inventory/${shopId}`);
    dispatch(getShopInventoryAction(res.data));
    dispatch(toggleLoadingAction(false));
  } catch (e) {
    dispatch(toggleLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const deleteInventoryProductDispatch = (shopId, productId) => async (
  dispatch,
) => {
  try {
    const res = await axiosInstance.delete(
      `/seller/shop/${shopId}/product/${productId}`,
    );
    dispatch(deleteInventoryProductAction(productId));
    dispatch(toggleLoadingAction(false));
  } catch (e) {
    dispatch(toggleLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const updateShopDataDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.put('/seller/shop', data);
    storeData('shopData', res.data);
    dispatch(setShopDataAction(res.data));
    showFlashMessage('Shop Data Updated!', 'success');
    dispatch(authLoadingAction(false));
  } catch (e) {
    dispatch(authLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const updateShopImageDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.put('/seller/shopImage', data);
    storeData('shopData', res.data);
    dispatch(setShopDataAction(res.data));
    showFlashMessage('Shop Image updated!', 'success');
    dispatch(authLoadingAction(false));
  } catch (e) {
    dispatch(authLoadingAction(false));
    console.log(e.response.data);
    showFlashMessage('Something went wrong', 'danger');
  }
};

export const changeProductAvailabilityDispatch = (data) => async (dispatch) => {
  try {
    dispatch(changeProductAvailabilityAction(data));
    const res = await axiosInstance.put('/seller/inventory/availability', data);
    dispatch(toggleLoadingAction(false));
  } catch (e) {
    dispatch(toggleLoadingAction(false));
    showFlashMessage('Something went wrong', 'danger');
  }
};
