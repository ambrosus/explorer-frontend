import React, { useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import API from '../../../API/api';

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
];

export const AddressDetails = () => {
	const [transactionType, setTransactionType] = useState('');
	const { address } = useParams();



	// @ts-ignore
	useEffect( () => {
		const getTransactionsData = async (add: string, params: { limit: any; type: any; }) => {
			const { limit, type } = params;
			const transactionsData = await API.getAccountTx(add, { limit, type });

			const blockBookApi = await fetch(`https://blockbook.ambrosus.io/api/v2/address/${address}`)
				.then((response) => response.json());

			console.log('blockBookApi', blockBookApi);
			console.table([['Transactions data', transactionsData.data],['Tokens',blockBookApi.tokens]]);

			return transactionsData;
		};
		if (address) {
			getTransactionsData(address.trim(), { limit: 50, type: transactionType });
		}

	}, [address, transactionType]);

	return (
		<Content>
			<Content.Header>
				<h1>Address Details {address}</h1>
				<div>{transactionFilters.map(({ value, title }) =>
					<button
						key={value}
						onClick={() => setTransactionType(value)}
					>{title}</button>)}</div>
			</Content.Header>
			<Content.Body>
				<div>Addresses CONTENT</div>
			</Content.Body>
		</Content>
	);
};
