import { useTypedSelector } from 'hooks/useTypedSelector'
import moment from 'moment'
import {
	TabsProps,
	TokenType,
	TransactionProps,
} from 'pages/Addresses/AddressDetails/types'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { setActiveLink } from 'utils/helpers'

import AddressBlock from '../AddressBlocks'
import AddressBlocksHeader from '../AddressBlocksHeader'
import ExportCsv from '../ExportCsv'
import Loader from '../Loader'

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
]
const ERC20Filters = [
	{ title: 'All', value: 'All' },
	{ title: 'Transfers', value: 'transfers' },
]

const methodFilters = [
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Contracts', value: 'contracts' },
	{ title: 'Fees', value: 'fees' },
	{ title: 'Validator Proxy', value: 'validator_proxy' },
	{ title: 'Bundle Uploads', value: 'bundle_uploads' },
	{ title: 'Payouts', value: 'payouts' },
]

const Tabs: FC<TabsProps> = ({
	data,
	lastCardRef,
	onClick,
	setTransactionType,
}) => {
	const { address, type, filtered } = useParams()
	const { loading, data: addressData } = useTypedSelector(
		(state: any) => state.position
	)

	const headerBlock: any = type === 'ERC-20_Tx' ? null : 'Block'
	const headerTxfee: any = type === 'ERC-20_Tx' ? null : 'txFee'
	const headerToken: any = type === 'ERC-20_Tx' ? 'token' : null

	function style(item: string | undefined) {
		let type: { style: object } = {
			style,
		}
		switch (item) {
			case 'ERC-20_Tx':
				return (type.style = { gridTemplateColumns: 'repeat(7, auto)' })

			default:
				return (type.style = { gridTemplateColumns: 'repeat(8, auto)' })
		}
	}

	return (
		<>
			<div className="tabs" tabIndex={-1}>
				<div className="tabs__filters" tabIndex={-1}>
					{!filtered
						? transactionFilters &&
						  transactionFilters.length &&
						  transactionFilters.map((filter) => (
								<NavLink
									key={filter.title}
									to={`/addresses/${address}/${
										filter.value ? filter.value : ''
									}`}
									className={setActiveLink}
									onClick={(e) => {
										setTransactionType(filter.value)
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
										setTransactionType(filter.value)
									}}
								>
									{filter.title}
								</NavLink>
						  ))}
				</div>
				<ExportCsv />
			</div>

			<div>
				<section className="addressDetails__table" style={style(type)}>
					<AddressBlocksHeader
						txhash="txHash"
						method="Method"
						from="From"
						to="To"
						date="Date"
						block={headerBlock}
						amount="Amount"
						txfee={headerTxfee}
						token={headerToken}
						methodFilters={methodFilters}
					/>
					{loading && (
						<div
							style={{
								position: 'absolute',
								bottom: '-50px',
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Loader />
						</div>
					)}
					{addressData?.latestTransactions?.length && type === 'ERC-20_Tx'
						? addressData.latestTransactions.map(
								(transaction: any, index: number) => (
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
						  )
						: null}
					{data?.length && filtered && type === 'ERC-20_Tx'
						? data.map((transaction: any, index: number) =>
								data.length - 1 === index ? (
									<AddressBlock
										lastCardRef={lastCardRef}
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
								) : (
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
						  )
						: null}

					{data?.length && type !== 'ERC-20_Tx'
						? data.map((transaction: any, index: number) =>
								data.length - 1 === index ? (
									<AddressBlock
										lastCardRef={lastCardRef}
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
								) : (
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
								)
						  )
						: null}
				</section>
			</div>
		</>
	)
}

export default Tabs
