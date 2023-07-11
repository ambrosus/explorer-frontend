// @ts-nocheck
import ExplorerHelp from '../../ExplorerHelp';
import { NewHeader } from '../NewHeader';
import { Menu } from 'airdao-components-and-tools/components';
import {
  metamaskConnector,
  walletconnectConnector,
} from 'airdao-components-and-tools/utils';
import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout ">
      <div className="container" style={{ position: 'relative' }}>
        <Menu {...{ metamaskConnector, walletconnectConnector }} initHidden />
      </div>
      <NewHeader />
      <ExplorerHelp />
      <div className="page">{children}</div>
    </div>
  );
};
