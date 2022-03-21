import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const Layout = (props: any) => {
	const { children } = props;
	return (
		<div className='layout '>
			<Header />
			<div className='page'>{children}</div>
			<Footer />
		</div>
	);
};
