import React from 'react';

import Eth from '../../assets/icons/Cryptos/Eth';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface Token {
	name: string;
	contract: string;
	tokenBalance: string;
	type: string;
	transfers:number
}

type TokenItemProps = {
	token: Token;
	setToken: Function;
};


const TokenItem: React.FC<TokenItemProps> = ({token,setToken}) => {
	const {filters } = useTypedSelector((state: any) => state.tokenFilters)

	const handleKeyPress = (e:KeyboardEvent) => {
		if (e.key==='Enter'){
			setToken(token)
		}
	}
	return (
		<div className='tokenItem'
				 tabIndex={0}
			// @ts-ignore
				 onKeyDown={handleKeyPress}
				 style={{backgroundColor : filters.includes(token) ? '#EFF2F5':'#fff'}}>
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
