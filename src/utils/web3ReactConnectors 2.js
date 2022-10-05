import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { allNetworks, networksChainIds } from './networks';

const { REACT_APP_INFURA_KEY, REACT_APP_ENV } = process.env;

export const ConfiguredInjectedConnector = new InjectedConnector({
  supportedChainIds: networksChainIds,
});

export const ConfiguredWalletConnectConnector = new WalletConnectConnector({
  rpc: {
    [+allNetworks.eth.chainId]:
      REACT_APP_ENV === 'production'
        ? allNetworks.eth.rpcUrl + REACT_APP_INFURA_KEY
        : allNetworks.eth.rpcUrl,
    [+allNetworks.amb.chainId]: allNetworks.amb.rpcUrl,
    [+allNetworks.bsc.chainId]: allNetworks.bsc.rpcUrl,
  },
  bridge: 'https://bridge.walletconnect.org',
  pollingInterval: 6000,
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'trustee'],
  },
});
