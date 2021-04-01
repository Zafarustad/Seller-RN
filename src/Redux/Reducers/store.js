import {combineReducers, compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import shopReducer from './shopReducer';
import orderReducer from './orderReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  auth: authReducer,
  shop: shopReducer,
  order: orderReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
