// @ts-ignore
import { AmbErrorProviderWeb3, Contracts } from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { MetamaskConnectButton } from 'airdao-components-and-tools/components';
// @ts-ignore
import { useAuthorization } from 'airdao-components-and-tools/hooks';
// @ts-ignore
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import React, { useState } from 'react';

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

  const [step, setStep] = useState(1);
  const [connectOwnerError, setConnectOwnerError] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [stakeError, setStakeError] = useState(false);
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

  const handleNodeAddress = () => {
    setFormData((state) => ({
      ...state,
      nodeAddress: account,
    }));
    handleNextClick();
  };

  const handleOwnerAddress = () => {
    if (account === formData.nodeAddress && !isSameAddress) {
      setIsSameAddress(true);
      return;
    }
    setFormData((state) => ({
      ...state,
      nodeOwner: account,
    }));

    handleNextClick();
  };

  const handleStake = () => {
    if (formData.stake && +formData.stake < 1000000) {
      setStakeError(true);
      return;
    }
    handleNextClick();
  };

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

    serverNodesManager.newStake(formData.nodeAddress, formData.receiveAddress, {
      value: minStake,
    });
  };

  return (
    <section className="node-setup container">
      <h1 className="node-setup__common-heading">Launch a validator node</h1>
      <h2 className="node-setup__common-subheading">
        Follow instructions to launch a node. Need help? Go to support@airdao.io
      </h2>
      {step === 1 && (
        <div className="white-container">
          <h3 className="white-container__heading">Specify node address</h3>
          {!isActive ? (
            <>
              <p className="white-container__text">
                Connect the wallet you want to use to set up a node.
              </p>
              <MetamaskConnectButton onClick={loginMetamask} />
            </>
          ) : (
            <>
              <p className="white-container__text">
                Do you want to use this address as a node address?
              </p>
              {account}
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
        <>
          <div className="white-container">
            <h3 className="white-container__heading">
              Specify node owner address
            </h3>
            <p className="white-container__text">
              The "Node owner address" is used to manage the node and stake the
              required amount of AMB to launch it. We recommend using separate
              addresses for node setup and management.
              <br /> <br /> Open Metamask and select the address you want to use
              as a node owner address.
            </p>
          </div>
          <div className="white-container">
            <h3 className="white-container__heading">
              Do you want to use this address as a node owner address?
            </h3>
            {account}
            {isSameAddress && (
              <p className="white-container__text white-container__text_warn">
                Using the same addresses for setting up and managing a node
                carries security risks and may result in the loss of your funds.
                Select a different address in the metamask or click confirm to
                continue.
              </p>
            )}
            <button
              className={'white-container__button'}
              onClick={handleOwnerAddress}
            >
              Confirm
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          {!isSameAddress && (
            <div className="white-container">
              <h3>Choose address to receive rewards</h3>
              <p className="white-container__text">
                Enter the address that will receive your node rewards.
              </p>
              {[formData.nodeAddress, formData.nodeOwner].map((address) => (
                <div
                  className={`white-container__address-button ${
                    formData.receiveAddress === address &&
                    'white-container__address-button_active'
                  }`}
                  onClick={() =>
                    setFormData((state) => ({
                      ...state,
                      receiveAddress: address,
                    }))
                  }
                >
                  {address}
                </div>
              ))}
            </div>
          )}
          <div className="white-container">
            <h3>Choose stake size for the node</h3>
            <p className="white-container__text">
              Enter the amount of AMB you want to stake. Node rewards are
              dynamic and depend on the amount of AMB you stake.
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
            <input
              onChange={(e) =>
                setFormData((state) => ({
                  ...state,
                  stake: e.target.value,
                }))
              }
              placeholder="MIN 1 000 000"
            />

            <button className="white-container__button" onClick={handleStake}>
              Confirm
            </button>
          </div>
        </>
      )}
      {step === 4 && <div className="white-container"></div>}
    </section>
  );
};

export default NodeSetup;
