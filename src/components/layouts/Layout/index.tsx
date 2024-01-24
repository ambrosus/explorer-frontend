// @ts-nocheck
import { NewHeader } from '../NewHeader';
import { Header } from '@airdao/ui-library';
import { useWeb3React } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect-v2';
import {
  useAuthorization,
  useAutoLogin,
} from 'airdao-components-and-tools/hooks';
import {
  metamaskConnector,
  walletconnectConnector,
} from 'airdao-components-and-tools/utils';
import { ethers } from 'ethers';
import React, { FC, useEffect, useState } from 'react';

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
  const [balance, setBalance] = useState('0');
  const { account, connector } = useWeb3React();

  const { loginMetamask, loginWalletConnect, logout } = useAuthorization(
    metamaskConnector,
    walletconnectConnector,
  );
  const isLoaded = useAutoLogin(metamaskConnector);

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

  return (
    <div className="layout ">
      <div className="container" style={{ position: 'relative' }}>
        <Header
          loginMetamask={loginMetamask}
          loginWalletConnect={loginWalletConnect}
          account={account}
          disconnect={logout}
          balance={balance}
          connector={
            connector instanceof WalletConnect ? 'walletconnect' : 'metamask'
          }
        />
      </div>
      <NewHeader />
      <div className="page">{children}</div>
    </div>
  );
};
