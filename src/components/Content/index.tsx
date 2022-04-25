import React, { FC } from 'react';
import Loader from '../Loader';

export const Content: FC<IContentProps> & ITabsComposition= ({ children, isLoading = true }: IContentProps) => (!isLoading ? <Loader /> :
	<div className='content'>{children}</div>);

Content.Header = ({ children, isLoading = true }: IContentProps) => (
	<div key='0' className='content__header'>
		{!isLoading ? <Loader /> : <div className='container'>{children}</div>}{' '}
	</div>
);

Content.Body = ({ children, isLoading = true }: IContentProps) => (
	<div key='1' className='content__body'>
		{!isLoading ? (
			<div style={{ minHeight: 400, marginTop: 200 }}>
				<Loader />
			</div>
		) : (
			<div className='container'>{children}</div>
		)}
	</div>
);

type IContentProps={
	children: any;
	isLoading?: boolean;
}

interface ITabsComposition {
	Header:React.FC<IContentProps>;
	Body:React.FC<IContentProps>;
}
