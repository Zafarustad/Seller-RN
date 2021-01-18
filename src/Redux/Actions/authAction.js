import {axiosInstance} from '../../utils/utils';
import {setJwtToken} from '../../utils/utils';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const SET_ERRORS = 'SET_ERRORS';
export const AUTH_LOADING = 'AUTH_LOADING';

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

export const userLoginDispatch = (data) => async (dispatch) => {
  try {
    const res = await (await axiosInstance()).post('/login', data);
    // setJwtToken('token', res.data.token);
    console.log('login', res.data);
    dispatch(authLoadingAction(false));
  } catch (e) {
    console.log('error:', e.response.data);
    await dispatch(setErrorsAction(e.response.data));
    dispatch(authLoadingAction(false));
  }
};

export const userRegisterDispatch = (data) => async (dispatch) => {
  try {
    const res = await (await axiosInstance()).post('/signup', data);
    // setJwtToken('token', res.data.token);
    console.log('signup', res.data);
    dispatch(authLoadingAction(false));
  } catch (e) {
    console.log('error:', e.response.data);
    await dispatch(setErrorsAction(e.response.data));
    dispatch(authLoadingAction(false));
  }
};
