import reducers from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const middleware: Array<any> = [thunk];

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

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);
