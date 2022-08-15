import { utils } from 'ethers';

const networksByChainIds = {
  30746: {
    name: 'Ambrosus Devnet',
    chainId: 30746,
    logo: 'https://media-exp1.licdn.com/dms/image/C560BAQFuR2Fncbgbtg/company-logo_200_200/0/1636390910839?e=2159024400&v=beta&t=W0WA5w02tIEH859mVypmzB_FPn29tS5JqTEYr4EYvps',
    explorerUrl: 'https://explorer.ambrosus-dev.io/',
    rpcUrl: 'https://network.ambrosus-dev.io',
    rpcUrlWS: 'wss://network.ambrosus-dev.io/ws',
  },
  22040: {
    name: 'Ambrosus Testnet',
    chainId: 22040,
    explorerUrl: 'https://explorer.ambrosus-test.io/',
    rpcUrl: 'https://network.ambrosus-test.io',
    rpcUrlWS: 'wss://network.ambrosus-test.io/ws',
  },
  16718: {
    name: 'Ambrosus Mainnet',
    chainId: 16718,
    explorerUrl: 'https://explorer.ambrosus.io/',
    rpcUrl: 'https://network.ambrosus.io/',
    rpcUrlWS: 'wss://network.ambrosus.io/ws',
  },
};

const token = {
  name: 'Amber',
  symbol: 'AMB',
  decimals: 18,
};

const changeChainId = async (provider: any, chainId: string) => {
  //TODO: get from .env
  const selectedNetwork = networksByChainIds[22040];
  const hexChainId = utils.hexValue(+chainId);

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
