import questionMark from '../../../assets/svg/question.svg';
import warning from '../../../assets/svg/warning.svg';
import CommandText from './CommandText';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

interface ConfirmProps {
  formData: any;
  backToStep: (step: number) => {};
  provider: any;
  account: string;
}

const Confirm = ({ formData, backToStep, provider, account }: ConfirmProps) => {
  const [connectOwnerError, setConnectOwnerError] = useState(false);
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    setConnectOwnerError(account !== formData.nodeOwner);
  }, [account]);

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
      setIsFinished(true);
    } catch (e) {
      console.log(e);
    }

    localStorage.removeItem('nodeSetup');
  };

  return (
    <div className="white-container white-container_transparent">
      <h3 className="white-container__heading">Launch a validator node</h3>
      {isFinished ? (
        <p className="white-container__text">
          <span className="white-container__text-semi-bold">
            Your node isn't live yet.
          </span>{' '}
          Run the command in your server console to finish launching your node.
          Our step-by-step guide helps you through the required actions.
        </p>
      ) : (
        <p className="white-container__text">
          <span className="white-container__text-semi-bold">
            Please double check all selected parameters.
          </span>{' '}
          Connect the wallet you want to use to set up a node. Read how to set
          up a node with our GitHub Wiki. Need help? Go to{' '}
          <a href="mailto:support@airdao.io">support@airdao.io</a>
        </p>
      )}
      <p className="white-container__text">
        You will be able to change the stake size or node owner address later on
        the node dashboard page.
      </p>
      {isFinished && <CommandText />}
      <div className="node-check">
        <div className="node-check__item">
          <p className="node-check__label">Node address</p>
          <p className="node-check__value">{formData.nodeAddress}</p>
          {!isFinished && (
            <button
              className="node-check__change"
              onClick={() => backToStep(1)}
            >
              Change
            </button>
          )}
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
          {!isFinished && (
            <button
              className="node-check__change"
              onClick={() => backToStep(2)}
            >
              Change
            </button>
          )}
          <img
            className="node-check__question"
            src={questionMark}
            alt="question mark"
          />
        </div>
        <div className="node-check__item">
          <p className="node-check__label">Node rewards recipient</p>
          <p className="node-check__value">{formData.receiveAddress}</p>
          {!isFinished && (
            <button
              className="node-check__change"
              onClick={() => backToStep(3)}
            >
              Change
            </button>
          )}
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
          {!isFinished && (
            <button
              className="node-check__change"
              onClick={() => backToStep(4)}
            >
              Change
            </button>
          )}
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
              that you specified as a node owner to continue. You must have a
              minimum of 1,000,000 AMB in this address to start staking.
            </p>
            <p className="white-container__text">
              Connected address:{' '}
              <span className="white-container__text-bold">{account}</span>
            </p>
          </div>
        </div>
      ) : (
        <button className="node-setup__confirm" onClick={handleConfirmClick}>
          Confirm
        </button>
      )}
    </div>
  );
};

export default Confirm;
