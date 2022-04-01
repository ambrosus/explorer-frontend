import React from 'react';

import TokenFilter from '../TokenFilter';
import TokenModal from '../TokenModal';

const Token = () => {
	const num = 0.0;
	return (
		<div className='token'>
			<div className='token__info'>
				<span className='token__info-name'>Token</span>
				<TokenFilter />
			</div>
			<div>
				<TokenModal token={0} summary={num.toFixed(2)} selectedToken={''} icon={undefined} tokenName={''} />
			</div>
		</div>
	);
};

export default Token;
