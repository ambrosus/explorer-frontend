import React from 'react';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';

const LastestsInfo = () => {
	const online: boolean = true;

	return (
		<tr className='lastestsInfo__tr'>
			<td className='lastestsInfo__td'>
				<p className='lastestsInfo__p '>
					<span className='lastestsInfo__circle'>{online ? <GreenCircle /> : <OrangeCircle />}</span>
					17122153
				</p>

				<p className='lastestsInfo__p'>
					<span>46 secs ago</span>
				</p>
			</td>
			<td className='lastestsInfo__td'>
				<div>
					<p className='lastestsInfo__p'>MARKET CAP</p>
					<p className='lastestsInfo__p'>17,895,744.27 USD</p>
				</div>
			</td>
			<td className='lastestsInfo__td'>
				<div>
					<p className='lastestsInfo__p'>MARKET CAP</p>
					<p className='lastestsInfo__p'>17,895,744.27 USD</p>
				</div>
			</td>
		</tr>
	);
};

export default LastestsInfo;
