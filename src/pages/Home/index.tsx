import React, { useEffect } from 'react';
import { Content } from '../../components/Content';
import API from '../../API/api';
import storage from '../../utils/storage';
import FindWide from '../../components/FindWide';
import MainInfo from '../../components/MainInfo';
import LastestsInfo from '../../components/LastestsInfo/LastestsInfo';

export const Home = () => {
	const viewBlocks = () => console.log('viewBlocks');
	const viewTransactions = () => console.log('viewTransactions');

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
							<table className='lastestsInfo'>
								<thead>
									<tr>
										<td className='home__h2'>Lastest Blocks</td>
									</tr>
								</thead>
								<tbody className='lastestsInfo__tbody'>
									<tr className='lastestsInfo__tr'>
										<LastestsInfo />
										<LastestsInfo />
										<LastestsInfo />
									</tr>
									<tr className='lastestsInfo__tr'>
										<LastestsInfo />
										<LastestsInfo />
										<LastestsInfo />
									</tr>
								</tbody>
							</table>
							<button className='home__btn' onClick={viewBlocks}>
								View all blocks
							</button>
						</div>
						<div className='home__content'>
							<table className='lastestsInfo'>
								<thead>
									<tr>
										<td className='home__h2'>Lastest Transactions</td>
									</tr>
								</thead>
								<tbody className='lastestsInfo__tbody'>
									<tr className='lastestsInfo__tr'>
										<LastestsInfo />
										<LastestsInfo />
										<LastestsInfo />
									</tr>
									<tr className='lastestsInfo__tr'>
										<LastestsInfo />
										<LastestsInfo />
										<LastestsInfo />
									</tr>
								</tbody>
							</table>
							<button className='home__btn' onClick={viewTransactions}>
								View all transactions
							</button>
						</div>
					</section>
				</Content.Body>
			</section>
		</Content>
	);
};
