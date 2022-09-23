import { log } from '../helpers';
import { render } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducers from 'state/reducers';

const middleware: Array<any> = [ReduxThunk];
const queryClient = new QueryClient();

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
  log('store', store.getState().position);
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            {component}
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>,
    ),
    store,
  };
};
export default renderWithReduxAndRouter;
