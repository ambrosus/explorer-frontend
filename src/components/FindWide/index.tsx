import { useState, useEffect, FormEvent, ChangeEvent, useCallback } from 'react';
import ArrowDown from '../../assets/icons/Arrows/ArrowDown';
import Search from '../../assets/icons/Search';

const FindWide = () => {
	const [name, setName] = useState('');
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(`This ${name}`);
	};
	const handleAllFilters = () => console.log('handleAllFilters');

	return (
		<>
			<form className='search' onSubmit={handleSubmit}>
				<input
					className='search__input'
					placeholder='Search by Node, Address, Tx, Block, Token, Bundle'
					type='text'
					value={name}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				/>
				<div className='search__filters vl'>
					<button onClick={handleAllFilters}>
						<span>All filters</span>
					</button>
					<span style={{ display: 'flex', margin: '0 10px' }}>
						<ArrowDown />
					</span>
				</div>
				<button className='search__btn' type='submit'>
					<Search />
				</button>
			</form>
		</>
	);
};

export default FindWide;
