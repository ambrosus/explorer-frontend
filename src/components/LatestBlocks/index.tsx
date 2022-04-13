import React, { useEffect, useState } from 'react';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';
import { sliceData, calcTime } from '../../utils/helpers';

type LatestBlocksProps = {
	name: string;
	number: any;
	numberArr: any;
	timestamp: number;
	validator: string;
	totalTransactions: number;
	blockReward: number;
};

const LatestBlocks: React.FC<LatestBlocksProps> = ({ number, numberArr, timestamp, validator, totalTransactions, blockReward }) => {
	const [maxNumber, setMaxNumber] = useState<any>();
	const [isOnline, setIsOnline] = useState<any>();
	const isMax = (number: Array<number>) => {
		if (number) {
			return Math.max(...number);
		}
	};
	const success = maxNumber - 1;

	useEffect(() => {
		const res = isMax(numberArr);
		setMaxNumber(res);
	}, []);

	useEffect(() => {
		const online = number > success ? 'green' : 'orange';
		console.log(online);

		setIsOnline(online);
	}, []);
	// <GreenCircle /> : <GreenCircle />
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
