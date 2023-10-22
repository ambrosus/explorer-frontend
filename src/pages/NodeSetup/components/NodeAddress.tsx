// @ts-nocheck
import Warning from '../Warning';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import React, { useEffect, useState } from 'react';

interface NodeAddressProps {
  handleNextClick: () => {};
  setFormData: () => {};
  provider: any;
  account: string;
}

const NodeAddress = ({
  setFormData,
  provider,
  handleNextClick,
  account,
}: NodeAddressProps) => {
  const { isActive } = useWeb3React();
  const { loginMetamask } = useAuthorization(metamaskConnector);
  const [addressIsNodeError, setAddressIsNodeError] = useState(false);

  useEffect(() => {
    setAddressIsNodeError(false);
  }, [account]);

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

  const closeAddressIsNodeError = () => setAddressIsNodeError(false);

  return (
    <div className="white-container">
      <p className="white-container__step">Step 1</p>
      <h3 className="white-container__heading">Specify node address</h3>
      <p className="white-container__text">
        Connect the wallet you want to use to set up a node. This dashboard only
        works with MetaMask. We recommend using a new wallet address; you can use
        a separate address for all the transactions required when managing the node.
        You don’t need to store any funds in the node address.{' '}
        {isActive && (
          <span className="white-container__text-semi-bold">
            Do you want to continue with this address?
          </span>
        )}
      </p>
      {!isActive ? (
        <button className={'white-container__button'} onClick={loginMetamask}>
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
  );
};

export default NodeAddress;
