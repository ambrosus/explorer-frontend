import LatestTransactions from 'components/LastestTransactions'
import LatestBlocks from 'components/LatestBlocks'
import ViewMoreBtn from 'components/ViewMoreBtn'
import React from 'react'

const BlocksContent = ({ name, data }: any) => {
	return (
		<div className="home__table">
			<div className="home__content">
				<div className="latestBlocks__heading">Lastest Blocks</div>
				<div className="latestBlocks__body">
					{data?.latestBlocks.map(
						(
							item: {
								number: number | undefined
								timestamp: number | undefined
								miner: string | undefined
								totalTransactions: number | undefined
								blockRewards: number | undefined
							},
							index: any
						) => (
							<LatestBlocks
								key={item.number}
								number={item.number}
								index={index}
								timestamp={item.timestamp}
								validator={item?.miner}
								totalTransactions={item.totalTransactions}
								blockReward={item?.blockRewards}
								name="name"
							/>
						)
					)}
					<ViewMoreBtn nameBtn="View all blocks" />
				</div>
			</div>

			<div className="home__content">
				<div className="latestBlocks__heading">Lastest Transactions</div>
				<div className="latestBlocks__body">
					{data?.latestTransactions.map(
						(item: {
							_id: React.Key | null | undefined
							status: string
							hash: any
							timestamp: number
							from: string
							to: string
							value: { ether: number | undefined }
							type: any
						}) => (
							<LatestTransactions
								key={item._id}
								status={item.status}
								hash={item.hash}
								timestamp={item.timestamp}
								from={item.from}
								to={item.to}
								amount={item?.value?.ether}
								type={item.type}
							/>
						)
					)}
					<ViewMoreBtn nameBtn="View all transactions" />
				</div>
			</div>
		</div>
	)
}

export default BlocksContent
