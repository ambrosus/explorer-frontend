import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import thunk from 'redux-thunk';
import reducers from 'state/reducers';

//need function middleware
const getStateMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('state', store.getState());
  return next(action);
};
const middleware: Array<any> = [thunk, getStateMiddleware];
const renderWithReduxAndRouter = (
  component: any,
  preloadedState: any = {},
  {
    store = createStore(
      reducers,
      preloadedState || {},
      composeWithDevTools(applyMiddleware(...middleware)),
    ),
  }: any = {},
) => {
  console.log('store', store.getState().position);
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>,
    ),
    store,
  };
};
export default renderWithReduxAndRouter;
