import React, { useEffect } from 'react';
import { Content } from '../../components/Content';
import API from '../../API/api';
import storage from '../../utils/storage';

export const Home = () => {

	const getHomePageData = async () => {
		const latestBlocks = await API.getBlocks({ limit: 8 })
		const latestTransactions = await API.getTransactions({ limit: 8 })
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
			],
		);
	}

	useEffect(()=>{
		getHomePageData()
	}, []);

	return (
		<Content>
			<Content.Header>
				<h1>Ambrosus Network Explorer</h1>
			</Content.Header>
			<Content.Body>
				<div>Lastest Blocks</div>
			</Content.Body>
		</Content>
	);
};
