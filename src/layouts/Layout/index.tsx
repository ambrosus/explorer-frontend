import { Footer } from '../Footer';
import { Header } from '../Header';
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
    <div className="page">{children}</div>
    <Footer />
  </div>
);
