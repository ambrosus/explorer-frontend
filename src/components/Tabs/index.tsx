import SideMenu from 'assets/icons/SideMenu'
import { useTypedSelector } from 'hooks/useTypedSelector'
import useWindowSize from 'hooks/useWindowSize'
import moment from 'moment'
import { TabsProps } from 'pages/Addresses/AddressDetails/address-details.interface'
import React, { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { setActiveLink, setupStyle, toUniqueValueByBlock } from "utils/helpers";
import { sidePages } from 'utils/sidePages'

import AddressBlock from '../AddressBlocks'
import AddressBlocksHeader from '../AddressBlocksHeader'
import ExportCsv from '../ExportCsv'
import Loader from '../Loader'

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
	console.log('data',data);
	const headerBlock: any = type === 'ERC-20_Tx' ? null : 'Block'
	const headerTxfee: any = type === 'ERC-20_Tx' ? null : 'txFee'
	const headerToken: any = type === 'ERC-20_Tx' ? 'token' : null

	const { width } = useWindowSize()
	const { transactionFilters, ERC20Filters, methodFilters } = sidePages

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
				<div className="tabs__exportModal">
					{width > 760 ? (
						<ExportCsv />
					) : (
						<button className="tabs__sideMenu">
							<SideMenu />
						</button>
					)}
				</div>
			</div>

			<div>
				<section className="addressDetails__table" style={setupStyle(type)}>
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
					{addressData?.latestTransactions?.length && type === 'ERC-20_Tx' && !filtered
						? toUniqueValueByBlock(addressData.latestTransactions).map(
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
						? toUniqueValueByBlock(data).map((transaction: any, index: number) =>
								data.length - 1 === index && data.length > 20 ? (
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

					{data?.length && type !== 'ERC-20_Tx' && !filtered
						? toUniqueValueByBlock(data).map((transaction: any, index: number) =>
								data.length - 1 === index && data.length > 20 ? (
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
