import warning from '../../../assets/svg/warning.svg';
import CommandText from './CommandText';
import FAQ from './FAQ';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

interface ConfirmProps {
  formData: any;
  backToStep: (step: number) => {};
  provider: any;
  account: string;
  minStakeAmount: number;
}

const faqs = [
  {
    title: 'What’s node address?',
    text: 'Wallet you  to use to set up a node. We recommend using a new wallet address. You can use a separate address for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
  },
  {
    title: 'What’s node owner address?',
    text: 'The node owner address is the wallet address you specify as the owner of the validator node, which is assigned to the node address. The node owner address manages the validator node and its node address. The node owner address receives the staking rewards.',
  },
  {
    title: 'What’s validator node?',
    text: 'Validator nodes approve transactions submitted to our blockchain by users. AirDAO validator nodes require AMB to be staked by the node owner. AirDAO’s blockchain protocol rewards validator node owners with AMB for providing transaction validation services to our network.',
  },
  {
    title: 'What’s stake?',
    text: 'AirDAO’s blockchain uses a ‘proof-of-stake’ consensus mechanism. Our blockchain validator nodes require a ‘stake’ of AMB to run. AMB is ‘staked’ by node owners in validator nodes that confirm blockchain transactions.',
  },
];

const Confirm = ({
  formData,
  backToStep,
  provider,
  account,
  minStakeAmount,
}: ConfirmProps) => {
  const [connectOwnerError, setConnectOwnerError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setConnectOwnerError(account !== formData.nodeOwner);
  }, [account]);

  const handleConfirmClick = async () => {
    setLoading(true);
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
    setLoading(false);
    localStorage.removeItem('nodeSetup');
  };

  return (
    <div className="white-container white-container_transparent">
      <h3 className="node-setup__title">Launch a validator node</h3>
      {isFinished ? (
        <p className="node-setup__text node-setup__text_height">
          <b>Your node isn't live yet.</b> Run the command in your server
          console to finish launching your node. Our{' '}
          <a className="blue-link" href="/">
            step-by-step guide
          </a>{' '}
          helps you through the required actions.
        </p>
      ) : (
        <p className="node-setup__text node-setup__text_height">
          <b>Please double check all selected parameters.</b> Connect the wallet
          you want to use to set up a node. Read how to set up a node with our
          GitHub Wiki. Need help? Go to{' '}
          <a href="mailto:support@airdao.io">support@airdao.io</a>
        </p>
      )}
      <p className="node-setup__text node-setup__text_height">
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
        </div>
      </div>
      {!isFinished &&
        (connectOwnerError ? (
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
              </p>
            </div>
          </div>
        ) : (
          <button
            className="node-setup__confirm"
            onClick={handleConfirmClick}
            disabled={loading}
          >
            {loading && <div className="node-setup-loader" />}
            Confirm
          </button>
        ))}
      {isFinished && <FAQ list={faqs} />}
    </div>
  );
};

export default Confirm;
