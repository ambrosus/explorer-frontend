import React, { useState } from 'react';
import ArrowDownBig from '../../assets/icons/Arrows/ArrowDownBig';
import TokenModal from '../TokenModal';

const TokenFilter = () => {
	const [name, setName] = useState('');
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(name);
	};
	const num = 0.0;

	const toggleMenu = () => setIsShow(!isShow);

	const [isShow, setIsShow] = useState(false);

	return (
		<>
			<div className='tokenFilter' onSubmit={handleSubmit}>
				<div className='tokenFilter__input'>
					<span className='tokenFilter__input-rectangle'>4</span>
					<span className='tokenFilter__input-text'>{`> $ 152.35 USD`}</span>
					<button className='tokenFilter__input-btn' type='button' onClick={toggleMenu}>
						<ArrowDownBig />
					</button>
				</div>
				<div>{isShow && <TokenModal token={0} summary={num.toFixed(2)} selectedToken={''} icon={undefined} tokenName={''} />}</div>
			</div>
		</>
	);
};

export default TokenFilter;
