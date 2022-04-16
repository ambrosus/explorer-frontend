import React from 'react';
import Eth from '../../assets/icons/Cryptos/Eth';

type TokenItemProps = {
	token: any;
	selectedToken:any
};

const TokenItem: React.FC<TokenItemProps> = ({token,selectedToken}) => {
	return (
		<div className='tokenItem'
				 tabIndex={0}
			// @ts-ignore
				 style={{backgroundColor : selectedToken && selectedToken.name && selectedToken.name === token.name ? '#EFF2F5':'#fff'}}>
			<div className='tokenItem__icon'>
				<Eth />
			</div>
			<div className='tokenItem__tokens'>
				<div>
					{token.name.length > 13
						? `${token.name.slice(0, 11)}...`
						: token.name}</div>
				<div className='universall__light2'>1 AMB</div>
			</div>
			<div className='tokenItem__amount'>
				<div>{Number(token.tokenBalance).toFixed(2)}</div>
				<div className='universall__light2 universall__line-height'>@0.00</div>
			</div>
		</div>
	);
};

export default TokenItem;
