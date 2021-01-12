import SInfo from 'react-native-sensitive-info';

export const setJwtToken = async (key, value) => {
  return SInfo.setItem(key, value, {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
};

export const getJwtToken = async () => {
  return await SInfo.getItem('token', {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
};

export const deleteJwtToken = async () => {
  await SInfo.deleteItem('token', {
    sharedPreferencesName: 'JwtToken',
    keychainService: 'JWT',
  });
};
