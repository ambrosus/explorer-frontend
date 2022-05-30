import Main from './components/Main/Main';
import ScrollToTop from './components/ScrollToTop';
import { store } from './state';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/*
 * @param {Provider} store - redux store
 * @param {BrowserRouter} BrowserRouter - react router
 * @param {Main} Main - main component
 */
export const App = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Main />
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById('root') as HTMLElement;
ReactDOM.render(<App />, container, () => {
  console.log('rendered');
});
