// @ts-nocheck
import Confirm from './components/Confirm';
import InitStep from './components/InitStep';
import NodeAddress from './components/NodeAddress';
import NodeOwner from './components/NodeOwner';
import RewardReceiver from './components/RewardReceiver';
import StakeSizeSelect from './components/StakeSizeSelect';
import { AmbErrorProviderWeb3 } from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';

const { ethereum }: any = window;

const provider = new AmbErrorProviderWeb3(ethereum);

const NodeSetup: React.FC = () => {
  const { account } = useWeb3React();

  const [formData, setFormData] = useState<{
    nodeAddress?: string;
    nodeOwner?: string;
    receiveAddress?: string;
    stake?: string;
  }>({});

  const [step, setStep] = useState(0);
  const [skipToConfirm, setSkipToConfirm] = useState(false);

  useEffect(() => {
    if (account) {
      const dataFromStorage = localStorage.getItem('nodeSetup');

      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);
        setFormData(parsedData.formData);
        setStep(parsedData.step);
      }
    }
  }, [account]);

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
      {step === 0 && <InitStep handleNextClick={handleNextClick} />}
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
        />
      )}
      {step === 5 && (
        <Confirm
          backToStep={backToStep}
          formData={formData}
          account={account}
          provider={provider}
        />
      )}
    </section>
  );
};

export default NodeSetup;
