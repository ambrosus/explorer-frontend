import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import logger from 'redux-logger';

export const store = createStore(reducers, {}, applyMiddleware(thunk,logger))
