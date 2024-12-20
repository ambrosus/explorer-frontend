import warning from '../../../assets/svg/warning.svg';
import { ambChainId } from '../../../utils/network';
import Warning from '../Warning';
import { useSwitchToConfiguredChain } from '@airdao/ui-library';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface StakeSizeSelectProps {
  formData: any;
  handleNextClick: () => {};
  setFormData: (state: any) => {};
  provider: any;
  account: string;
  minStakeAmount: number;
  unlockTime: number;
}

const StakeSizeSelect = ({
  formData,
  handleNextClick,
  provider,
  account,
  setFormData,
  minStakeAmount,
  unlockTime,
}: StakeSizeSelectProps) => {
  const { chainId } = useAccount();
  const switchToAmb = useSwitchToConfiguredChain();

  const [balance, setBalance] = useState(0);
  const [stakeError, setStakeError] = useState(false);
  const [insufficientBalanceError, setInsufficientBalanceError] =
    useState(false);
  const [ownerError, setOwnerError] = useState(false);

  useEffect(() => {
    provider.on('block', async () => {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      getBalance(address);
    });

    return () => {
      if (!provider) return;
      provider.removeAllListeners();
    };
  }, [chainId]);

  useEffect(() => {
    getBalance(account);
    setOwnerError(account !== formData.nodeOwner);
  }, [account]);

  const handleStake = () => {
    if (chainId !== ambChainId) {
      switchToAmb();
      return;
    }
    if (account !== formData.nodeOwner) {
      setOwnerError(true);
      return;
    }

    if (+formData.stake > balance) {
      setInsufficientBalanceError(true);
      return;
    }

    if (
      !formData.stake ||
      (formData.stake && +formData.stake < minStakeAmount)
    ) {
      setStakeError(true);
      return;
    }
    handleNextClick();
  };

  const getBalance = (address: string) => {
    provider.getBalance(address).then((res: any) => {
      const bal = Math.floor(+utils.formatEther(res));
      setBalance(bal);
      if (+formData.stake < bal && insufficientBalanceError) {
        setInsufficientBalanceError(false);
      }
    });
  };

  const closeStakeError = () => setStakeError(false);
  const closeInsufficientBalanceError = () =>
    setInsufficientBalanceError(false);

  const handleAmount = (value: any) => {
    setInsufficientBalanceError(false);

    if (value >= minStakeAmount) {
      setStakeError(false);
    }
    if (/^[0-9]+$/.test(value) || !value) {
      setFormData((state: any) => ({
        ...state,
        stake: value,
      }));
    }
  };

  return (
    <div className="white-container">
      <p className="white-container__step">Step 4</p>
      <h3 className="white-container__heading">Stake size for the node</h3>
      <p className="white-container__text">
        Enter the amount of AMB you want to stake. Node rewards are dynamic and
        depend on the amount of AMB you stake.
      </p>
      <p className="white-container__text">
        You can change the stake size later on the node dashboard page. If you
        reduce the stake size or shut down your node, your funds will be
        deposited into your wallet {unlockTime} after the date of transaction
        confirmation.
      </p>
      <p className="white-container__text">
        Balance:{' '}
        <span className="white-container__text-bold">
          {balance.toLocaleString()} AMB
        </span>
      </p>
      <div className="white-container__dropdown-wrapper">
        <div className="white-container__input-wrapper">
          <input
            className="white-container__input"
            value={formData.stake}
            onChange={(e) => handleAmount(e.target.value)}
            placeholder={`MIN ${minStakeAmount.toLocaleString()}`}
          />
          <span className="white-container__input-wrapper-label">AMB</span>
        </div>
        <button
          className="white-container__button white-container__button_white"
          onClick={handleStake}
        >
          {chainId !== ambChainId ? 'Switch to AirDAO Network' : 'Confirm'}
        </button>
      </div>
      {stakeError && (
        <Warning onClose={closeStakeError}>
          The minimum stake amount is {minStakeAmount.toLocaleString()} AMB.
          Enter a larger amount to continue.
        </Warning>
      )}
      {insufficientBalanceError && (
        <Warning onClose={closeInsufficientBalanceError}>
          Insufficient balance.
        </Warning>
      )}
      {ownerError && (
        <div className="white-container white-container_warning">
          <img src={warning} alt="warning" />
          <div>
            <p className="warning-title">
              You’ve connected the wrong wallet address.
            </p>
            <p className="warning-text">
              Connect the address that you specified as a node owner to
              continue. You must have a minimum of{' '}
              {minStakeAmount.toLocaleString()} AMB in this address to start
              staking.
              <br />
              Connected address: <b>{account}</b>
              <br />
              Node owner address: <b>{formData.nodeOwner}</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StakeSizeSelect;
