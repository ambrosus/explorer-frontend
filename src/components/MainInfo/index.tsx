import React from 'react';
import MarketCap from '../../assets/icons/MarketCap';

const MainInfo = () => {
	return (
		<>
			<td className='mainInfo__td'>
				<div className='mainInfo__icon'>
					<MarketCap />
				</div>
				<div>
					<p className='mainInfo__p'>MARKET CAP</p>
					<p className='mainInfo__p'>17,895,744.27 USD</p>
				</div>
			</td>
		</>
	);
};

export default MainInfo;
