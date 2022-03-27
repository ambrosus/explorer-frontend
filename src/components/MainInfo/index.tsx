import React from 'react';
import MarketCap from '../../assets/icons/MarketCap';

const MainInfo = () => {
	return (
		<>
			<td className='tableInfo__td'>
				<div className='tableInfo__icon'>
					<MarketCap />
				</div>
				<div>
					<p className='tableInfo__p'>MARKET CAP</p>
					<p className='tableInfo__p'>17,895,744.27 USD</p>
				</div>
			</td>
		</>
	);
};

export default MainInfo;
