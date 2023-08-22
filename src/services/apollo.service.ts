// @ts-nocheck
import {
  AmbErrorProvider,
  Contracts,
  Methods,
} from '@airdao/airdao-node-contracts';
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';

const network = getCurrentAmbNetwork();
const provider = new AmbErrorProvider(network.rpcUrl, network.chainId);
const contracts = new Contracts(provider, network.chainId);

export async function getApolloInfo(address) {
  const data = await Methods.getApolloInfo(contracts, address);
  if (!data) return null;

  return {
    ownerAddress: data.apollo.ownerAddress,
    rewardsAddress: data.apollo.rewardsAddress,
    stakeAmount: data.apollo.stake,
    timestampStake: data.apollo.timestampStake,
    isOnboarded: data.isOnboarded,
    withdrawLock: data.withdrawLock && {
      stakeAfterWithdraw: data.apollo.stake,
      receiver: data.withdrawLock.receiver,
      unlockTime: data.withdrawLock.unlockTime,
      amount: data.withdrawLock.amount,
    },
  };
}
