// @ts-nocheck
import { getApolloInfo } from '../services/apollo.service';
import { BnWeiToUsd } from '../utils/helpers';
import { useTypedSelector } from './useTypedSelector';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

export default function useApolloInfo(address = ''): ApolloInfo {
  const { account } = useWeb3React();
  const { data } = useTypedSelector((state: any) => state?.app);
  const { price_usd } = data?.tokenInfo || 0;

  const [apolloInfo, setApolloInfo] = useState(apolloInfoMock);
  const [isOwner, setIsOwner] = useState(false);
  const [stakeUsd, setStakeUsd] = useState(0);

  const updateInfo = () => {
    if (!address) return;

    getApolloInfo(address).then((data) => {
      if (!data) return;
      setApolloInfo(data);
    });
  };

  useEffect(() => {
    updateInfo();
  }, [address]);

  useEffect(() => {
    setIsOwner(account === apolloInfo.ownerAddress);
  }, [apolloInfo.ownerAddress, account]);

  useEffect(() => {
    setStakeUsd(BnWeiToUsd(apolloInfo.stakeAmount, price_usd));
  }, [apolloInfo.stakeAmount, price_usd]);

  return { apolloInfo, isOwner, stakeUsd, updateInfo };
}

const apolloInfoMock = {
  ownerAddress: '0x',
  rewardsAddress: '0x',
  stakeAmount: BigNumber.from(0),
  timestampStake: BigNumber.from(0),
  isOnboarded: false,
  withdrawLock: {},
};

interface ApolloInfo {
  apolloInfo: {
    ownerAddress: string;
    rewardsAddress: string;
    stakeAmount: BigNumber;
    timestampStake: BigNumber;
    isOnboarded: boolean;
    withdrawLock: any;
  };
  isOwner: boolean;
  stakeUsd: number;
  updateInfo: () => void;
}
