import ArrowDownBig from '../../../../../assets/icons/Arrows/ArrowDownBig';
import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import useToggle from '../../../../../hooks/useToggle';
import { useState } from 'react';

export default function StakeSize() {
  const { toggled: isShowMore, setToggle: toggleShowMore } = useToggle();
  const [state, setState] = useState('pending');

  return (
    <div className="stake-size">
      <div className="stake-size__head">
        <div className="stake-size__head-content">
          <h4 className="stake-size__title">Stake size</h4>
          <div className="stake-size__amount">
            <span className="stake-size__amount_amb">400,000.00 AMB</span>
            <span className="stake-size__amount_usd">$2,626.42</span>
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
        {state === 'initial' && (
          <AdditionalInfo
            onStake={() => setState('stake')}
            onUnstake={() => setState('unstake')}
          />
        )}
        {state === 'stake' && <Stake undo={() => setState('initial')} />}
        {state === 'unstake' && <Unstake undo={() => setState('initial')} />}
        {state === 'pending' && <PendingTxMessage />}
      </div>
    </div>
  );
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

function Stake({ undo }: { undo?: () => void }) {
  return (
    <>
      <p className="stake-size__text">
        You can stake extra funds to increase your reward.
      </p>
      <div className="stake-size__button-container">
        <div className="slim-input">
          <input type="text" className="slim-input__input" />
          <span className="slim-input__label">AMB</span>
        </div>
        <Button type="primary" size="small">
          Confirm
        </Button>
        <Button
          type="plain"
          size="small"
          className="stake-size__white-button"
          onClick={undo}
        >
          Undo
        </Button>
      </div>
    </>
  );
}

function Unstake({ undo }: { undo?: () => void }) {
  return (
    <>
      <p className="stake-size__text">
        You can unstacke full amount or part of it. The funds will be locked for
        15 days.
      </p>
      <div className="stake-size__button-container">
        <div className="slim-input">
          <input type="text" className="slim-input__input" />
          <span className="slim-input__label">AMB</span>
        </div>
        <Button type="primary" size="small">
          Confirm
        </Button>
        <Button
          type="plain"
          size="small"
          className="stake-size__white-button"
          onClick={undo}
        >
          Undo
        </Button>
      </div>
    </>
  );
}

function PendingTxMessage() {
  return (
    <div className="stake-size__pending">
      <Spinner className="stake-size__spinner" />
      <div className="stake-size__pending-text">
        Transaction of changing the stake size is pending...
      </div>
    </div>
  );
}

function LockedFundsMessage() {
  return (
    <div className="stake-size__pending">
      <Spinner className="stake-size__spinner" />
      <div className="stake-size__pending-text">
        Transaction of changing the stake size is pending. You reduce the stake
        size to 200,000.00 AMB. You funds will be deposited into the wallet
        after 15 days from the date the transaction confirmed.
        <br /> <br />
        Date: 09.10.2022{'   '}Time: 09:30 UTC
        <Button size={'small'} type={'tertiary'}>
          Cancel withdraw
        </Button>
      </div>
    </div>
  );
}
