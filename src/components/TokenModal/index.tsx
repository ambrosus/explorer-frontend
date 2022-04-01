import React, { useState } from 'react';

import Eth from '../../assets/icons/Cryptos/Eth';

type TokenModalProps = {
	token: number;
	summary: any;
	selectedToken: string;
	icon: any;
	tokenName: string;
};

const TokenModal: React.FC<TokenModalProps> = ({ token, summary }) => {
	const [name, setName] = useState('');
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(name);
	};

	const toggleMenu = () => console.log('hello');
	const changeInput = (e: any) => {
		setName(e.target.value);
		console.log(name);
	};

	return (
		<div className='tokenModal'>
			<input className='search__input' placeholder={`${summary} USD`} type='text' value={name} onChange={changeInput} />

			<div>{`ERC-20 Tokens >20`}</div>
			<div className='tokenModal_table'>
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
		</div>
	);
};

export default TokenModal;
