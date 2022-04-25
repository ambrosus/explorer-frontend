import React, { FC, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import AddressBlocksHeader from '../AddressBlocksHeader';
import AddressBlock from '../AddressBlocks';
import ExportCsv from '../ExportCsv';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { clearFilters } from '../../state/actionsCreators';
import Loader from '../Loader';
import { setActiveLink } from '../../utils/helpers';
import moment from 'moment';
import { TabsProps, TokenType, TransactionProps } from '../../pages/Addresses/AddressDetails/types';

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];
const ERC20Filters = [
	{ title: 'All', value: 'All' },
	{ title: 'Transfers', value: 'transfers' },
];

const activeBtn = {
	color: '#05060f',
	borderBottom: '4px solid #05060f',
	borderCollapse: 'collapse',
};

const methodFilters = [
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Contracts', value: 'contracts' },
	{ title: 'Fees', value: 'fees' },
	{ title: 'Validator Proxy', value: 'validator_proxy' },
	{ title: 'Bundle Uploads', value: 'bundle_uploads' },
	{ title: 'Payouts', value: 'payouts' },
];


const Tabs : FC<TabsProps> = ({ selectedToken, data, onClick, setTransactionType }) => {
	const { address, type, filtered, tokenToSorted } = useParams();
	const [latestTrans, setLatestTrans] = useState([]);
	const { data: addressData } = useTypedSelector((state: any) => state.position);
	const { filters } = useTypedSelector((state: any) => state.tokenFilters, shallowEqual);

	const sortTrans = () => {
		const includesTokens = addressData.tokens.filter((token : TokenType) => token.contract);
		const latestTransactions = includesTokens.map((token : TokenType) => {
			return data.filter((transaction: { token: string; }) => {
				return transaction.token === token.contract;
			})[0];
		});
		setLatestTrans(latestTransactions);
	};

	useEffect(() => {
		if (addressData && !filtered && addressData.tokens && data && data.length && type === 'ERC-20_Tx' ) {
			sortTrans();
		} else if (tokenToSorted) {
			const allSelected =
				data &&
				data.filter((transaction: TransactionProps) => {
					return transaction?.token === selectedToken?.name;
				});
			const allTransfer = allSelected.filter((transaction: TransactionProps) => {
				return transaction?.method === 'Transfer';
			});
			const tabsTokensSortedData = tokenToSorted === 'All' ? allSelected : allTransfer;
			setLatestTrans(tabsTokensSortedData);
		}
	}, [data, filtered, type, filters, tokenToSorted]);

	const headerBlock:any = type === 'ERC-20_Tx' ? null : 'Block';
	const headerTxfee:any = type === 'ERC-20_Tx' ? null : 'txFee';
	const headerToken:any = type === 'ERC-20_Tx' ? 'token' : null;

	function style(item: string | undefined) {
		let type: {style:object} = {
			style,
		};
		switch (item) {
			case 'ERC-20_Tx':
				return (type.style = { gridTemplateColumns: 'repeat(7, auto)' });

			default:
				return (type.style = { gridTemplateColumns: 'repeat(8, auto)' });
		}
	}

	return (
		<>
			<div className='tabs' tabIndex={-1}>
				<div className='tabs__filters' tabIndex={-1}>
					{!filtered
						? transactionFilters &&
						  transactionFilters.length &&
						  transactionFilters.map((filter) => (
								<NavLink
									key={filter.title}
									to={`/addresses/${address}/${filter.value ? filter.value : ''}`}
									className={setActiveLink}
									onClick={(e) => {
										setTransactionType(filter.value);
									}}
								>
									{filter.title}
								</NavLink>
						  ))
						: ERC20Filters &&
						  ERC20Filters.length &&
						  ERC20Filters.map((filter) => (
								<NavLink
									key={filter.title}
									to={`/addresses/${address}/ERC-20_Tx/${filtered}/${filter.value}`}
									className={setActiveLink}
									onClick={(e) => {
										setTransactionType(filter.value);
									}}
								>
									{filter.title}
								</NavLink>
						  ))}
				</div>
				<ExportCsv />
			</div>

			<div style={{ minHeight: 200, marginTop: !data.length ? 200 : 0 }}>
				{data && data.length ? (
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
						{latestTrans.length
							? latestTrans.map((transaction: any, index: number) => {
									return (
										transaction && (
											<AddressBlock
												isLatest={true}
												onClick={onClick}
												key={transaction.txHash}
												txhash={transaction.txHash}
												method={transaction.method}
												from={transaction.from}
												to={transaction.to}
												date={moment(transaction.date).fromNow()}
												block={transaction.block}
												amount={transaction.amount}
												txfee={transaction.txFee}
												token={`${transaction?.token ? transaction?.token : null}`}
											/>
										)
									);
							  })
							: data.length &&
							  data.map((transaction: any, index: number) => {
									return (
										<AddressBlock
											onClick={onClick}
											key={transaction.txHash}
											txhash={transaction.txHash}
											method={transaction.method}
											from={transaction.from}
											to={transaction.to}
											date={moment(transaction.date).fromNow()}
											block={transaction.block}
											amount={transaction.amount}
											txfee={transaction.txFee}
											token={`${transaction?.token ? transaction?.token : null}`}
										/>
									);
							  })}
					</section>
				) : (
					<Loader />
				)}
			</div>
		</>
	);
};

export default Tabs;
