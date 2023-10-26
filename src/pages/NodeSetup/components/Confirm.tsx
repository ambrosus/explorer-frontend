import warning from '../../../assets/svg/warning.svg';
import CommandText from './CommandText';
import FAQ from './FAQ';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfirmProps {
  formData: any;
  backToStep: (step: number) => {};
  provider: any;
  account: string;
  minStakeAmount: number;
}

const Confirm = ({
  formData,
  backToStep,
  provider,
  account,
  minStakeAmount,
}: ConfirmProps) => {
  const navigate = useNavigate();

  const [connectOwnerError, setConnectOwnerError] = useState(false);
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
      )
        .wait()
        .then(() => {
          const dataFromStorage = localStorage.getItem('nodeSetup') || '{}';
          const parsedData = JSON.parse(dataFromStorage);

          const data = JSON.stringify({
            ...parsedData,
            [formData.nodeAddress]: {
              ...parsedData[formData.nodeAddress],
              finish: true,
            },
          });
          localStorage.setItem('nodeSetup', data);
          navigate('/node-setup/finish/' + formData.nodeAddress);
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className="white-container white-container_transparent">
      <h3 className="node-setup__title">Launch a validator node</h3>
      <p className="node-setup__text node-setup__text_height">
        <b>Please double check all selected parameters.</b> Connect the wallet
        you want to use to set up a node. Read how to set up a node with our
        GitHub Wiki. Need help? Go to{' '}
        <a href="mailto:support@airdao.io">support@airdao.io</a>
      </p>
      <p className="node-setup__text node-setup__text_height">
        You will be able to change the stake size or node owner address later on
        the node dashboard page.
      </p>
      <div className="node-check">
        <div className="node-check__item">
          <p className="node-check__label">Node address</p>
          <p className="node-check__value">{formData.nodeAddress}</p>
          <button className="node-check__change" onClick={() => backToStep(1)}>
            Change
          </button>
        </div>
        <div
          className={`node-check__item ${
            connectOwnerError ? 'node-check__item_error' : ''
          }`}
        >
          <p className="node-check__label">Node owner address</p>
          <p className="node-check__value">{formData.nodeOwner}</p>
          <button className="node-check__change" onClick={() => backToStep(2)}>
            Change
          </button>
        </div>
        <div className="node-check__item">
          <p className="node-check__label">Node rewards recipient</p>
          <p className="node-check__value">{formData.receiveAddress}</p>
          <button className="node-check__change" onClick={() => backToStep(3)}>
            Change
          </button>
        </div>
        <div className="node-check__item">
          <p className="node-check__label">Stake amount</p>
          <p className="node-check__value">
            {formData.stake && (+formData.stake).toLocaleString()} AMB
          </p>
          <button className="node-check__change" onClick={() => backToStep(4)}>
            Change
          </button>
        </div>
      </div>
      {connectOwnerError ? (
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
      )}
    </div>
  );
};

export default Confirm;
