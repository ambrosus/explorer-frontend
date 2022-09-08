import useAuthorization from '../../../hooks/useAuthorization';
import { NewHeader } from '../NewHeader';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import Menu from 'airdao-menu/build';
import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  const { account: address } = useWeb3React();
  const { loginMetamask, logout } = useAuthorization();

  return (
    <div className="layout ">
      <Menu
        address={address}
        login={loginMetamask}
        logout={logout}
        initHidden
      />
      <NewHeader />
      <div className="page">{children}</div>
    </div>
  );
};
