import React from 'react';

import TokenFilter from '../TokenFilter';
import { TokenType } from '../../pages/Addresses/AddressDetails/types';

export interface TokenProps {
	selectedToken: TokenType | null;
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
