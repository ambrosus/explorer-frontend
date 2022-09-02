import { utils } from 'ethers';

const networksByChainIds: { [index: string]: any } = {
  '30746': {
    name: 'Ambrosus Devnet',
    chainId: 30746,
    explorerUrl: 'https://explorer.ambrosus-dev.io/',
    rpcUrl: 'https://network.ambrosus-dev.io',
  },
  '22040': {
    name: 'Ambrosus Testnet',
    chainId: 22040,
    explorerUrl: 'https://explorer.ambrosus-test.io/',
    rpcUrl: 'https://network.ambrosus-test.io',
  },
  '16718': {
    name: 'Ambrosus Mainnet',
    chainId: 16718,
    explorerUrl: 'https://explorer.ambrosus.io/',
    rpcUrl: 'https://network.ambrosus.io/',
  },
};

const token = {
  name: 'Amber',
  symbol: 'AMB',
  decimals: 18,
};

const chainId: string = process.env.REACT_APP_CHAIN_ID || '16718';

const changeChainId = async (provider: any) => {
  const selectedNetwork: any = networksByChainIds[chainId];
  const hexChainId: string = utils.hexValue(+chainId);

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    });
  } catch (switchError) {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: hexChainId,
          chainName: selectedNetwork.name,
          nativeCurrency: token,
          rpcUrls: [selectedNetwork.rpcUrl],
          blockExplorerUrls: [selectedNetwork.explorerUrl],
        },
      ],
    });
  }
};

export default changeChainId;
