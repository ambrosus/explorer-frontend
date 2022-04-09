import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './modules';
import logger from 'redux-logger';
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (reducers = {}, preloadedState = {}, middlewares = []) =>
  createStore(
    combineReducers({ ...rootReducers, ...reducers }),
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares, thunk,logger)),
  );

export default configureStore;
