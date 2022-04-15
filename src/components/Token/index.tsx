import React from 'react';

import TokenFilter from '../TokenFilter';

export interface TokenProps {
	selectedToken: Object
	onClick: any;
}

const Token :React.FC<TokenProps>= ({onClick,selectedToken}) => {
	return (
		<div className='token'>
			<div className='token__info'>
				<span className='token__info-name'>Token</span>
				<TokenFilter
					selectedToken={selectedToken}
					onClick={onClick}
				/>
			</div>
		</div>
	);
};

export default Token;
