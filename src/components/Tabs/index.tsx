import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddressBlocksHeader from '../AddressBlocksHeader';
import AddressBlock from '../AddressBlocks';
import ViewMoreBtn from '../ViewMoreBtn';
import { formatEther } from 'ethers/lib/utils';
import moment from 'moment';
import ExportCsv from '../ExportCsv';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';

const transactionFilters = [
	{ title: 'All', value: '/' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];

const Tabs = ({selectedToken, data, setTransactionType }: any) => {
	const { address, type } = useParams();
	const [latestTrans, setLatestTrans] = useState([]);
	const {
		data: addressData,
	} = useTypedSelector((state: any) => state.position, shallowEqual);
	const { filters } = useTypedSelector((state: any) => state.tokenFilters, shallowEqual);
	console.log('filters', filters);
	const sortTrans = () => {
			const includesTokens = addressData.tokens.filter((token: any) => token.contract);
			console.log('includesTokens', includesTokens);
			const latestTransactions = includesTokens.map((token: any) => {
					return data.filter((transaction: any) => {
						return transaction.token === token.contract;
					})[0];
			});
			setLatestTrans(latestTransactions)

	};

	useEffect(() => {
		if (data && data.length && type === 'ERC-20_Tx' && filters.length === 0) {
			sortTrans();
		}else {
			setLatestTrans([]);
		}
	}, [data]);

	const headerBlock: any = type === 'ERC-20_Tx' ? null : 'Block';
	const headerTxfee: any = type === 'ERC-20_Tx' ? null : 'txFee';
	const headerToken: any = type === 'ERC-20_Tx' ? 'token' : null;

	function style(item: any) {
		let type: any = {
			style,
		};
		switch (item) {
			case '/':
				return (type.style = { gridTemplateColumns: 'repeat(8, auto)' });

			case 'ERC-20_Tx':
				return (type.style = { gridTemplateColumns: 'repeat(7, auto)' });

			default:
				return (type.style = { gridTemplateColumns: 'repeat(8, auto)' });
		}
	}

	const methodFilters = [
		{ title: 'Transfers', value: 'transfers' },
		{ title: 'Contracts', value: 'contracts' },
		{ title: 'Fees', value: 'fees' },
		{ title: 'Validator Proxy', value: 'validator_proxy' },
		{ title: 'Bundle Uploads', value: 'bundle_uploads' },
		{ title: 'Payouts', value: 'payouts' },
	];
	return (
		<>
			<div className='tabs' tabIndex={-1}>
				<div className='tabs__filters' tabIndex={-1}>
					{transactionFilters &&
					transactionFilters.map((filter) => (
						<Link
							key={filter.title}
							to={`/addresses/${address}/${filter.value}`}
							tabIndex={-1}
							className='tabs__link'
							onClick={() => setTransactionType(filter.value)}
						>
							{filter.title}
						</Link>
					))}
				</div>
				<ExportCsv />
			</div>

			<div>
				<section className='addressDetails__table' style={style(type)}>
					<AddressBlocksHeader
						txhash='txHash'
						method='Method'
						from='From'
						to='To'
						date='Date'
						block={headerBlock}
						amount='Amount'
						txfee={headerTxfee}
						token={headerToken}
						methodFilters={methodFilters}
					/>
					{
						latestTrans.length ?
							latestTrans.map((transaction: any, index: number) => {
								return transaction && (
									<AddressBlock
										isLatest={true}
										key={transaction.txHash}
										txhash={`${transaction.txHash.slice(0, 10)}...${transaction.txHash.slice(transaction.txHash.length - 10)}`}
										method={transaction.method}
										from={transaction.from}
										to={transaction.to}
										date={transaction.date}
										block={transaction.block}
										amount={`${transaction.amount} AMB`}
										txfee={`${transaction.txFee}AMB`}
										token={`${transaction?.token ? transaction?.token : null}`}
									/>
								);
							}) :
							data &&
							data.length &&
							data.map((transaction: any, index: number) => {
								return (
									<AddressBlock
										key={transaction.txHash}
										txhash={`${transaction.txHash.slice(0, 10)}...${transaction.txHash.slice(transaction.txHash.length - 10)}`}
										method={transaction.method}
										from={transaction.from}
										to={transaction.to}
										date={transaction.date}
										block={transaction.block}
										amount={`${transaction.amount} AMB`}
										txfee={`${transaction.txFee}AMB`}
										token={`${transaction?.token ? transaction?.token : null}`}
									/>
								);
							})
					}

				</section>
				<div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
					<ViewMoreBtn nameBtn='Load More' />
				</div>
			</div>
		</>
	);
};
export default Tabs;
