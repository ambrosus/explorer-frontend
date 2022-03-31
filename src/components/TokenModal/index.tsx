import React, { useState } from 'react';
import ArrowDownBig from '../../assets/icons/ArrowDownBig';

const TokenModal = () => {
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
		<>
			<div className='toggleMenu__modal'>
				<input className='search__input' placeholder='0.00 USD' type='text' value={name} onChange={changeInput} />

				<div>{`ERC-20 Tokens >20`}</div>
				<div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default TokenModal;
