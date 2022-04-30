import GreenCircle from 'assets/icons/StatusAction/GreenCircle'
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle'
import { LatestBlocksProps } from 'pages/Home/home.interfaces'
import React from 'react'
import { calcTime, sliceData5 } from 'utils/helpers'

const LatestBlocks: React.FC<LatestBlocksProps> = ({
	number,
	index,
	timestamp,
	validator,
	totalTransactions,
	blockReward,
}) => {
	const online = index > 1 ? <GreenCircle /> : <OrangeCircle />

	const calckBlocks = (blockReward: any) =>
		blockReward
			.reduce(
				(acc: any, item: { reward: { ether: any } }) => acc + item.reward.ether,
				0
			)
			.toFixed(5)

	return (
		<>
			<div className="latestBlocks__cells">
				<div className="latestBlocks__cell">
					<div className="latestBlocks__cell-content latestBlocks__font-big">
						<span>{online}</span>
						{number}
					</div>

					<div className="latestBlocks__p latestBlocks__font-small">
						{calcTime(timestamp as number)}
					</div>
				</div>

				<div className="latestBlocks__cell">
					<div className="latestBlocks__cell-content">
						<div className="latestBlocks__font-small">Validator</div>
						<div className="latestBlocks__font-big latestBlocks__margin-left">
							{sliceData5(validator as string)}
						</div>
					</div>
					<div className="latestBlocks__cell-content">
						<div className="latestBlocks__font-small"></div>
						<div
							className="latestBlocks__font-small"
							style={{ marginLeft: '1px' }}
						>{`${totalTransactions} txns`}</div>
					</div>
				</div>
				<div className="latestBlocks__cell">
					<div className="latestBlocks__cell-content latestBlocks__font-small">
						Block Reward
					</div>
					<div className="latestBlocks__cell-content latestBlocks__font-big">{`${calckBlocks(
						blockReward
					)} AMB`}</div>
				</div>
			</div>
		</>
	)
}

export default LatestBlocks
