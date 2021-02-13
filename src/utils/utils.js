import SInfo from 'react-native-sensitive-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  if (token) {
    return true;
  }
};

export const deleteJwtToken = async () => {
  await SInfo.deleteItem('token', {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
  delete axios.defaults.headers.common['Authorization'];
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return;
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
