import React from 'react';

import Eth from '../../assets/icons/Cryptos/Eth';

type TokenItemProps = {};

const TokenItem: React.FC<TokenItemProps> = () => {
	return (
		<div className='TokenItem_table'>
			<div>
				<Eth />
			</div>
			<div>
				<div>DarkChain</div>
				<div>7,810,914,244.011233 WEB 3.0</div>
			</div>
			<div>
				<div>$ 292.72</div>
				<div>@0.00</div>
			</div>
		</div>
	);
};

export default TokenItem;
