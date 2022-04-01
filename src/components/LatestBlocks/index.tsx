import React from 'react';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';

const LatestBlocks = () => {
	const online: boolean = true;
	return (
		<tbody className='latestBlocks__tbody'>
			<tr className='latestBlocks__tr'>
				<td className='latestBlocks__td'>
					<p className='latestBlocks__p '>
						<span className='latestBlocks__circle'>{online ? <GreenCircle /> : <OrangeCircle />}</span>
						17122153
					</p>

					<p className='latestBlocks__p'>
						<span className='latestBlocks__span-light'>46 secs ago</span>
					</p>
				</td>
				<td className='latestBlocks__td'>
					<div className='latestBlocks__td-div'>
						<p className='latestBlocks__p'>
							<span className='latestBlocks__span-light'>Miner</span>
							<span className='latestBlocks__span-dark latestBlocks__margin-left'>MiningPoolHub</span>
						</p>
						<p className='latestBlocks__p'>
							<span className='latestBlocks__span-dark'>0 txns</span>
							<span className='latestBlocks__span-light latestBlocks__margin-left'>46 secs ago</span>
						</p>
					</div>
				</td>
				<td className='latestBlocks__td'>
					<div className='latestBlocks__td-div' style={{ alignSelf: 'flex-end' }}>
						<p className='latestBlocks__p' style={{ alignSelf: 'flex-end' }}>
							<span className='latestBlocks__span-light' style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
								Block Reward
							</span>
						</p>
						<p className='latestBlocks__p'>
							<span className='latestBlocks__span-dark'>1.71139 AMB</span>
						</p>
					</div>
				</td>
			</tr>
		</tbody>
	);
};

export default LatestBlocks;
