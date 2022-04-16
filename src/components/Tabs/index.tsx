import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddressBlocksHeader from '../AddressBlocksHeader';
import AddressBlock from '../AddressBlocks';
import ViewMoreBtn from '../ViewMoreBtn';
import ExportCsv from '../ExportCsv';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { clearFilters } from '../../state/actionsCreators';
import Loader from '../Loader';

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];
const ERC20Filters = [
	{ title: 'All', value: 'All' },
	{ title: 'Transfers', value: 'transfers' },
];

const Tabs = ({ selectedToken, data,transactionType, onClick, setTransactionType }: any) => {
	const { address, type, filtered, tokenToSorted } = useParams();
	const [latestTrans, setLatestTrans] = useState([]);
	const { clearFilters } = useActions();
	const {
		data: addressData,
	} = useTypedSelector((state: any) => state.position);
	const { filters } = useTypedSelector((state: any) => state.tokenFilters, shallowEqual);

	const sortTrans = () => {
		const includesTokens = addressData.tokens.filter((token: any) => token.contract);
		const latestTransactions = includesTokens.map((token: any) => {
			return data.filter((transaction: any) => {
				return transaction.token === token.contract;
			})[0];
		});
		setLatestTrans(latestTransactions);
	};

	useEffect(() => {
		if (addressData && !filtered && addressData.tokens && data && data.length && type === 'ERC-20_Tx' && filters.length === 0) {
			sortTrans();
		}else if (tokenToSorted) {
			const allSelected = data && data.filter((transaction: any) => {
				return transaction?.token === selectedToken.name;
			});
			const allTransfer = allSelected.filter((transaction: any) => {
				return transaction?.method === 'Transfer';
			});
			const tabsTokensSortedData = tokenToSorted === 'All'
				? allSelected
				: allTransfer;
			setLatestTrans(tabsTokensSortedData);
		}
	}, [data,filtered,type,filters, tokenToSorted]);


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
					{!filtered ?
						transactionFilters.map((filter) => (
							<Link
								key={filter.title}
								to={`/addresses/${address}/${filter.value ? filter.value : ''}`}
								tabIndex={-1}
								className='tabs__link'
								onClick={() => setTransactionType(filter.value)}
							>
								{filter.title}
							</Link>
						)) :
						ERC20Filters.map((filter) => (
							<Link
								key={filter.title}
								to={`/addresses/${address}/ERC-20_Tx/${filtered}/${filter.value}`}
								className='tabs__link'
								onClick={() => {
									setTransactionType(filter.value);
								}}
							>
								{filter.title}
							</Link>
						))
					}
				</div>
				<ExportCsv />
			</div>

			<div style={{ minHeight: 200, marginTop: !data.length ? 200 : 0 }}>
				{data.length ? <section className='addressDetails__table' style={style(type)}>
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
										onClick={onClick}
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
				</section> : <Loader />}
				{/*<div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>*/}
				{/*	<ViewMoreBtn nameBtn='Load More' />*/}
				{/*</div>*/}
			</div>
		</>
	);
};
export default Tabs;
