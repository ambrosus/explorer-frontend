import React, { useState } from 'react';
import ArrowDownBig from '../../assets/icons/Arrows/ArrowDownBig';
import TokenFilter from '../TokenFilter';
import TokenModal from '../TokenModal';

const Token = () => {
	return (
		<div className='token'>
			<div className='token__info'>
				<span className='token__info-name'>Token</span>
				<TokenFilter />
			</div>
			<div>
				<TokenModal />
			</div>
		</div>
	);
};

export default Token;
