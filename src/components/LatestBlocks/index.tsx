import React from 'react';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';
import { sliceData, calcTime } from '../../utils/helpers';

type LatestBlocksProps = {
	name: string;
	number: any;
	timestamp: number;
	validator: string;
	totalTransactions: number;
	blockReward: number;
};

const LatestBlocks: React.FC<LatestBlocksProps> = ({ number, timestamp, validator, totalTransactions, blockReward }) => {
	const online: boolean = true;
	const isOnline = online ? <GreenCircle /> : <OrangeCircle />;

	const calckBlocks = (blockReward: any) =>
		blockReward.reduce((acc: any, item: { reward: { ether: any } }) => acc + item.reward.ether, 0).toFixed(5);

	return (
		<>
			<div className='latestBlocks__cells'>
				<div className='latestBlocks__cell'>
					<div className='latestBlocks__cell-content latestBlocks__font-big'>
						<span>{isOnline}</span>
						{number}
					</div>

					<div className='latestBlocks__p latestBlocks__font-small'>{calcTime(timestamp)}</div>
				</div>

				<div className='latestBlocks__cell'>
					<div className='latestBlocks__cell-content'>
						<div className='latestBlocks__font-small'>Validator</div>
						<div className='latestBlocks__font-big latestBlocks__margin-left'>{sliceData(validator)}</div>
					</div>
					<div className='latestBlocks__cell-content'>
						<div className='latestBlocks__font-small'>{`${totalTransactions} txns`}</div>
						{/* <div className='latestBlocks__font-big latestBlocks__margin-left' style={{ display: 'none' }}></div> */}
					</div>
				</div>
				<div className='latestBlocks__cell'>
					<div className='latestBlocks__cell-content latestBlocks__font-small'>Block Reward</div>
					<div className='latestBlocks__cell-content latestBlocks__font-big'>{`${calckBlocks(blockReward)} AMB`}</div>
				</div>
			</div>
		</>
	);
};

export default LatestBlocks;
