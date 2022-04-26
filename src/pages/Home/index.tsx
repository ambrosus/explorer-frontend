import API from 'API/api'
import Chart from 'components/Chart'
import { Content } from 'components/Content'
import FindWide from 'components/FindWide'
import LatestTransactions from 'components/LastestTransactions'
import LatestBlocks from 'components/LatestBlocks'
import MainInfo from 'components/MainInfo'
import ViewMoreBtn from 'components/ViewMoreBtn'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React, { useEffect, useState } from 'react'

import { LatestTransactionsProps, ResultHomePageData } from './types'

export const Home: React.FC = () => {
	const [data, setData] = useState<ResultHomePageData>()
	const { data: appData } = useTypedSelector((state: any) => state.app)

	useEffect(() => {
		const getHomePageData: () => Promise<ResultHomePageData> = async () => {
			const result: ResultHomePageData = {
				latestBlocks: (await API.getBlocks({ limit: 8 })).data,
				latestTransactions: (await API.getTransactions({ limit: 3000 })).data
					.filter(
						(item: LatestTransactionsProps) => item.type !== 'BlockReward'
					)
					.slice(0, 8),
			}

			result.header = [
				{ name: 'MARKET CAP', value: appData.tokenInfo.market_cap_usd },
				{ name: 'TOTAL SUPPLY', value: appData.netInfo.totalSupply },
				{
					name: 'TOTAL TRANSACTIONS',
					value: appData.netInfo.transactions.total,
				},
				{ name: 'BUNDLES', value: appData.netInfo.totalBundles },
				{
					name: 'NODES',
					value:
						appData.netInfo.apollos.online +
						appData.netInfo.atlases.total +
						appData.netInfo.hermeses.total,
				},
				{ name: 'HOLDERS', value: appData.netInfo.accounts.withBalance },
			]
			return result
		}
		getHomePageData().then((result: ResultHomePageData) => setData(result))
	}, [appData, data])

	return (
		<Content isLoading={!!data}>
			{data && (
				<div className="home">
					<Content.Header>
						<h1 className="home__heading">Ambrosus Network Explorer</h1>
						<FindWide />
						<div className="mainInfo">
							<div className="mainInfo__table">
								{data?.header.map(
									(item: {
										name: React.Key | null | undefined
										value: number
									}) => (
										<MainInfo
											key={item.name}
											name={item.name}
											value={item.value}
										/>
									)
								)}
							</div>
							<div className="mainInfo__chart">
								<Chart />
							</div>
						</div>
					</Content.Header>
					<Content.Body>
						<div className="home__table">
							<div className="home__content">
								<div className="latestBlocks__heading">Lastest Blocks</div>
								{data?.latestBlocks.map((item, index) => (
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
								))}
								<ViewMoreBtn nameBtn="View all blocks" />
							</div>

							<div className="home__content">
								<div className="latestBlocks__heading">
									Lastest Transactions
								</div>
								{data?.latestTransactions.map((item) => (
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
								))}

								<ViewMoreBtn nameBtn="View all transactions" />
							</div>
						</div>
					</Content.Body>
				</div>
			)}
		</Content>
	)
}
