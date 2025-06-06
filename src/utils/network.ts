import { AmbErrorProvider } from '@airdao/airdao-node-contracts';
import { ChainIdValues, networkById } from '@airdao/ui-library';
import { ethers } from 'ethers';

console.log(process.env);
if (process.env.REACT_APP_CHAIN_ID === undefined) {
  throw new Error('REACT_APP_CHAIN_ID is not defined');
}

export const ambChainId = +process.env.REACT_APP_CHAIN_ID as ChainIdValues;

export const ambNetwork = {
  chainId: ambChainId,
  rpcUrl: networkById[ambChainId].rpcUrls.default.http[0],
};

export const readProvider = new ethers.providers.JsonRpcBatchProvider(
  ambNetwork.rpcUrl,
  ambNetwork.chainId,
);
export const ambErrorProvider = new AmbErrorProvider(
  ambNetwork.rpcUrl,
  ambNetwork.chainId,
);
