import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import reducers from 'state/reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk';
import { render } from '@testing-library/react'

const middleware = [ReduxThunk];
const renderWithReduxAndRouter = (
  component: any,
  {
    store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(...middleware))),
  }: any = {},
) => {
  return {
    ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>),
  store,
}
}
export default renderWithReduxAndRouter
