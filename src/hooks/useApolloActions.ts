import {
  AmbErrorProviderWeb3,
  Contracts,
  Methods,
} from '@airdao/airdao-node-contracts';
// @ts-ignore
import { Notify } from '@airdao/ui-library';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { switchToAmb } from 'airdao-components-and-tools/utils';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useCallback, useMemo } from 'react';

const { REACT_APP_CHAIN_ID: chainId } = process.env;

export default function useApolloActions(nodeAddress: string) {
  const { provider, chainId: selectedChainId } = useWeb3React();

  const contracts = useMemo(() => {
    if (!provider || !chainId) return null;
    const ambErrorProvider = new AmbErrorProviderWeb3(provider.provider);
    return new Contracts(ambErrorProvider.getSigner(), +chainId);
  }, [provider, chainId]);

  const addStake = useCallback(
    (amount: string) => {
      if (!contracts) return null;
      if (provider && selectedChainId !== chainId) {
        switchToAmb(provider.provider);
        return null;
      }

      const bnAmount = parseEther(amount);

      return Methods.serverNodesAddStake(
        contracts,
        nodeAddress,
        bnAmount,
      ).catch((e) => {
        if (e.message.includes('user rejected transaction')) {
          return null;
        }
        if (e.message === 'resulting stake < minStakeAmount') {
          return Notify.error(
            'Please stake a bigger amount.',
            'Your node stake will be below the minimum stake amount after this stake.',
          );
        }

        if (e.message === 'msg.value must be > 0') {
          return Notify.error('Amount must be greater than 0');
        }

        return Notify.error('Something went wrong', 'Please try again later');
      });
    },
    [contracts, nodeAddress],
  );

  const unstake = useCallback(
    (amount: string) => {
      if (!contracts) return null;
      if (provider && selectedChainId !== chainId) {
        switchToAmb(provider.provider);
        return null;
      }
      const bnAmount = parseEther(amount);
      return Methods.serverNodesUnstake(contracts, nodeAddress, bnAmount).catch(
        (e) => {
          if (e.message.includes('user rejected transaction')) {
            return null;
          }
          if (e.message === 'resulting stake < minStakeAmount') {
            return Notify.error(
              'Please unstake a smaller amount.',
              'Your node stake will be below the minimum stake amount after this unstake.',
            );
          }

          if (e.message === 'amount must be > 0') {
            return Notify.error('Amount must be greater than 0');
          }

          if (e.message === 'stake < amount') {
            return Notify.error('Amount must be less than current stake');
          }

          return Notify.error('Something went wrong', 'Please try again later');
        },
      );
    },
    [nodeAddress, contracts],
  );

  const retire = useCallback(
    (stake: BigNumber) => {
      if (!contracts) return null;
      if (provider && selectedChainId !== chainId) {
        switchToAmb(provider.provider);
        return null;
      }
      return Methods.serverNodesUnstake(contracts, nodeAddress, stake).catch(
        (e) => {
          if (e.message.includes('user rejected transaction')) {
            return null;
          }
          Notify.error('Something went wrong', 'Please try again later');
        },
      );
    },
    [nodeAddress, contracts],
  );

  const cancelUnstake = useCallback(() => {
    if (!contracts) return null;
    if (provider && selectedChainId !== chainId) {
      switchToAmb(provider.provider);
      return null;
    }
    return Methods.serverNodesRestake(contracts, nodeAddress).catch((e) => {
      if (e.message.includes('user rejected transaction')) {
        return null;
      }
      Notify.error('Something went wrong', 'Please try again later');
    });
  }, [nodeAddress, contracts]);

  const changeOwner = useCallback(
    (newOwner: string) => {
      if (!contracts) return null;
      if (provider && selectedChainId !== chainId) {
        switchToAmb(provider.provider);
        return null;
      }
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
      if (provider && selectedChainId !== chainId) {
        switchToAmb(provider.provider);
        return;
      }
      return Methods.serverNodesSetRewardsAddress(
        contracts,
        nodeAddress,
        newReceiver,
      );
    },
    [contracts, nodeAddress],
  );

  const getUnlockTime = useCallback(() => {
    if (!contracts) return null;

    return Methods.serverNodesGetUnstakeLockTime(contracts);
  }, [contracts]);

  return {
    addStake,
    unstake,
    cancelUnstake,
    changeOwner,
    changeRewardsReceiver,
    retire,
    getUnlockTime,
  };
}
