import React, { useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';
import API from '../../../API/api';
import OveralBalance from '../../../components/OveralBalance';
import ArrowDownSmall from '../../../assets/icons/ArrowDownSmall';

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];

export const AddressDetails = () => {
	const { address } = useParams();
	const [transactionType, setTransactionType] = useState('');

	const reciveAdress = '0xF977814e90dA44bFA03b6295A0616a897441aceC';
	const copyConten = () => console.log(reciveAdress);

	// @ts-ignore
	useEffect(() => {
		const getTransactionsData = async (add: string, params: { limit: any; type: any }) => {
			const { limit, type } = params;
			const transactionsData = await API.getAccountTx(add, { limit, type });

			const blockBookApi = await fetch(`https://blockbook.ambrosus.io/api/v2/address/${address}`).then((response) => response.json());

			console.log('blockBookApi', blockBookApi);
			console.table([
				['Transactions data', transactionsData.data],
				['Tokens', blockBookApi.tokens],
			]);

			return transactionsData;
		};
		if (address) {
			getTransactionsData(address.trim(), { limit: 50, type: transactionType });
		}
	}, [address, transactionType]);

	return (
		<Content>
			<section className='addressDetails'>
				<Content.Header>
					<h1 className='addressDetails__h1'>
						{address} <span className='addressDetails__h1-span'>{reciveAdress}</span>
						<button className='addressDetails__h1-btn' onClick={copyConten}>
							<ContentCopy />
						</button>
					</h1>
					<div className='addressDetails__section'>
						<OveralBalance />
						<div className='addressDetails__section-div'>Token</div>
					</div>
				</Content.Header>
				<Content.Body>
					<section>
						{transactionFilters.map(({ value, title }) => (
							<button key={value} onClick={() => setTransactionType(value.toLowerCase())}>
								{title}
							</button>
						))}
					</section>
					<section>
						<table className='addressDetails__table'>
							<thead>
								<tr>
									<td>txHash</td>
									<td>
										Method
										<button>
											<ArrowDownSmall />
										</button>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</thead>
						</table>
					</section>
				</Content.Body>
			</section>
		</Content>
	);
};
