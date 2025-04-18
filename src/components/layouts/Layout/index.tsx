import { NewHeader } from '../NewHeader';
import { Header } from '@airdao/ui-library';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */

const envChainId = process.env.REACT_APP_CHAIN_ID
  ? +process.env.REACT_APP_CHAIN_ID
  : 16718;

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div
      className={`layout ${
        pathname.includes('maintenance') ? 'page-maintenance' : ''
      }`}
    >
      <div className="container header" style={{ position: 'relative' }}>
        <Header chainId={envChainId} />
      </div>
      <NewHeader />
      <div className="page">{children}</div>
    </div>
  );
};
