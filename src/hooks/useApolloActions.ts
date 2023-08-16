import {
  AmbErrorProviderWeb3,
  Contracts,
  Methods,
} from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useCallback, useMemo } from 'react';

const { REACT_APP_CHAIN_ID: chainId } = process.env;

export default function useApolloActions(nodeAddress: string) {
  const { provider } = useWeb3React();

  const contracts = useMemo(() => {
    if (!provider || !chainId) return null;
    const ambErrorProvider = new AmbErrorProviderWeb3(provider.provider);
    return new Contracts(ambErrorProvider.getSigner(), +chainId);
  }, [provider, chainId]);

  const addStake = useCallback(
    (amount: string) => {
      if (!contracts) return null;
      const bnAmount = parseEther(amount);
      return Methods.serverNodesAddStake(contracts, nodeAddress, bnAmount);
    },
    [contracts, nodeAddress],
  );

  const unstake = useCallback(
    (amount: string) => {
      if (!contracts) return null;
      const bnAmount = parseEther(amount);
      return Methods.serverNodesUnstake(contracts, nodeAddress, bnAmount);
    },
    [nodeAddress, contracts],
  );

  const retire = useCallback(
    (stake: BigNumber) => {
      if (!contracts) return null;
      return Methods.serverNodesUnstake(contracts, nodeAddress, stake);
    },
    [nodeAddress, contracts],
  );

  const cancelUnstake = useCallback(() => {
    if (!contracts) return null;
    return Methods.serverNodesRestake(contracts, nodeAddress);
  }, [nodeAddress, contracts]);

  const changeOwner = useCallback(
    (newOwner: string) => {
      if (!contracts) return null;
      return Methods.serverNodesChangeNodeOwner(
        contracts,
        nodeAddress,
        newOwner,
      );
    },
    [contracts, nodeAddress],
  );

  const changeRewardsReceiver = useCallback(
    (newReceiver: string) => {
      if (!contracts) return null;
      return Methods.serverNodesSetRewardsAddress(
        contracts,
        nodeAddress,
        newReceiver,
      );
    },
    [contracts, nodeAddress],
  );

  return {
    addStake,
    unstake,
    cancelUnstake,
    changeOwner,
    changeRewardsReceiver,
    retire,
  };
}
