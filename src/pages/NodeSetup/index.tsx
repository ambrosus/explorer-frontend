// @ts-ignore
import { AmbErrorProviderWeb3, Contracts } from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { MetamaskConnectButton } from 'airdao-components-and-tools/components';
// @ts-ignore
import { useAuthorization } from 'airdao-components-and-tools/hooks';
// @ts-ignore
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import React, {useEffect, useState} from 'react';
import InputWithDropdown from "./Dropdown";
import {ethers} from "ethers";

const { ethereum }: any = window;

const provider = new AmbErrorProviderWeb3(ethereum);

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
  const [stakeError, setStakeError] = useState(false);

  useEffect(() => {
    if (step === 5) {
      setConnectOwnerError(account !== formData.nodeOwner);
    }
  }, [account])

  const handleNextClick = () => setStep((state) => state + 1);

  const handleNodeAddress = () => {
    setFormData((state) => ({
      ...state,
      nodeAddress: account,
    }));
    handleNextClick();
  };

  const handleOwnerAddress = () => {
    setFormData((state) => ({
      ...state,
      nodeOwner: account,
    }));

    handleNextClick();
  };

  const handleStake = () => {
    if (!formData.stake || (formData.stake && +formData.stake < 1000000)) {
      setStakeError(true);
      return;
    }
    if (account !== formData.nodeOwner) {
      setConnectOwnerError(true);
    }
    handleNextClick();
  };

  const handleConfirmClick = async () => {
    // добавить проверку что адрес кошелька совпадает с nodeOwner
    const signer = provider.getSigner();
    const chainId = (await provider.getNetwork()).chainId;

    const { contracts } = new Contracts(signer, chainId);

    const serverNodesManager = contracts.ServerNodesManager;
    console.log(formData);

    serverNodesManager.newStake(formData.nodeAddress, formData.receiveAddress, {
      value: ethers.utils.parseUnits(formData.stake || '', 18),
    });
  };

  return (
    <section className="node-setup container">
      {step === 0 && (
        <div className="white-container">
          <p className="white-container__step">Step 0</p>
          <h3 className="white-container__heading">Welcome to the launch a validator node</h3>
          <p className="white-container__text">What’s node address</p>
          <p className="white-container__text">What’s node owner address</p>
          <button
            className={'white-container__button'}
            onClick={handleNextClick}
          >
            Start
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="white-container">
          <h3 className="white-container__heading">Specify node address</h3>
          <p className="white-container__text">
            Connect the wallet you want to use to set up a node. We recommend to create a new address. You can use separate wallet for all transactions necessary for managing the node. So you don’t need to store any founds on the node address.
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
              <p className="white-container__text">Connected address: {account}</p>
              <button
                className={'white-container__button'}
                onClick={handleNodeAddress}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="white-container">
          <h3 className="white-container__heading">
            Specify the node owner
          </h3>
          <p className="white-container__text">We recommend to select a different address for managing a node carries. It will increase the safety level of your ‘project’. </p>
          <p className="white-container__text">Select different address in your Metamask browser extension or continue with the connected address. You will be able to change node owner address later on the node dashboard page.</p>
          <p className="white-container__text">Node address: {formData.nodeAddress}</p>
          <p className="white-container__text">Current address: {account}</p>
          <button
            className={'white-container__button'}
            onClick={handleOwnerAddress}
          >
            {formData.nodeAddress === account ? 'Continue with the same address' : 'Continue'}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="white-container">
          <h3>Rewards receiver</h3>
          <p className="white-container__text">
            Select the address, that will receive your node rewards. You will be able to change address later on the node dashboard page.
          </p>
          <div className="white-container__dropdown-wrapper">
            <InputWithDropdown
              options={[formData.nodeAddress, formData.nodeOwner]}
              selectedOption={formData.receiveAddress}
              setSelectedOption={(address) =>
                setFormData((state) => ({
                  ...state,
                  receiveAddress: address,
                }))}
            />
            <button
              className={'white-container__button'}
              onClick={handleNextClick}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="white-container">
          <h3>Stake size for the node</h3>
          <p className="white-container__text">
            Enter the amount of AMB you want to stake. Node rewards are dynamic and depend on the amount of AMB you stake.
          </p>
          <p className="white-container__text">
            You will be able to change the stake size later on the node dashboard page. If the you reduce the stake size or decide to close it, the funds will be deposited into the wallet after 15 days from the date of transaction confirmation.
          </p>
          <p className="white-container__text">
            Balance: 5 000 000 AMB
          </p>
          {stakeError && (
            <p className="white-container__text white-container__text_warn">
              The minimum stake amount is 1 000 000 AMB. Enter a larger amount
              to continue.
            </p>
          )}
          {connectOwnerError && (
            <p>Choose node owner address in metamask to proceed</p>
          )}
          <div className="white-container__dropdown-wrapper">
            <input
              className="white-container__input"
              onChange={(e) =>
                setFormData((state) => ({
                  ...state,
                  stake: e.target.value,
                }))
              }
              type='number'
              min={1000000}
              placeholder="MIN 1 000 000"
            />
            <button className="white-container__button" onClick={handleStake}>
              Confirm
            </button>
          </div>
        </div>
      )}
      {step === 5 && (
        <div className="white-container">
          <h3>Launch a validator node</h3>
          <p>Please double check all selected parameters. Connect the wallet you want to use to set up a node. Read how to set up a node with our GitHub Wiki. Need help? Go to support@airdao.io</p>
          <p>You will be able to change the stake size or node owner address later on the node dashboard page.</p>
          <div className="node-check">
            <div className="node-check__item">
              <p className="node-check__label">Node address</p>
              <p className="node-check__value">{formData.nodeAddress}</p>
            </div>
            <div className="node-check__item">
              <p className="node-check__label">Node owner address</p>
              <p className="node-check__value">{formData.nodeOwner}</p>
            </div>
            <div className="node-check__item">
              <p className="node-check__label">Node rewards recipient</p>
              <p className="node-check__value">{formData.receiveAddress}</p>
            </div>
            <div className="node-check__item">
              <p className="node-check__label">Stake amount</p>
              <p className="node-check__value">{formData.stake && (+formData.stake).toLocaleString()}</p>
            </div>
          </div>
          {connectOwnerError ? (
            <div className="white-container white-container_warning">
              <p className="white-container__text">
                Wrong address. Connect with address that you selected as a node owner to continue. Make sure you have enough founds on this address for stake.
              </p>
              <p className="white-container__text">
                Connected address: {account}
              </p>
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
