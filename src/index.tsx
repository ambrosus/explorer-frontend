import Main from './components/Main/Main';
import { store } from './state';
import {
  ConnectWalletModalProvider,
  createAirdaoConfigWithChainId,
} from '@airdao/ui-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'styles/Main.scss';
import 'styles/index.css';
import { WagmiProvider } from 'wagmi';

const { REACT_APP_WC_PROJECT_ID: projectId, REACT_APP_CHAIN_ID: chainId } =
  process.env;

if (!projectId || !chainId) {
  throw new Error(
    'Please provide REACT_APP_WC_PROJECT_ID and REACT_APP_CHAIN_ID in .env',
  );
}

const WC_PARAMS = {
  projectId: projectId,
  metadata: {
    name: 'AirDAO Explorer',
    description:
      'Explore AirDAO Network: amb price, total supply, total transactions, market cap, nodes, holders etc.',
    url: 'https://airdao.io/explorer',
    icons: ['https://airdao.io/favicon.svg'],
  },
};

const config = createAirdaoConfigWithChainId(+chainId, WC_PARAMS);

/*
 * @param {Provider} store - redux store
 * @param {BrowserRouter} BrowserRouter - react router
 * @param {Main} Main - main component
 */

const queryClient = new QueryClient();

export const App = (): JSX.Element => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ConnectWalletModalProvider>
        <Provider store={store}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Main />
          </BrowserRouter>
        </Provider>
      </ConnectWalletModalProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
