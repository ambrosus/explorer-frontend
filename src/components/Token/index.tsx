import React from 'react';

import TokenFilter from '../TokenFilter';

const Token = () => {
	return (
		<div className='token'>
			<div className='token__info'>
				<span className='token__info-name'>Token</span>
				<TokenFilter />
			</div>
		</div>
	);
};

export default Token;
