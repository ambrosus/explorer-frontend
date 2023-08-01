import { isValidEthereumAddress } from '../../utils/helpers';
// @ts-ignore
import { AmbErrorProviderWeb3, Contracts } from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { useAuthorization } from 'airdao-components-and-tools/hooks';
// @ts-ignore
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import React, { useEffect, useState } from 'react';

const { ethereum }: any = window;

const provider = new AmbErrorProviderWeb3(ethereum);

const NodeSetup: React.FC = () => {
  const web3ReactInstance = useWeb3React();
  const { loginMetamask } = useAuthorization(metamaskConnector);
  const { account } = web3ReactInstance;

  const [formData, setFormData] = useState<{
    nodeAddress?: string;
    nodeOwner?: string;
    receiveAddress?: string;
  }>({});

  const [step, setStep] = useState(1);
  const [connectOwnerError, setConnectOwnerError] = useState(false);

  useEffect(() => {
    if (connectOwnerError) {
      setConnectOwnerError(false);
    }
    if (step === 1) {
      setStep(account ? 2 : 1);
    }
  }, [account]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'nodeOwner') {
      setFormData((state) => ({
        ...state,
        receiveAddress: value,
      }));
    }
  };

  const handleNextClick = () => setStep((state) => state + 1);

  const handleConfirmClick = async () => {
    if (account !== formData.nodeOwner) {
      setConnectOwnerError(true);
      return;
    }
    // добавить проверку что адрес кошелька совпадает с nodeOwner
    const signer = provider.getSigner();
    const chainId = (await provider.getNetwork()).chainId;

    const { contracts } = new Contracts(signer, chainId);

    const serverNodesManager = contracts.ServerNodesManager;
    const minStake = await serverNodesManager.minStakeAmount();
    console.log(formData);

    serverNodesManager.newStake(formData.nodeAddress, formData.receiveAddress, { value: minStake });
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Connect Wallet</h2>
          <button onClick={loginMetamask}>Connect Wallet</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2: Enter Node Address</h2>
          <input
            type="text"
            name="nodeAddress"
            value={formData.nodeAddress || ''}
            onChange={handleChange}
          />
          <button
            disabled={!isValidEthereumAddress(formData.nodeAddress)}
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Step 3: Enter Node Owner</h2>
          <input
            type="text"
            name="nodeOwner"
            value={formData.nodeOwner || ''}
            onChange={handleChange}
          />
          <button
            disabled={!isValidEthereumAddress(formData.nodeOwner)}
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Step 4: Select Receive Address</h2>
          <select
            name="receiveAddress"
            value={formData.receiveAddress || ''}
            onChange={handleChange}
          >
            <option value={formData.nodeOwner}>{formData.nodeOwner}</option>
            <option value={formData.nodeAddress}>{formData.nodeAddress}</option>
          </select>
          {connectOwnerError && (
            <p>Choose node owner address in metamask to proceed</p>
          )}
          <button onClick={handleConfirmClick}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default NodeSetup;
