import ArrowDownBig from '../../../../../assets/icons/Arrows/ArrowDownBig';
import Button from '../../../../../components/Button';
import useToggle from '../../../../../hooks/useToggle';
import PendingTxMessage from './PendingTxMessage';
import { isAddress } from 'ethers/lib/utils';
import { useState } from 'react';

export default function ChangeAddress({
  ownerAddress,
  rewardsAddress,
  changeOwner,
  changeRewardsReceiver,
  updateInfo,
}: ChangeAddressProps) {
  return (
    <div className="change-address">
      <AddressBody
        title="node owner address"
        address={ownerAddress}
        changeAddress={changeOwner}
        updateInfo={updateInfo}
      />
      <hr className="change-address__divider" />
      <AddressBody
        title="block rewards receiver address"
        address={rewardsAddress}
        changeAddress={changeRewardsReceiver}
        updateInfo={updateInfo}
      />
    </div>
  );
}

interface ChangeAddressProps {
  ownerAddress: string;
  changeOwner: (address: string) => any;
  rewardsAddress: string;
  changeRewardsReceiver: (address: string) => any;
  updateInfo: () => any;
}

function AddressBody({
  title,
  address,
  changeAddress,
  updateInfo,
}: AddressBodyProps) {
  const { toggled, setToggle } = useToggle();
  const [newAddress, setNewAddress] = useState('');
  const [isError, setIsError] = useState(false);

  const [layoutState, setLayoutState] = useState('initial');

  function changeHandler() {
    if (!isAddress(newAddress)) {
      setIsError(true);
      return;
    }

    setLayoutState('pending');

    changeAddress(newAddress)
      .then((tx) => {
        console.log('change address started');
        return tx.wait();
      })
      .then(() => {
        console.log('change address success');
        setNewAddress('');
        setLayoutState('initial');
      })
      .catch((err) => {
        console.log('change address error', err);
        setLayoutState('changing');
      })
      .finally(updateInfo);
  }

  return (
    <div className="change-address__body">
      <div className="change-address__container">
        <div className="change-address__content">
          <h4 className="change-address__title">{title}</h4>
          <div className="change-address__address">{address}</div>
        </div>
        <button
          className={`stake-size__show-more ${
            toggled ? 'stake-size__show-more_active' : ''
          }`}
          onClick={setToggle}
        >
          <ArrowDownBig className="stake-size__arrow" />
        </button>
      </div>
      <div
        className={`change-address__additional-info ${
          toggled ? 'change-address__additional-info_open' : ''
        }`}
      >
        {layoutState === 'initial' && (
          <Button
            size="small"
            type="plain"
            className="stake-size__white-button change-address__top-offset"
            onClick={() => setLayoutState('changing')}
          >
            Change address
          </Button>
        )}

        {layoutState === 'changing' && (
          <>
            <h4 className="change-address__title change-address__top-offset">
              New address
            </h4>
            <div
              className={`slim-input ${
                isError ? 'slim-input_error' : ''
              } change-address__input`}
            >
              <input
                type="text"
                className="slim-input__input"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                onFocus={() => setIsError(false)}
              />
            </div>
            <Button type="primary" size="small" onClick={changeHandler}>
              Confirm change address
            </Button>
          </>
        )}

        {layoutState === 'pending' && <PendingTxMessage />}
      </div>
    </div>
  );
}

interface AddressBodyProps {
  title: string;
  address: string;
  changeAddress: (address: string) => Promise<any>;
  updateInfo: () => any;
}