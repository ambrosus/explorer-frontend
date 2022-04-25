import React, { FC } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

export interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => (
	<div className='layout '>
		<Header />
		<div className='page'>{children}</div>
		<Footer />
	</div>
);
