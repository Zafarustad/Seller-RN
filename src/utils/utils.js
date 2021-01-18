import SInfo from 'react-native-sensitive-info';
import axios from 'axios';
import {dev} from '../api';

export const axiosInstance = async () =>
  axios.create({
    baseURL: dev,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const setJwtToken = async (key, value) => {
  const authToken = `Bearer ${value}`;
  axios.defaults.headers.common['Authorization'] = authToken;
  return SInfo.setItem(key, value, {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
};

export const getJwtToken = async () => {
  const token = await SInfo.getItem('token', {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
  // const authToken = `Bearer ${token}`;
  // axios.defaults.headers.common['Authorization'] = authToken;
  return true;
};

export const deleteJwtToken = async () => {
  await SInfo.deleteItem('token', {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
  delete axios.defaults.headers.common['Authorization'];
};
