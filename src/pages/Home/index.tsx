import React, { useEffect, useState } from 'react';
import { Content } from '../../components/Content';
import API from '../../API/api';
import storage from '../../utils/storage';
import FindWide from '../../components/FindWide';
import MainInfo from '../../components/MainInfo';
import LatestBlocks from '../../components/LatestBlocks';
import ViewMoreBtn from '../../components/ViewMoreBtn';
import Chart from '../../components/Chart';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const Home = () => {
	const [data, setData] = useState<any>();
	const {loading, data : appData, error} = useTypedSelector((state: any) => state.app)

	const getHomePageData = async () => {
		const result = {
			header: [],
			latestBlocks: [],
			latestTransactions: [],
		};

		const latestBlocks = await API.getBlocks({ limit: 8 });
		const latestTransactions = await API.getTransactions({ limit: 8 });

		const mainInfoHeader =  [
			{ name: 'MARKET CAP', value: appData.tokenInfo.market_cap_usd },
			{ name: 'TOTAL SUPPLY', value: appData.netInfo.totalSupply },
			{ name: 'TOTAL TRANSACTIONS', value: appData.netInfo.transactions.total },
			{ name: 'BUNDLES', value: appData.netInfo.totalBundles },
			{ name: 'NODES', value: appData.netInfo.apollos.online + appData.netInfo.atlases.total + appData.netInfo.hermeses.total },
			{ name: 'HOLDERS', value: appData.netInfo.accounts.withBalance },
		];
		// @ts-ignore
		result.header = mainInfoHeader;
		result.latestBlocks = latestBlocks.data;
		result.latestTransactions = latestTransactions.data;

		return result;
	};

	useEffect(() => {
		getHomePageData().then((res : any) => setData(res));
	}, [appData]);

	return data ?  (
		<Content>
			<div className='home'>
				<Content.Header>
					<h1 className='home__heading'>Ambrosus Network Explorer</h1>
					<FindWide />
					<div className='mainInfo'>
						<div className='mainInfo__table'>
							{data.header.map((item:any) => (
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
							<LatestBlocks />
							<ViewMoreBtn nameBtn='View all blocks' />
						</div>

						<div className='home__content'>
							<div className='latestBlocks__heading'>Lastest Transactions</div>
							<LatestBlocks />
							<ViewMoreBtn nameBtn='View all transactions' />
						</div>
					</div>
				</Content.Body>
			</div>
		</Content>
	): null;
};
