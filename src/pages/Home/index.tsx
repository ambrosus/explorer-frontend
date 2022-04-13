import React, { useCallback, useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Content } from '../../components/Content';
import API from '../../API/api';
import FindWide from '../../components/FindWide';
import MainInfo from '../../components/MainInfo';
import LatestBlocks from '../../components/LatestBlocks';
import ViewMoreBtn from '../../components/ViewMoreBtn';
import Chart from '../../components/Chart';
import LatestTransactions from '../../components/LastestTransactions';

export const Home: React.FC = () => {
	const [data, setData] = useState<any>();
	const { data: appData } = useTypedSelector((state: any) => state.app);

	const getHomePageData = async () => {
		const result: { header?: Array<{ name: string; value: any }>; latestBlocks: Array<any>; latestTransactions: Array<any> } = {
			latestBlocks: (await API.getBlocks({ limit: 8 })).data,
			latestTransactions: (await API.getTransactions({ limit: 8 })).data,
		};

		result.header = [
			{ name: 'MARKET CAP', value: appData.tokenInfo.market_cap_usd },
			{ name: 'TOTAL SUPPLY', value: appData.netInfo.totalSupply },
			{ name: 'TOTAL TRANSACTIONS', value: appData.netInfo.transactions.total },
			{ name: 'BUNDLES', value: appData.netInfo.totalBundles },
			{
				name: 'NODES',
				value: appData.netInfo.apollos.online + appData.netInfo.atlases.total + appData.netInfo.hermeses.total,
			},
			{ name: 'HOLDERS', value: appData.netInfo.accounts.withBalance },
		];
		return result;
	};

	useEffect(() => {
		getHomePageData().then((res: any) => setData(res));
	}, [appData, getHomePageData]);

	const numberArr = data ? data.latestBlocks.map((item: any) => item.number) : null;

	return (
		<Content isLoading={!!data}>
			{data && (
				<div className='home'>
					<Content.Header>
						<h1 className='home__heading'>Ambrosus Network Explorer</h1>
						<FindWide />
						<div className='mainInfo'>
							<div className='mainInfo__table'>
								{data?.header.map((item: { name: React.Key | null | undefined; value: any }) => (
									<MainInfo key={item.name} name={item.name} value={item.value} />
								))}
							</div>
							<div className='mainInfo__chart'>
								<Chart />
							</div>
						</div>
					</Content.Header>
					<Content.Body>
						<div className='home__table'>
							<div className='home__content'>
								<div className='latestBlocks__heading'>Lastest Blocks</div>
								{data?.latestBlocks.map(
									(item: {
										number: React.Key | null | undefined;
										timestamp: number;
										miner: string;
										totalTransactions: number;
										blockRewards: number;
									}) => (
										<LatestBlocks
											key={item.number}
											number={item.number}
											numberArr={numberArr}
											timestamp={item.timestamp}
											validator={item.miner}
											totalTransactions={item.totalTransactions}
											blockReward={item.blockRewards}
											name='name'
										/>
									)
								)}
								<ViewMoreBtn nameBtn='View all blocks' />
							</div>

							<div className='home__content'>
								<div className='latestBlocks__heading'>Lastest Transactions</div>
								{data?.latestTransactions.map(
									(item: {
										_id: React.Key | null | undefined;
										status: any;
										hash: any;
										timestamp: any;
										from: any;
										to: any;
										value: { ether: any };
									}) => (
										<LatestTransactions
											key={item._id}
											status={item.status}
											hash={item.hash}
											timestamp={item.timestamp}
											from={item.from}
											to={item.to}
											amount={item.value.ether}
										/>
									)
								)}

								<ViewMoreBtn nameBtn='View all transactions' />
							</div>
						</div>
					</Content.Body>
				</div>
			)}
		</Content>
	);
};
