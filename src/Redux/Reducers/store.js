import {combineReducers, compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  auth: authReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
