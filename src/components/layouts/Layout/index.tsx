// @ts-nocheck
import { NewHeader } from '../NewHeader';
import { Header } from '@airdao/ui-library';
import { useWeb3React } from '@web3-react/core';
import { useAuthorization, useAutoLogin } from 'airdao-components-and-tools/hooks';
import {
  metamaskConnector,
  walletconnectConnector,
} from 'airdao-components-and-tools/utils';
import React, { FC, useEffect, useState } from 'react';
import {ethers} from "ethers";

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [balance, setBalance] = useState('0');
  const { account, provider } = useWeb3React();

  const { loginMetamask, loginWalletConnect, logout } = useAuthorization(
    metamaskConnector,
    walletconnectConnector,
  );
  const isLoaded = useAutoLogin(metamaskConnector);

  useEffect(() => {
    getBalance();
  }, [account]);

  const getBalance = async () => {
    if (!provider) return;

    const bnBalance = await provider.getBalance(account);
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
        />
      </div>
      <NewHeader />
      <div className="page">{children}</div>
    </div>
  );
};
