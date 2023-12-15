import ArrowDownBig from '../../../../../assets/icons/Arrows/ArrowDownBig';
import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import useToggle from '../../../../../hooks/useToggle';
import {
  convertSecondsToTime,
  numberWithCommas,
} from '../../../../../utils/helpers';
import PendingTxMessage from './PendingTxMessage';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

export default function StakeSize({
  stakeAmount,
  stakeUsd,
  addStake,
  unstake,
  cancelUnstake,
  withdrawLock,
  updateInfo,
  getUnlockTime,
}: StakeSizeProps) {
  const { toggled: isShowMore, setToggle: toggleShowMore } = useToggle();
  const [layoutState, setLayoutState] = useState('initial');
  const [defaultUnlockTime, setUnlockTime] = useState('');

  useEffect(() => {
    console.log(1);
    getUnlockTime().then((res: any) =>
      setUnlockTime(convertSecondsToTime(res.toNumber())),
    );
  }, []);

  useEffect(() => {
    if (stakeAmount.isZero()) {
      toggleShowMore(true);
    }
  }, [stakeAmount]);

  return (
    <div className="stake-size">
      <div className="stake-size__head">
        <div className="stake-size__head-content">
          <h4 className="stake-size__title">Stake size</h4>
          <div className="stake-size__amount">
            <span className="stake-size__amount_amb">
              {numberWithCommas((+formatEther(stakeAmount)).toFixed(2))} AMB
            </span>
            <span className="stake-size__amount_usd">${stakeUsd}</span>
          </div>
        </div>
        {!stakeAmount.isZero() ? (
          <button
            className={`stake-size__show-more ${
              isShowMore ? 'stake-size__show-more_active' : ''
            }`}
            onClick={toggleShowMore}
          >
            <ArrowDownBig className="stake-size__arrow" />
          </button>
        ) : withdrawLock ? (
          <button
            className={`stake-size__show-more ${
              isShowMore ? 'stake-size__show-more_active' : ''
            }`}
            onClick={toggleShowMore}
          >
            <ArrowDownBig className="stake-size__arrow" />
          </button>
        ) : null}
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
            setLayoutState={setLayoutState}
            defaultUnlockTime={defaultUnlockTime}
          />
        )}
        {layoutState === 'initial' && !stakeAmount.isZero() && (
          <AdditionalInfo
            onStake={() => setLayoutState('stake')}
            onUnstake={() => setLayoutState('unstake')}
            defaultUnlockTime={defaultUnlockTime}
            withdrawLock={withdrawLock}
          />
        )}
        {layoutState === 'stake' && !stakeAmount.isZero() && (
          <Stake
            setLayoutState={setLayoutState}
            addStake={addStake}
            updateInfo={updateInfo}
          />
        )}
        {layoutState === 'unstake' && !stakeAmount.isZero() && (
          <Unstake
            setLayoutState={setLayoutState}
            unstake={unstake}
            updateInfo={updateInfo}
            defaultUnlockTime={defaultUnlockTime}
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
  getUnlockTime: () => any;
}

function AdditionalInfo({
  onStake,
  onUnstake,
  defaultUnlockTime,
  withdrawLock,
}: AdditionalInfoProps) {
  return (
    <>
      {!withdrawLock && (
        <p className="stake-size__text">
          You can change the size of your stake. Withdrawals have a{' '}
          <b>{defaultUnlockTime} delay</b>.
        </p>
      )}
      <div
        className="stake-size__button-container"
        style={withdrawLock ? { marginTop: 24 } : {}}
      >
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
  defaultUnlockTime: string;
  withdrawLock: any;
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
        Stake more AMB to increase your rewards!
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

function Unstake({
  setLayoutState,
  unstake,
  updateInfo,
  defaultUnlockTime,
}: UnstakeProps) {
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
        You can unstake all or part of your stake. Withdrawals have a{' '}
        <b style={{ whiteSpace: 'nowrap' }}>{defaultUnlockTime} delay</b>.
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
  defaultUnlockTime: string;
}

function LockedFundsMessage({
  cancelUnstake,
  withdrawLock,
  updateInfo,
  setLayoutState,
  defaultUnlockTime,
}: LockedFundsMessageProps) {
  const { amount, unlockTime } = withdrawLock;
  const unlockDate = new Date(unlockTime.toNumber() * 1000);

  const localDate = unlockDate.toLocaleDateString('uk-UA', { timeZone: 'UTC' });
  const localTime = unlockDate.toLocaleTimeString('uk-UA', { timeZone: 'UTC' });

  const handleCancel = () => {
    setLayoutState('pending');
    cancelUnstake()
      .then((tx: any) => {
        console.log('cancel unstake started');
        return tx.wait();
      })
      .then(() => {
        console.log('cancel unstake finished');
        setLayoutState('initial');
      })
      .catch((e: any) => {
        console.log('cancel unstake error', e);
        setLayoutState('initial');
      })
      .finally(updateInfo);
  };

  return (
    <div className="stake-size__pending">
      <Spinner className="stake-size__spinner" />
      <div className="stake-size__pending-text">
        <p>
          Your stake size change transaction is pending. You reduced your stake
          size to <b>{numberWithCommas((+formatEther(amount)).toFixed(2))} AMB</b>. Your funds
          will be deposited into your wallet{' '}
          {defaultUnlockTime.replace('-', ' ')} after the transaction confirms.
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
          Cancel
        </Button>
      </div>
    </div>
  );
}

interface LockedFundsMessageProps {
  cancelUnstake: any;
  withdrawLock: any;
  updateInfo: () => void;
  setLayoutState: any;
  defaultUnlockTime: string;
}
