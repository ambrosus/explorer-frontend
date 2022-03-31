import React, { useState } from 'react';
import ArrowDownBig from '../../assets/icons/Arrows/ArrowDownBig';
import TokenFilter from '../TokenFilter';
import TokenModal from '../TokenModal';

const Token = () => {
	return (
		<div>
			<div className='addressDetails__info-token'>
				<span className='addressDetails__info-tokenName'>Token</span>
				<TokenFilter />
			</div>

			<TokenModal />
		</div>
	);
};

export default Token;
