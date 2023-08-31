import Warning from '../Warning';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';
// @ts-ignore
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';

interface StakeSizeSelectProps {
  formData: any;
  handleNextClick: () => {};
  setFormData: (state: any) => {};
  provider: any;
  account: string;
}

const StakeSizeSelect = ({
  formData,
  handleNextClick,
  provider,
  account,
  setFormData,
}: StakeSizeSelectProps) => {
  const [balance, setBalance] = useState(0);
  const [stakeError, setStakeError] = useState(false);
  const [insufficientBalanceError, setInsufficientBalanceError] =
    useState(false);
  const [minStakeAmount, setMinStakeAmount] = useState(0);

  useEffect(() => {
    provider.on('block', async () => {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      getBalance(address);
    });

    const network = getCurrentAmbNetwork();
    const contracts = new Contracts(provider, network.chainId);
    Methods.serverNodesGetMinStake(contracts).then((res) =>
      setMinStakeAmount(+utils.formatEther(res)),
    );
  }, []);

  useEffect(() => {
    getBalance(account)
  }, [account]);

  const handleStake = () => {
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
    provider
      .getBalance(address)
      .then((res: any) => setBalance(Math.floor(+utils.formatEther(res))));
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
        You will be able to change the stake size later on the node dashboard
        page. If the you reduce the stake size or decide to close it, the funds
        will be deposited into the wallet after 15 days from the date of
        transaction confirmation.
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
          Confirm
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
    </div>
  );
};

export default StakeSizeSelect;