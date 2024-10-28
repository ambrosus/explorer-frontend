import Button from '../../../../../components/Button';
import useApolloActions from '../../../../../hooks/useApolloActions';
import useApolloInfo from '../../../../../hooks/useApolloInfo';
import ChangeAddress from './ChangeAddress';
import StakeSize from './StakeSize';
import TelegramWidget from './TelegramWidget';
import { useEthersAdapter } from '@airdao/ui-library';
import React, { useState } from 'react';

export default function OwnerDashboard({ address }: OwnerDashboardProps) {
  const [retireLoading, setRetireLoading] = useState(false);
  const { isOwner, apolloInfo, stakeUsd, updateInfo } = useApolloInfo(address);
  const { provider } = useEthersAdapter();

  const {
    addStake,
    changeOwner,
    changeRewardsReceiver,
    unstake,
    cancelUnstake,
    retire,
    getUnlockTime,
  } = useApolloActions(address);

  async function handleRetire() {
    setRetireLoading(true);
    //@ts-ignore
    await retire(apolloInfo.stakeAmount)
      .then((tx) => {
        return tx?.wait();
      })
      .then(() => {
        updateInfo();
      });
    setRetireLoading(false);
  }

  const stakeIsZero = apolloInfo?.stakeAmount.isZero();

  return isOwner && provider ? (
    <div className="apollo_details__owner-info-container">
      <div className="apollo_details__owner-info">
        <StakeSize
          stakeAmount={apolloInfo?.stakeAmount}
          stakeUsd={stakeUsd}
          addStake={addStake}
          unstake={unstake}
          cancelUnstake={cancelUnstake}
          withdrawLock={apolloInfo?.withdrawLock}
          updateInfo={updateInfo}
          getUnlockTime={getUnlockTime}
        />
        <ChangeAddress
          ownerAddress={apolloInfo?.ownerAddress}
          changeOwner={changeOwner}
          rewardsAddress={apolloInfo?.rewardsAddress}
          changeRewardsReceiver={changeRewardsReceiver}
          updateInfo={updateInfo}
          disabled={stakeIsZero}
        />
      </div>
      {!stakeIsZero && (
        <>
          <Button
            size="medium"
            type="plain"
            className="owner-dashboard__button"
            onClick={handleRetire}
            disabled={retireLoading}
          >
            {retireLoading && <div className="node-setup-loader" />}
            Retire node
          </Button>
          <TelegramWidget />
        </>
      )}
    </div>
  ) : null;
}

interface OwnerDashboardProps {
  address: string;
}
