// @ts-ignore
import {
  AmbErrorProvider,
  ContractNames,
  Contracts,
} from '@airdao/airdao-node-contracts';
// @ts-ignore
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';
import { utils } from 'ethers';
import React from 'react';

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
