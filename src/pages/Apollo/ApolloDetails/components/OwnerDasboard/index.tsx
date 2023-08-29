import Button from '../../../../../components/Button';
import useApolloActions from '../../../../../hooks/useApolloActions';
import useApolloInfo from '../../../../../hooks/useApolloInfo';
import ChangeAddress from './ChangeAddress';
import StakeSize from './StakeSize';
import TelegramWidget from './TelegramWidget';
import React from 'react';

export default function OwnerDashboard({ address }: OwnerDashboardProps) {
  const { isOwner, apolloInfo, stakeUsd, updateInfo } = useApolloInfo(address);

  const {
    addStake,
    changeOwner,
    changeRewardsReceiver,
    unstake,
    cancelUnstake,
    retire,
    getUnlockTime,
  } = useApolloActions(address);

  function handleRetire() {
    // @ts-ignore
    retire(apolloInfo.stakeAmount)
      .then((tx) => {
        console.log('retire started');
        return tx.wait();
      })
      .then(() => {
        console.log('retire finished');
        updateInfo();
      });
  }

  return isOwner ? (
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
        />
      </div>
      <Button
        size="medium"
        type="plain"
        className="owner-dashboard__button"
        onClick={handleRetire}
      >
        Node retirement
      </Button>
      <TelegramWidget />
    </div>
  ) : null;
}

interface OwnerDashboardProps {
  address: string;
}
