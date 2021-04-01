import {axiosInstance} from '../../utils/utils';
import {setJwtToken, storeData} from '../../utils/utils';
import {setShopDataAction} from './shopAction';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const SET_ERRORS = 'SET_ERRORS';
export const AUTH_LOADING = 'AUTH_LOADING';
export const SET_USER_DATA = 'SET_USER_DATA';

export const isAuthenticatedAction = (data) => ({
  type: IS_AUTHENTICATED,
  payload: data,
});

export const setErrorsAction = (data) => ({
  type: SET_ERRORS,
  payload: data,
});

export const authLoadingAction = (data) => ({
  type: AUTH_LOADING,
  payload: data,
});

export const setUserDetailsAction = (data) => ({
  type: SET_USER_DATA,
  payload: data,
});

export const userLoginDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/seller/login', data);
    const {token, userData} = res.data;
    setJwtToken('token', token);
    storeData('userData', userData);
    dispatch(setUserDetailsAction(userData));
    if (res.data.shopData) {
      const {shopData} = res.data;
      storeData('shopData', shopData);
      dispatch(setShopDataAction(shopData));
    }
    dispatch(isAuthenticatedAction(true));
    dispatch(authLoadingAction(false));
  } catch (e) {
    console.log('error:', e.response.data);
    await dispatch(setErrorsAction(e.response.data));
    dispatch(authLoadingAction(false));
  }
};

export const userRegisterDispatch = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/seller/signup', data);
    const {_id, email, shopOwnerName, detailsCompleted} = res.data;
    let userData = {_id, email, shopOwnerName, detailsCompleted};
    setJwtToken('token', res.data.token);
    storeData('userData', userData);
    dispatch(setUserDetailsAction(userData));
    dispatch(isAuthenticatedAction(true));
    dispatch(authLoadingAction(false));
  } catch (e) {
    console.log('error:', e.response.data);
    await dispatch(setErrorsAction(e.response.data));
    dispatch(authLoadingAction(false));
  }
};
