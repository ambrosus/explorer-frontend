// @ts-nocheck
import { ambErrorProvider, ambNetwork } from '../utils/network';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';

const contracts = new Contracts(ambErrorProvider, ambNetwork.chainId);

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
