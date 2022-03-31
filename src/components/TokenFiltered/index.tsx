import React, { useState } from 'react';
import ArrowDownBig from '../../assets/icons/ArrowDownBig';

const TokenInput = () => {
	const [name, setName] = useState('');
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(name);
	};

	const toggleMenu = () => console.log('hello');

	return (
		<>
			<form className='search' onSubmit={handleSubmit}>
				<input className='search__input' placeholder='0.00 USD' type='text' value={name} onChange={(e) => setName(e.target.value)} />

				<button className='search__btn' type='submit' onClick={toggleMenu}>
					<ArrowDownBig />
				</button>
			</form>
		</>
	);
};

export default TokenInput;
