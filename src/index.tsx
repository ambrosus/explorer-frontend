// @ts-nocheck
import Main from './components/Main/Main';
import { store } from './state';
import { Web3ReactProvider } from '@web3-react/core';
import {
  metamaskConnector,
  metamaskHooks,
  walletconnectConnector,
  walletconnectHooks,
} from 'airdao-components-and-tools/utils';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const connectors = [
  [metamaskConnector, metamaskHooks],
  [walletconnectConnector, walletconnectHooks],
];

const queryClient = new QueryClient();

export const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Web3ReactProvider connectors={connectors}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Main />
        </BrowserRouter>
      </Web3ReactProvider>
    </Provider>
  </QueryClientProvider>
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
