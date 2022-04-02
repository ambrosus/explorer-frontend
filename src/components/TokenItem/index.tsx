import React from 'react';

import Eth from '../../assets/icons/Cryptos/Eth';

type TokenItemProps = {};

const TokenItem: React.FC<TokenItemProps> = () => {
	return (
		<div className='tokenItem'>
			<div className='tokenItem__icon'>
				<Eth />
			</div>
			<div className='tokenItem__tokens'>
				<div>DarkChain</div>
				<div className='universall__light2'>7,810,914,244.011233 WEB 3.0</div>
			</div>
			<div className='tokenItem__amount'>
				<div>$ 292.72</div>
				<div className='universall__light2 universall__line-height'>@0.00</div>
			</div>
		</div>
	);
};

export default TokenItem;
