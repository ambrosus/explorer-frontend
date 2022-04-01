import React, { useState } from 'react';

import TokenFilter from '../TokenFilter';
import TokenModal from '../TokenModal';

const Token = () => {
	const [isShow, setIsShow] = useState(true);

	return (
		<div className='token'>
			<div className='token__info'>
				<span className='token__info-name'>Token</span>
				<TokenFilter />
			</div>
		</div>
	);
};

export default Token;
