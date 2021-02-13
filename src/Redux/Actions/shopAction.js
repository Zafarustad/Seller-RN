import {axiosInstance} from '../../utils/utils';

export const SET_SHOP_DATA = 'SET_SHOP_DATA';

export const getShopDataAction = (data) => ({
  type: SET_SHOP_DATA,
  payload: data,
});

export const addShopDetailDispatch = (data) => async (dispatch) => {
  try {
    const res = await (await axiosInstance()).post('/shop', data);
    console.log(res.data);
  } catch (e) {
    console.log(e.response.data);
  }
};

export const addShopCoordinateDispatch = (data) => async (dispatch) => {
  try {
    const res = await (await axiosInstance()).post(
      `shop/coordinate/${data.shopId}`,
      data,
    );
    console.log(res.data);
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getShopDataDispatch = (shopId) => async (dispatch) => {
  try {
    const res = await (await axiosInstance()).get(`/shop/${shopId}`);
    console.log(res.data);
  } catch (e) {
    console.log(e.response.data);
  }
};
