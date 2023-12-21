// @ts-ignore
import Api from '../../../API/api';
import {
  AmbErrorProvider,
  ContractNames,
  Contracts,
  Multisig,
} from '@airdao/airdao-node-contracts';
import API2 from 'API/newApi';
// @ts-ignore
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';
import { ethers, utils } from 'ethers';
import React from 'react';

const readProvider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_EXPLORER_NETWORK,
);

export const getApollosNetworkInfo = (data: any) => {
  let total = 0,
    online = 0,
    offline = 0,
    connecting = 0;
  for (const apollo of data) {
    apollo.state !== 'RETIRED' && total++;
    apollo.status === 'ONLINE' && online++;
    apollo.status === 'OFFLINE' && apollo.state !== 'RETIRED' && offline++;
    apollo.status === 'CONNECTING' && connecting++;
  }

  return { total, online, offline, connecting };
};

const timestampToFormattedDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Умножаем на 1000, так как Unix-время измеряется в миллисекундах

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes} UTC`;
};

export const getRetiredApollos = async () => {
  const network = getCurrentAmbNetwork();
  const provider = new AmbErrorProvider(network.rpcUrl, network.chainId);
  // @ts-ignore
  const contracts = new Contracts(provider, network.chainId);

  const lockKeeper = contracts.getContractByName(ContractNames.LockKeeper);
  const serverNodes = contracts.getContractByName(
    ContractNames.ServerNodesManager,
  );
  const arr = [];

  const locks = await lockKeeper.getAllLocks();
  for (const lock of locks) {
    if (lock.locker !== serverNodes.address) continue;
    if (!lock.description.startsWith('ServerNodes unstake: ')) continue;

    const address = lock.description.slice('ServerNodes unstake: '.length);
    const nodeInfo = await serverNodes.stakes(address);
    if (!nodeInfo.stake.isZero()) continue;

    arr.push({
      address: lock.description.replace('ServerNodes unstake: ', '0x'),
      isRetired: true,
      unlockTime: timestampToFormattedDate(
        +utils.formatUnits(lock.firstUnlockTime, 0),
      ),
      amount: utils.formatEther(lock.intervalAmount),
    });
  }
  return arr;
};

export const getQueuedApollos = async () => {
  const network = getCurrentAmbNetwork();
  const provider = new AmbErrorProvider(network.rpcUrl, network.chainId);
  // @ts-ignore
  const contracts = new Contracts(provider, network.chainId);
  const list = await Multisig.validatorSetGetQueuedStakes(contracts);

  const apollosInfo = await Promise.all(
    list.map((address) => API2.getApollo(address)),
  );

  return apollosInfo.map((el: any) => ({
    address: el.data.validator.address,
    balance: el.data.validator.balance,
    stake: el.data.validator.stake,
    totalBlocks: el.data.validator.totalBlocks,
    status: 'QUEUE',
  }));
};

export const getOnboardingApollos = async () => {
  const network = getCurrentAmbNetwork();
  const provider = new AmbErrorProvider(network.rpcUrl, network.chainId);
  // @ts-ignore
  const contracts = new Contracts(provider, network.chainId);
  const list = await Multisig.serverNodesManagerGetNodesList(contracts);
  const arr = await Promise.all(
    list.map(async (address) => {
      const stakeData = await Multisig.validatorSetGetNodeStakeData(
        contracts,
        address,
      );
      if (stakeData.amount.isZero()) {
        const { stake } = await contracts
          .getContractByName(ContractNames.ServerNodesManager)
          .stakes(address);
        const balance = await readProvider.getBalance(address);
        return {
          address,
          balance: { ether: +ethers.utils.formatEther(balance) },
          stake: { ether: +ethers.utils.formatEther(stake) },
          totalBlocks: 0,
          status: 'ONBOARDING',
        };
      }
    }),
  );
  return arr.filter((el) => el);
};
