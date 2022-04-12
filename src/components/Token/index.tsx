import React from 'react';

import TokenFilter from '../TokenFilter';

export interface TokenProps {
	selectedToken: Object
	onClick: (token: Object) => any;
}

const Token :React.FC<TokenProps>= ({selectedToken,
																			onClick}) => {
	return (
		<div className='token'
				 tabIndex={1}
		>
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
