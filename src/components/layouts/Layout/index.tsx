import ExplorerHelp from '../../ExplorerHelp';
import { NewHeader } from '../NewHeader';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { Menu } from 'airdao-components-and-tools/components';
import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */

export const Layout: FC<LayoutProps> = ({ children }) => {
  const web3ReactInstance = useWeb3React();

  return (
    <div className="layout ">
      <div className="container" style={{ position: 'relative' }}>
        <Menu web3ReactInstance={web3ReactInstance} initHidden />
      </div>
      <NewHeader />
      <ExplorerHelp />
      <div className="page">{children}</div>
    </div>
  );
};
