import React, { useEffect } from 'react';
import { Content } from '../../../components/Content';
import API from '../../../API/api';
import storage from '../../../utils/storage';

export const Home = () => {
	// @ts-ignore
	useEffect(async () => {
		// fetch(`https://blockbook.ambrosus.io/api/v2/address/0xB500558a3886ecf07B4B4B31B54c4bd1ef378D34`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		accept: 'application/json',
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((json) => console.log(json));

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
