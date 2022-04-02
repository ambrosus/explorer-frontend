import React, { ChangeEvent, useState } from 'react';
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

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setName(e.target.value);
	};

	console.log(name);
	return (
		<div className='tokenModal'>
			<input className='tokenModal__search' placeholder='Search for Token Name' type='text' value={name} onChange={changeInput} />
			<div>
				<div className='tokenModal__tokens'>
					ERC-20 Tokens
					<span className='universall__light2' style={{ marginLeft: 4 }}>
						{'>'}20
					</span>
				</div>
				<div className='tokenModal__arrows'></div>
			</div>
			<TokenItem />
			<TokenItem />
			<TokenItem />
		</div>
	);
};

export default TokenModal;
