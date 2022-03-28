import React from 'react';
import MarketCap from '../../assets/icons/MarketCap';

const lastestsInfo = () => {
	return (
		<>
			<td className='lastestsInfo__td'>
				<div className='lastestsInfo__circle-green'></div>
				<div>
					<p className='lastestsInfo__p'>MARKET CAP</p>
					<p className='lastestsInfo__p'>17,895,744.27 USD</p>
				</div>
			</td>
		</>
	);
};

export default lastestsInfo;
