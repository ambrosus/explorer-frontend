import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducers from 'state/reducers';

const middleware: Array<any> = [ReduxThunk];
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
  // console.log('store', store.getState().position);
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
