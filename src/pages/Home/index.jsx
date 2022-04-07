import React, { useEffect, useState } from 'react';
import { Content } from '../../components/Content';
import API from '../../API/api';
import storage from '../../utils/storage';
import FindWide from '../../components/FindWide';
import MainInfo from '../../components/MainInfo';
import LatestBlocks from '../../components/LatestBlocks';
import ViewMoreBtn from '../../components/ViewMoreBtn';
import Chart from '../../components/Chart';

export const Home = () => {
	const [data, setData] = useState();

	const getHomePageData = async () => {
		const result = {
			header: [],
			latestBlocks: [],
			latestTransactions: [],
		};
		const latestBlocks = await API.getBlocks({ limit: 8 });
		const latestTransactions = await API.getTransactions({ limit: 8 });
		const netInfo = storage.get('netInfo');
		const tokenInfo = storage.get('tokenInfo');

		const mainInfoHeader = [
			{ name: 'MARKET CAP', value: tokenInfo.market_cap_usd },
			{ name: 'TOTAL SUPPLY', value: netInfo.totalSupply },
			{ name: 'TOTAL TRANSACTIONS', value: netInfo.transactions.total },
			{ name: 'BUNDLES', value: netInfo.totalBundles },
			{ name: 'NODES', value: netInfo.apollos.online + netInfo.atlases.total + netInfo.hermeses.total },
			{ name: 'HOLDERS', value: netInfo.accounts.withBalance },
		];

		result.header = mainInfoHeader;
		result.latestBlocks = latestBlocks.data;
		result.latestTransactions = latestTransactions.data;

		return result;
	};

	useEffect(() => {
		getHomePageData().then((res) => setData(res));
	}, []);

	return (
		<Content>
			<div className='home'>
				<Content.Header>
					<h1 className='home__heading'>Ambrosus Network Explorer</h1>
					<FindWide />
					<div className='mainInfo'>
						<div className='mainInfo__table'>
							{data?.header.map((item) => (
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
							<div className='latestBlocks__btn'>
								<ViewMoreBtn nameBtn='View all blocks' />
							</div>
						</div>

						<div className='home__content'>
							<div className='latestBlocks__heading'>Lastest Transactions</div>
							<LatestBlocks />
							<div className='latestBlocks__btn'>
								<ViewMoreBtn nameBtn='View all blocks' />
							</div>
						</div>
					</div>
				</Content.Body>
			</div>
		</Content>
	);
};
