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
					<p className='mainInfo__p'>
						<span className='mainInfo__span-light'>MARKET CAP</span>
					</p>
					<p className='mainInfo__p'>
						<span className='mainInfo__span-dark'>17,895,744.27 USD</span>
					</p>
				</div>
			</td>
		</>
	);
};

export default MainInfo;
