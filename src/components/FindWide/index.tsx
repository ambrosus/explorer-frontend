import React, { useState } from 'react';
import Search from '../../assets/icons/Search';

const FindWide = () => {
	const [name, setName] = useState('');
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(name);
	};
	return (
		<>
			<form className='search' onSubmit={handleSubmit}>
				<input
					className='search__input'
					placeholder='Search by Node, Address, Tx, Block, Token, Bundle'
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<span className='search__filters vl'>All filters</span>

				<button className='search__btn' type='submit'>
					<Search />
				</button>
			</form>
		</>
	);
};

export default FindWide;
