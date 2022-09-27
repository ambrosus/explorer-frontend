import NetworksConfig from './networks.json';

const { REACT_APP_ENV } = process.env;

// in case of breaking bsc, again, use this
//
// const { amb, eth } = NetworksConfig[REACT_APP_ENV];
//
// export const allNetworks = { amb, eth };
//
// export const supportedNetworks = [eth];
// export const AmbrosusNetwork = amb;

export const allNetworks = NetworksConfig[REACT_APP_ENV];

const { amb, eth, bsc } = allNetworks;

export const supportedNetworks = [eth, bsc];
export const AmbrosusNetwork = amb;

export const getNetworkByChainId = (chainId) =>
  Object.values(allNetworks).find((network) => network.chainId === chainId);

export const networksChainIds = Object.values(allNetworks).map(
  (network) => network.chainId,
);
