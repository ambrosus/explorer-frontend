// @ts-nocheck
import { NewHeader } from '../NewHeader';
import { Header } from '@airdao/ui-library';
import { useWeb3React } from '@web3-react/core';
import {
  useAuthorization,
  useAutoLogin,
} from 'airdao-components-and-tools/hooks';
import {
  switchToAmb,
  metamaskConnector,
  walletconnectConnector,
  bitgetWalletConnector,
} from 'airdao-components-and-tools/utils';
import { ethers } from 'ethers';
import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */

const readProvider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_EXPLORER_NETWORK,
);

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [balance, setBalance] = useState('0');
  const { account, connector, chainId, provider } = useWeb3React();

  const {
    loginMetamask,
    loginWalletConnect,
    loginSafepal,
    loginBitget,
    logout,
  } = useAuthorization(
    metamaskConnector,
    walletconnectConnector,
    bitgetWalletConnector,
  );

  const isLoaded = useAutoLogin(metamaskConnector, bitgetWalletConnector);

  useEffect(() => {
    getBalance();
    readProvider.on('block', () => {
      getBalance();
    });
    return () => {
      readProvider.removeAllListeners('block');
    };
  }, [account, isLoaded]);

  const getBalance = async () => {
    if (!account) return;

    const bnBalance = await readProvider.getBalance(account);
    const numBalance = ethers.utils.formatEther(bnBalance);
    setBalance((+numBalance).toFixed(2));
  };

  const isSupportedChain =
    process.env.REACT_APP_CHAIN_ID === chainId?.toString() || !account;

  return (
    <div
      className={`layout ${
        pathname.includes('maintenance') ? 'page-maintenance' : ''
      }`}
    >
      <div className="container header" style={{ position: 'relative' }}>
        <Header
          loginSafepal={loginSafepal}
          loginMetamask={loginMetamask}
          loginWalletConnect={loginWalletConnect}
          loginBitget={loginBitget}
          account={account}
          disconnect={logout}
          balance={balance}
          isSupportedChain={isSupportedChain}
          switchToAmb={() => switchToAmb(provider?.provider)}
          connector={connector}
        />
      </div>
      <NewHeader />
      <div className="page">{children}</div>
    </div>
  );
};
