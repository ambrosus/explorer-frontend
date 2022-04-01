import React, { useState } from 'react';
import TokenItem from '../TokenItem';

type TokenModalProps = {
	token: number;
	summary: any;
	selectedToken: string;
	icon: any;
	tokenName: string;
};

const TokenModal: React.FC<TokenModalProps> = ({ token, summary }) => {
	const [name, setName] = useState('');

	const changeInput = (e: any) => {
		setName(e.target.value);
		console.log(name);
	};

	return (
		<div className='tokenModal'>
			<input className='search__input' placeholder={`${summary} USD`} type='text' value={name} onChange={changeInput} />
			<div>
				<div className='tokenModal__tokens'>{`ERC-20 Tokens >20`}</div>
				<div className='tokenModal__arrows'></div>
			</div>
			<TokenItem />
		</div>
	);
};

export default TokenModal;
