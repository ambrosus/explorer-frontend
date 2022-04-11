import React from 'react';
import Loader from '../Loader';
// react children nodes are not supported in typescript
// @ts-ignore
import { Children } from 'react';

interface Props {
	children: any;
	isLoading?: boolean;
}

export const Content = ({ children, isLoading = true }: Props) =>
	!isLoading
		? <Loader />
		: <div className='content'>{children}</div>;

Content.Header = ({ children,isLoading = true }:  Props) => (
	<div key='0' className='content__header'>
		{!isLoading
			? <Loader />
			:<div className='container'>{children}</div>}	</div>
);

Content.Body = ({ children,isLoading = true }: Props) => (
	<div key='1' className='content__body'>
		{!isLoading
			? <Loader />
			:<div className='container'>{children}</div>}
	</div>
);
