// @ts-nocheck
import { convertSecondsToTime } from '../../../utils/helpers';
import { getRetiredApollos } from '../../Apollo/utils';
import Warning from '../Warning';
import { Contracts, Methods } from '@airdao/airdao-node-contracts';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization } from 'airdao-components-and-tools/hooks';
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import { switchToAmb } from 'airdao-components-and-tools/utils';
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
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [account]);

  const handleNodeAddress = async () => {
    switchToAmb(provider.provider);
    const chainId = (await provider.getNetwork()).chainId;
    const contracts = new Contracts(provider, chainId);

    const isAlreadyNode = !(
      await Methods.serverNodesGetStake(contracts, account)
    ).stake.isZero();

    const retiredApollos = await getRetiredApollos();

    const unlockDateTimeString = retiredApollos.find(
      ({ address }) => address.toLowerCase() === account.toLowerCase(),
    )?.unlockTime;

    if (isAlreadyNode) {
      setError('Address is already a node');
    } else if (
      retiredApollos.some(
        ({ address }) => address.toLowerCase() === account.toLowerCase(),
      )
    ) {
      const [date, time, timezone] = unlockDateTimeString.split(' ');

      setError(
        `The node has been retired. On ${date} at ${time} ${timezone} you will be able to launch a node with this address.`,
      );
    } else {
      setError('');
      setFormData((state) => ({
        ...state,
        nodeAddress: account,
      }));
      handleNextClick();
    }
  };

  const closeAddressIsNodeError = () => setError('');

  return (
    <div className="white-container">
      <p className="white-container__step">Step 1</p>
      <h3 className="white-container__heading">Specify node address</h3>
      <p className="white-container__text">
        Connect the wallet you want to use to set up a node. This dashboard only
        works with MetaMask. We recommend using a new wallet address; you can
        use a separate address for all the transactions required when managing
        the node. You don’t need to store any funds in the node address.{' '}
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
          {!!error && (
            <Warning onClose={closeAddressIsNodeError}>{error}</Warning>
          )}
        </>
      )}
    </div>
  );
};

export default NodeAddress;
