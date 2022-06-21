import reducers from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware: Array<any> = [thunk];

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);
