import React, { useEffect } from 'react';
import { Content } from '../../components/Content';
import API from '../../API/api';
import storage from '../../utils/storage';
import FindWide from '../../components/FindWide';
import MainInfo from '../../components/MainInfo';
import LatestBlocks from '../../components/LatestBlocks';
import LastestTransactions from '../../components/LastestTransactions';
import ViewMoreBtn from '../../components/ViewMoreBtn';
import MarketCap from '../../assets/icons/MarketCap';
import Chart from '../../components/Chart';

export const Home = () => {
	const getHomePageData = async () => {
		const latestBlocks = await API.getBlocks({ limit: 8 });
		const latestTransactions = await API.getTransactions({ limit: 8 });
		const netInfo = storage.get('netInfo');
		const tokenInfo = storage.get('tokenInfo');
		console.table([
			['MARKET CAP', tokenInfo.market_cap_usd],
			['BUNDLES', netInfo.totalBundles],
			['NODES', netInfo.apollos.online + netInfo.atlases.total + netInfo.hermeses.total],
			['TOTAL SUPPLY', netInfo.totalSupply],
			['TOTAL TRANSACTIONS', netInfo.transactions.total],
			['HOLDERS', netInfo.accounts.withBalance],
			['Latest blocks', latestBlocks.data],
			['Latest transactions', latestTransactions.data],
		]);
	};

	useEffect(() => {
		getHomePageData();
	}, []);

	return (
		<Content>
			<section className='home'>
				<Content.Header>
					<h1 className='home__h1'>Ambrosus Network Explorer</h1>
					<FindWide />
					<table className='mainInfo'>
						<tbody className='mainInfo__tbody'>
						<tr className='mainInfo__tr'>
							<MainInfo />
							<MainInfo />
							<MainInfo />
							<td rowSpan={2} style={{
								height:200,
							}}>
								<Chart />
							</td>
						</tr>
						<tr className='mainInfo__tr'>
							<MainInfo />
							<MainInfo />
							<MainInfo />
						</tr>
						</tbody>
					</table>
				</Content.Header>
				<Content.Body>
					<section className='home__tables'>
						<div className='home__content'>
							<table className='latestBlocks'>
								<thead>
								<tr>
									<td className='home__h2'>Lastest Blocks</td>
								</tr>
								</thead>
								<LatestBlocks />
								<LatestBlocks />
								<LatestBlocks />
							</table>
							<ViewMoreBtn nameBtn='View all blocks' />
						</div>
						<div className='home__content'>
							<table className='lastestTransactions'>
								<thead>
								<tr>
									<td className='home__h2'>Lastest Transactions</td>
								</tr>
								</thead>
								<LastestTransactions />
								<LastestTransactions />
								<LastestTransactions />
							</table>
							<ViewMoreBtn nameBtn='View all transactions' />
						</div>
					</section>
				</Content.Body>
			</section>
		</Content>
	);
};
