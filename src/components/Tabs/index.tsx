import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AddressBlocksHeader from '../AddressBlocksHeader';
import AddressBlock from '../AddressBlocks';
import ViewMoreBtn from '../ViewMoreBtn';
import { formatEther } from 'ethers/lib/utils';
import moment from 'moment';
import ExportCsv from '../ExportCsv';

//create functional component Tabs without store  with the following tabs: 'All','Transfers','ERC-20 Tx','Block
// Rewards' following the pattern of the Tabs component in the UI. The Tabs component is used to display the
// different tabs in the UI. need to add the following props:"transfers","block_rewards" ," ERC-20_Tx"  props will
// come from API call to get the data for the tabs. The Tabs component will render the tabs based on the	props
// passed to it.

const transactionFilters = [
	{ title: 'All', value: '/' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];

const Tabs = ({ data, setTransactionType }: any) => {
	const { address, type } = useParams();

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

	return (
		<>
			<div className='tabs' tabIndex={-1}>
				<div className='tabs__filters'tabIndex={-1}>
					{transactionFilters && transactionFilters.map((filter) => (
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
					/>

					{data && data && data.transactions &&  data.transactions.map((transaction: any, index: number) => {
						return (
							<AddressBlock
								key={transaction.hash}
								txhash={`${transaction.hash.slice(0, 10)}...${transaction.hash.slice(transaction.hash.length - 10)}`}
								method={transaction.type}
								from={`${transaction.from.slice(0, 5)}...${transaction.from.slice(transaction.from.length - 5)}`}
								to={`${transaction.to.slice(0, 5)}...${transaction.to.slice(transaction.to.length - 5)}`}
								date={moment(transaction.timestamp * 1000).fromNow()}
								block={transaction.blockNumber}
								amount={`${Number(formatEther(transaction.value.wei)).toFixed(2)} ETH`}
								txfee={`${Number(formatEther(transaction.gasCost.wei)).toFixed(5)} AMB`}
								token={`${Number(formatEther(transaction.value.wei)).toFixed(2)} ETH`}
							/>
						);
					})}
				</section>
				<div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
					<ViewMoreBtn nameBtn='Load More' />
				</div>
			</div>
		</>
	);
};
export default Tabs;
