import React from 'react';

export const Content = ({ children }: any) => <div className='content'>{children}</div>;

Content.Header = ({ children }: any) => (
	<div key='0' className='content__header'>
		<div className='container'>{children}</div>
	</div>
);

Content.Body = ({ children }: any) => (
	<div key='1' className='content__body'>
		<div className='container'>{children}</div>
	</div>
);
