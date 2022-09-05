import { Header } from '../Header';
import { NewHeader } from '../NewHeader';
import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */
export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="layout ">
    <Header />
    <NewHeader />
    <div className="page">{children}</div>
  </div>
);
