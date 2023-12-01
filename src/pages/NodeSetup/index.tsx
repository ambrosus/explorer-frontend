// @ts-nocheck
import { convertSecondsToTime } from '../../utils/helpers';
import Confirm from './components/Confirm';
import InitStep from './components/InitStep';
import NodeAddress from './components/NodeAddress';
import NodeOwner from './components/NodeOwner';
import RewardReceiver from './components/RewardReceiver';
import StakeSizeSelect from './components/StakeSizeSelect';
import {
  AmbErrorProviderWeb3,
  Contracts,
  Methods,
} from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';

const { ethereum }: any = window;
const ambChainId = process.env.REACT_APP_CHAIN_ID || '';

const NodeSetup: React.FC = () => {
  const { account, chainId } = useWeb3React();
  const provider = ethereum ? new AmbErrorProviderWeb3(ethereum) : null;

  const [formData, setFormData] = useState<{
    nodeAddress?: string;
    nodeOwner?: string;
    receiveAddress?: string;
    stake?: string;
  }>({});

  const [step, setStep] = useState(0);
  const [skipToConfirm, setSkipToConfirm] = useState(false);
  const [minStakeAmount, setMinStakeAmount] = useState(0);
  const [unlockTime, setUnlockTime] = useState(null);

  useEffect(() => {
    if (chainId !== +ambChainId) return;

    const contracts = new Contracts(provider, chainId);

    Methods.serverNodesGetMinStake(contracts).then((res) =>
      setMinStakeAmount(+utils.formatEther(res)),
    );
    Methods.serverNodesGetUnstakeLockTime(contracts).then((res: any) => {
      setUnlockTime(convertSecondsToTime(res.toNumber()));
    });
  }, [chainId]);

  useEffect(() => {
    if (account) {
      const dataFromStorage = localStorage.getItem('nodeSetup');

      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);

        if (parsedData[account] && !parsedData[account].finish) {
          setFormData(parsedData[account].formData);
          setStep(parsedData[account].step);
        }
      }
    }
  }, [account]);

  useEffect(() => {
    if (step && formData.nodeAddress) {
      const dataFromStorage = localStorage.getItem('nodeSetup') || '{}';
      const parsedData = JSON.parse(dataFromStorage);

      const data = JSON.stringify({
        ...parsedData,
        [formData.nodeAddress]: {
          ...parsedData[formData.nodeAddress],
          step,
          formData,
        },
      });
      localStorage.setItem('nodeSetup', data);
    }
  }, [formData, step]);

  const handleNextClick = () => {
    if (skipToConfirm) {
      setStep(5);
      setSkipToConfirm(false);
    } else {
      setStep((state) => state + 1);
    }
  };

  const handleOwnerAddress = () => {
    setFormData((state) => ({
      ...state,
      nodeOwner: account,
    }));

    handleNextClick();
  };

  const backToStep = (step: number) => {
    setStep(step);
    setSkipToConfirm(true);
  };

  return (
    <section className="node-setup container">
      {step !== 5 && (
        <div className="node-setup__heading">
          <h1 className="node-setup__title">Launch a validator node</h1>
          {step === 0 ? (
            <>
              <p className="node-setup__text">
                This page helps you through the process of launching a validator
                node. We highly recommend you read our{' '}
                <a
                  href="https://blog.airdao.io/airdao-node-setup-guide-f83df0bf4273"
                  target="_blank"
                >
                  step by step guide
                </a>{' '}
                for launching a validator node before you start.
              </p>
              <button
                className="node-setup__confirm node-setup__confirm_start"
                onClick={handleNextClick}
              >
                Start
              </button>
            </>
          ) : (
            <p className="node-setup__text">
              Launch a validator node page allows users to do all settings
              needed before the. We highly recommend to go through{' '}
              <a
                href="https://blog.airdao.io/airdao-node-setup-guide-f83df0bf4273"
                target="_blank"
              >
                step by step guide
              </a>{' '}
              for lunching validator node.
            </p>
          )}
        </div>
      )}
      {step === 0 && <InitStep />}
      {step === 1 && (
        <NodeAddress
          account={account}
          provider={provider}
          handleNextClick={handleNextClick}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <NodeOwner
          account={account}
          handleOwnerAddress={handleOwnerAddress}
          formData={formData}
        />
      )}
      {step === 3 && (
        <RewardReceiver
          formData={formData}
          handleNextClick={handleNextClick}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <StakeSizeSelect
          formData={formData}
          handleNextClick={handleNextClick}
          setFormData={setFormData}
          provider={provider}
          account={account}
          minStakeAmount={minStakeAmount}
          unlockTime={unlockTime}
        />
      )}
      {step === 5 && (
        <Confirm
          backToStep={backToStep}
          formData={formData}
          account={account}
          provider={provider}
          minStakeAmount={minStakeAmount}
        />
      )}
    </section>
  );
};

export default NodeSetup;
