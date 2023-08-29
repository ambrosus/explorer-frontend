// @ts-nocheck
import questionMark from '../../assets/svg/question.svg';
import warning from '../../assets/svg/warning.svg';
import { isValidEthereumAddress } from '../../utils/helpers';
import InputWithDropdown from './Dropdown';
import Warning from './Warning';
import {
  AmbErrorProviderWeb3,
  Methods,
  Contracts,
} from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';
import { ethers, utils } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';

const { ethereum }: any = window;

const provider = new AmbErrorProviderWeb3(ethereum);
const network = getCurrentAmbNetwork();
const contracts = new Contracts(provider, network.chainId);

const NodeSetup: React.FC = () => {
  const { account, isActive } = useWeb3React();
  const { loginMetamask } = useAuthorization(metamaskConnector);

  const [formData, setFormData] = useState<{
    nodeAddress?: string;
    nodeOwner?: string;
    receiveAddress?: string;
    stake?: string;
  }>({});

  const [step, setStep] = useState(0);
  const [connectOwnerError, setConnectOwnerError] = useState(false);
  const [selectRewardError, setSelectRewardError] = useState(false);
  const [stakeError, setStakeError] = useState(false);
  const [addressIsNodeError, setAddressIsNodeError] = useState(false);
  const [balance, setBalance] = useState(0);
  const [skipToConfirm, setSkipToConfirm] = useState(false);
  const [minStakeAmount, setMinStakeAmount] = useState(0);

  useEffect(() => {
    setAddressIsNodeError(false);

    if (account) {
      const dataFromStorage = localStorage.getItem('nodeSetup');

      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);
        setFormData(parsedData.formData);
        setStep(parsedData.step);
      }
      provider
        .getBalance(account)
        .then((res: any) => setBalance(Math.floor(+utils.formatEther(res))));
    }

    Methods.serverNodesGetMinStake(contracts)
      .then((res) => setMinStakeAmount(+utils.formatEther(res)))
    ;

  }, [account]);

  useEffect(() => {
    if (step === 5) {
      setConnectOwnerError(account !== formData.nodeOwner);
    }
  }, [step, account]);

  useEffect(() => {
    if (step) {
      const data = JSON.stringify({ step, formData });
      localStorage.setItem('nodeSetup', data);
    }
  }, [formData, step]);

  const handleNextClick = () => {
    if (skipToConfirm) {
      setStep(5);
    } else {
      setStep((state) => state + 1);
    }
  };

  const handleNodeAddress = async () => {
    const chainId = (await provider.getNetwork()).chainId;
    const contracts = new Contracts(provider, chainId);

    const isAlreadyNode = !(
      await Methods.serverNodesGetStake(contracts, account)
    ).stake.isZero();

    if (isAlreadyNode) {
      setAddressIsNodeError(true);
    } else {
      setAddressIsNodeError(false);
      setFormData((state) => ({
        ...state,
        nodeAddress: account,
      }));
      handleNextClick();
    }
  };

  const handleOwnerAddress = () => {
    setFormData((state) => ({
      ...state,
      nodeOwner: account,
    }));

    handleNextClick();
  };

  const handleRewardAddress = () => {
    if (
      !formData.receiveAddress ||
      !isValidEthereumAddress(formData.receiveAddress)
    ) {
      setSelectRewardError(true);
    } else {
      handleNextClick();
    }
  };

  const setRewardAddress = (address: string) => {
    setSelectRewardError(false);
    setFormData((state) => ({
      ...state,
      receiveAddress: address,
    }));
  };

  const handleStake = () => {
    if (
      !formData.stake ||
      (formData.stake && +formData.stake < minStakeAmount)
    ) {
      setStakeError(true);
      return;
    }
    if (account !== formData.nodeOwner) {
      setConnectOwnerError(true);
    }
    handleNextClick();
  };

  const handleConfirmClick = async () => {
    const signer = provider.getSigner();
    const chainId = (await provider.getNetwork()).chainId;
    const contracts = new Contracts(signer, chainId);

    try {
      await (
        await Methods.serverNodesNewStake(
          contracts,
          formData.nodeAddress,
          formData.receiveAddress,
          ethers.utils.parseUnits(formData.stake || '', 18),
        )
      ).wait();
    } catch (e) {
      console.log(e);
    }

    localStorage.removeItem('nodeSetup');
  };

  const closeStakeError = () => setStakeError(false);
  const closeRewardError = () => setSelectRewardError(false);
  const closeAddressIsNodeError = () => setAddressIsNodeError(false);

  const backToStep = (step: number) => {
    setStep(step);
    setSkipToConfirm(true);
  };

  const handleAmount = (value) => {
    if (value >= minStakeAmount) {
      setStakeError(false);
    }
    if (/^[0-9]+$/.test(value) || !value) {
      setFormData((state) => ({
        ...state,
        stake: value,
      }));
    }
  };

  return (
    <section className="node-setup container">
      {step === 0 && (
        <div className="white-container">
          <p className="white-container__step">Step 0</p>
          <h3 className="white-container__heading">
            Welcome to the launch a validator node
          </h3>
          <p className="white-container__text">What’s node address</p>
          <p className="white-container__text">What’s node owner address</p>
          <button
            className="white-container__button white-container__button_white"
            onClick={handleNextClick}
          >
            Start
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="white-container">
          <p className="white-container__step">Step 1</p>
          <h3 className="white-container__heading">Specify node address</h3>
          <p className="white-container__text">
            Connect the wallet you want to use to set up a node. We recommend to
            create a new address. You can use separate wallet for all
            transactions necessary for managing the node. So you don’t need to
            store any founds on the node address.{' '}
            {isActive && (
              <span className="white-container__text-semi-bold">
                Do you want to continue with this address?
              </span>
            )}
          </p>
          {!isActive ? (
            <button
              className={'white-container__button'}
              onClick={loginMetamask}
            >
              Connect wallet
            </button>
          ) : (
            <>
              <p className="white-container__text">
                Connected address:{' '}
                <span className="white-container__text-bold">{account}</span>
              </p>
              <button
                className="white-container__button white-container__button_white"
                onClick={handleNodeAddress}
              >
                Continue with connected address
              </button>
              {addressIsNodeError && (
                <Warning onClose={closeAddressIsNodeError}>
                  Address is already a node
                </Warning>
              )}
            </>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="white-container">
          <p className="white-container__step">Step 2</p>
          <h3 className="white-container__heading">Specify the node owner</h3>
          <p className="white-container__text">
            We recommend to select a different address for managing a node
            carries. It will increase the safety level of your ‘project’.{' '}
          </p>
          <p className="white-container__text">
            Select different address in your Metamask browser extension or
            continue with the connected address. You will be able to change node
            owner address later on the node dashboard page.
          </p>
          <div>
            <p className="white-container__text">
              Node address: {formData.nodeAddress}
            </p>
            <p className="white-container__text">
              Current address:{' '}
              <span className="white-container__text-bold">{account}</span>
            </p>
          </div>
          <button
            className="white-container__button white-container__button_white"
            onClick={handleOwnerAddress}
          >
            {formData.nodeAddress === account
              ? 'Continue with the same address'
              : 'Continue'}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="white-container">
          <p className="white-container__step">Step 3</p>
          <h3 className="white-container__heading">Rewards receiver</h3>
          <p className="white-container__text">
            Select the address, that will receive your node rewards. You will be
            able to change address later on the node dashboard page.
          </p>

          <div className="white-container__dropdown-wrapper">
            <InputWithDropdown
              options={[formData.nodeAddress, formData.nodeOwner]}
              selectedOption={formData.receiveAddress}
              setSelectedOption={setRewardAddress}
            />
            <button
              className="white-container__button white-container__button_white"
              onClick={handleRewardAddress}
            >
              Confirm
            </button>
          </div>
          {selectRewardError && (
            <Warning onClose={closeRewardError}>Select reward address</Warning>
          )}
        </div>
      )}
      {step === 4 && (
        <div className="white-container">
          <p className="white-container__step">Step 4</p>
          <h3 className="white-container__heading">Stake size for the node</h3>
          <p className="white-container__text">
            Enter the amount of AMB you want to stake. Node rewards are dynamic
            and depend on the amount of AMB you stake.
          </p>
          <p className="white-container__text">
            You will be able to change the stake size later on the node
            dashboard page. If the you reduce the stake size or decide to close
            it, the funds will be deposited into the wallet after 15 days from
            the date of transaction confirmation.
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
              The minimum stake amount is {minStakeAmount.toLocaleString()} AMB. Enter a larger amount
              to continue.
            </Warning>
          )}
        </div>
      )}
      {step === 5 && (
        <div className="white-container white-container_transparent">
          <h3 className="white-container__heading">Launch a validator node</h3>
          <p className="white-container__text">
            <span className="white-container__text-semi-bold">
              Please double check all selected parameters.
            </span>{' '}
            Connect the wallet you want to use to set up a node. Read how to set
            up a node with our GitHub Wiki. Need help? Go to support@airdao.io
          </p>
          <p className="white-container__text">
            You will be able to change the stake size or node owner address
            later on the node dashboard page.
          </p>
          <div className="node-check">
            <div className="node-check__item">
              <p className="node-check__label">Node address</p>
              <p className="node-check__value">{formData.nodeAddress}</p>
              <button
                className="node-check__change"
                onClick={() => backToStep(1)}
              >
                Change
              </button>
              <img
                className="node-check__question"
                src={questionMark}
                alt="question mark"
              />
            </div>
            <div
              className={`node-check__item ${
                connectOwnerError ? 'node-check__item_error' : ''
              }`}
            >
              <p className="node-check__label">Node owner address</p>
              <p className="node-check__value">{formData.nodeOwner}</p>
              <button
                className="node-check__change"
                onClick={() => backToStep(2)}
              >
                Change
              </button>
              <img
                className="node-check__question"
                src={questionMark}
                alt="question mark"
              />
            </div>
            <div className="node-check__item">
              <p className="node-check__label">Node rewards recipient</p>
              <p className="node-check__value">{formData.receiveAddress}</p>
              <button
                className="node-check__change"
                onClick={() => backToStep(3)}
              >
                Change
              </button>
              <img
                className="node-check__question"
                src={questionMark}
                alt="question mark"
              />
            </div>
            <div className="node-check__item">
              <p className="node-check__label">Stake amount</p>
              <p className="node-check__value">
                {formData.stake && (+formData.stake).toLocaleString()} AMB
              </p>
              <button
                className="node-check__change"
                onClick={() => backToStep(4)}
              >
                Change
              </button>
              <img
                className="node-check__question"
                src={questionMark}
                alt="question mark"
              />
            </div>
          </div>
          {connectOwnerError ? (
            <div className="white-container white-container_warning">
              <img src={warning} alt="warning" />
              <div className="owner-warning-wrapper">
                <p className="white-container__text">
                  You’ve connected the wrong wallet address. Connect the address
                  that you specified as a node owner to continue. You must have
                  a minimum of 1,000,000 AMB in this address to start staking.
                </p>
                <p className="white-container__text">
                  Connected address:{' '}
                  <span className="white-container__text-bold">{account}</span>
                </p>
              </div>
            </div>
          ) : (
            <button
              className="node-setup__confirm"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default NodeSetup;
