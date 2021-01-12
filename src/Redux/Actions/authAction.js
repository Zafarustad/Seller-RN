import axios from 'axios';
import {dev} from '../../api';
import {setJwtToken} from '../../utils/utils';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

export const isAuthenticatedAction = (value) => ({
  type: IS_AUTHENTICATED,
  payload: value,
});

export const userLoginDispatch = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${dev}/login`, {email, password});
    setJwtToken('token', res.data.token);
    console.log('login', res.data);
  } catch (error) {
    console.log('Error:', error);
  }
};
