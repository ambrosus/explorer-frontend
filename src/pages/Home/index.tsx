import React, { useEffect } from 'react';
import { Content } from '../../components/Content';
import API from '../../API/api';
import storage from '../../utils/storage';
import FindWide from '../../components/FindWide';
import MainInfo from '../../components/MainInfo';

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
					<table className='tableInfo'>
						<tbody className='tableInfo__tbody'>
							<tr className='tableInfo__tr'>
								<MainInfo />
								<MainInfo />
								<MainInfo />
							</tr>
							<tr className='tableInfo__tr'>
								<MainInfo />
								<MainInfo />
								<MainInfo />
							</tr>
						</tbody>
					</table>
				</Content.Header>
				<Content.Body>
					<div className='container'>Lastest Blocks</div>
				</Content.Body>
			</section>
		</Content>
	);
};
