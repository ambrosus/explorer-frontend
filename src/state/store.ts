import reducers from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// import {persistStore, persistReducer} from "redux-persist";
// import storage from  'redux-persist/lib/storage';

const middleware: Array<any> = [thunk];

// const persistConfig = {
// 		key: 'root',
// 		storage,
// 		// whitelist: ['position,tokenFilters'],
// 		blacklist: ['position,tokenFilters,app']
// };
// const persistedReducer = persistReducer(persistConfig, reducers);

const logger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
  timestamp: true,
  colors: {
    title: () => '#00b4d3',
    prevState: () => '#de6f0d',
    action: () => '#0050ff',
    nextState: () => '#1a9134',
  },
});

// if () {
// middleware.push(logger);
// }

if (
  // @ts-ignore
  process.env.REACT_APP_API_ENDPOINT.includes('test') ||
  // @ts-ignore
  process.env.REACT_APP_API_ENDPOINT.includes('dev')
) {
  middleware.push(logger);
}

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);
// export const persistor = persistStore(store);
