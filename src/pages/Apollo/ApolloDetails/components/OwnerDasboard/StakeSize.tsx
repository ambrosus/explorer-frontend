import ArrowDownBig from '../../../../../assets/icons/Arrows/ArrowDownBig';
import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import useToggle from '../../../../../hooks/useToggle';
import PendingTxMessage from './PendingTxMessage';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useState } from 'react';

export default function StakeSize({
  stakeAmount,
  stakeUsd,
  addStake,
  unstake,
  cancelUnstake,
  withdrawLock,
  updateInfo,
}: StakeSizeProps) {
  const { toggled: isShowMore, setToggle: toggleShowMore } = useToggle();
  const [layoutState, setLayoutState] = useState('initial');

  return (
    <div className="stake-size">
      <div className="stake-size__head">
        <div className="stake-size__head-content">
          <h4 className="stake-size__title">Stake size</h4>
          <div className="stake-size__amount">
            <span className="stake-size__amount_amb">
              {formatEther(stakeAmount)} AMB
            </span>
            <span className="stake-size__amount_usd">${stakeUsd}</span>
          </div>
        </div>
        <button
          className={`stake-size__show-more ${
            isShowMore ? 'stake-size__show-more_active' : ''
          }`}
          onClick={toggleShowMore}
        >
          <ArrowDownBig className="stake-size__arrow" />
        </button>
      </div>
      <div
        className={`stake-size__additional-info ${
          isShowMore ? 'stake-size__additional-info_open' : ''
        }`}
      >
        {withdrawLock && layoutState !== 'pending' && (
          <LockedFundsMessage
            cancelUnstake={cancelUnstake}
            withdrawLock={withdrawLock}
            updateInfo={updateInfo}
          />
        )}
        {layoutState === 'initial' && (
          <AdditionalInfo
            onStake={() => setLayoutState('stake')}
            onUnstake={() => setLayoutState('unstake')}
          />
        )}
        {layoutState === 'stake' && (
          <Stake
            setLayoutState={setLayoutState}
            addStake={addStake}
            updateInfo={updateInfo}
          />
        )}
        {layoutState === 'unstake' && (
          <Unstake
            setLayoutState={setLayoutState}
            unstake={unstake}
            updateInfo={updateInfo}
          />
        )}
        {layoutState === 'pending' && <PendingTxMessage />}
      </div>
    </div>
  );
}

interface StakeSizeProps {
  stakeAmount: BigNumber;
  stakeUsd: number;
  addStake: any;
  unstake: (amount: string) => void;
  cancelUnstake: () => void;
  withdrawLock: any;
  updateInfo: () => void;
}

function AdditionalInfo({ onStake, onUnstake }: AdditionalInfoProps) {
  return (
    <>
      <p className="stake-size__text">
        You can change stake size. To decrease the stake size, the funds will be{' '}
        <b>locked for 15 days.</b>
      </p>
      <div className="stake-size__button-container">
        <Button type="primary" size="small" onClick={onStake}>
          Stake
        </Button>
        <Button
          type="plain"
          size="small"
          className="stake-size__white-button"
          onClick={onUnstake}
        >
          Unstake
        </Button>
      </div>
    </>
  );
}

interface AdditionalInfoProps {
  onStake: () => void;
  onUnstake: () => void;
}

function Stake({ setLayoutState, addStake, updateInfo }: StakeProps) {
  const [amount, setAmount] = useState('');

  const handleKeyPress = (e: any) => {
    // discard all symbols except listed in regex
    if (!/(1|2|3|4|5|6|7|8|9|0|,|\.|\b)/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInput = ({ target: { value: newValue } }: any) => {
    const formattedValue = newValue.replace(',', '.');
    if (/^\d*(\.\d{0,6})?$/.test(formattedValue) || formattedValue === '') {
      setAmount(formattedValue);
    }
  };

  const handleStake = () => {
    addStake(amount)
      .then((tx: any) => {
        setLayoutState('pending');
        return tx.wait();
      })
      .then(() => {
        setAmount('');
        setLayoutState('initial');
      })
      .catch(() => {
        setLayoutState('stake');
      })
      .finally(updateInfo);
  };

  return (
    <>
      <p className="stake-size__text">
        You can stake extra funds to increase your reward.
      </p>
      <div className="stake-size__button-container">
        <div className="slim-input">
          <input
            type="text"
            className="slim-input__input"
            value={amount}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
          />
          <span className="slim-input__label">AMB</span>
        </div>
        <Button type="primary" size="small" onClick={handleStake}>
          Confirm
        </Button>
        <Button
          type="plain"
          size="small"
          className="stake-size__white-button"
          onClick={() => setLayoutState('initial')}
        >
          Undo
        </Button>
      </div>
    </>
  );
}

interface StakeProps {
  setLayoutState: any;
  addStake: any;
  updateInfo: () => void;
}

function Unstake({ setLayoutState, unstake, updateInfo }: UnstakeProps) {
  const [amount, setAmount] = useState('');

  const handleKeyPress = (e: any) => {
    // discard all symbols except listed in regex
    if (!/(1|2|3|4|5|6|7|8|9|0|,|\.|\b)/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInput = ({ target: { value: newValue } }: any) => {
    const formattedValue = newValue.replace(',', '.');
    if (/^\d*(\.\d{0,6})?$/.test(formattedValue) || formattedValue === '') {
      setAmount(formattedValue);
    }
  };

  const handleUnstake = () => {
    unstake(amount)
      .then((tx: any) => {
        setLayoutState('pending');
        return tx.wait();
      })
      .then(() => {
        setAmount('');
        setLayoutState('initial');
      })
      .catch(() => {
        setLayoutState('unstake');
      })
      .finally(updateInfo);
  };

  return (
    <>
      <p className="stake-size__text">
        You can unstake full amount or part of it. The funds will be locked for
        15 days.
      </p>
      <div className="stake-size__button-container">
        <div className="slim-input">
          <input
            type="text"
            className="slim-input__input"
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            value={amount}
          />
          <span className="slim-input__label">AMB</span>
        </div>
        <Button type="primary" size="small" onClick={handleUnstake}>
          Confirm
        </Button>
        <Button
          type="plain"
          size="small"
          className="stake-size__white-button"
          onClick={() => setLayoutState('initial')}
        >
          Undo
        </Button>
      </div>
    </>
  );
}

interface UnstakeProps {
  setLayoutState: any;
  unstake: any;
  updateInfo: () => void;
}

function LockedFundsMessage({
  cancelUnstake,
  withdrawLock,
  updateInfo,
}: LockedFundsMessageProps) {
  const { amount, unlockTime } = withdrawLock;
  const unlockDate = new Date(unlockTime.toNumber() * 1000);

  const localDate = unlockDate.toLocaleDateString('uk-UA', { timeZone: 'UTC' });
  const localTime = unlockDate.toLocaleTimeString('uk-UA', { timeZone: 'UTC' });

  const handleCancel = () => {
    cancelUnstake()
      .then((tx: any) => {
        return tx.wait();
      })
      .finally(updateInfo);
  };
  console.log(amount);
  return (
    <div className="stake-size__pending">
      <Spinner className="stake-size__spinner" />
      <div className="stake-size__pending-text">
        <p>
          Transaction of changing the stake size is pending. You decrease the
          stake size by <b>{formatEther(amount)} AMB.</b> You funds
          will be deposited into the wallet after 15 days from the date the
          transaction confirmed.
        </p>
        <p className="stake-size__pending-date-time">
          <span className="stake-size__date">Date: {localDate}</span>
          <span className="stake-size__time">Time: {localTime} UTC</span>
        </p>
        <Button
          size={'small'}
          type={'tertiary'}
          onClick={handleCancel}
          className="stake-size__pending-cancel"
        >
          Cancel withdraw
        </Button>
      </div>
    </div>
  );
}

interface LockedFundsMessageProps {
  cancelUnstake: any;
  withdrawLock: any;
  updateInfo: () => void;
}
