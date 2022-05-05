import SideMenu from 'assets/icons/SideMenu'
import { useTypedSelector } from 'hooks/useTypedSelector'
import useWindowSize from 'hooks/useWindowSize'
import moment from 'moment'
import { TabsProps } from 'pages/Addresses/AddressDetails/address-details.interface'
import React, { FC, useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom'
import { setupStyle, toUniqueValueByBlock } from 'utils/helpers'
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
	const headerBlock: any = type === 'ERC-20_Tx' ? null : 'Block'
	const headerTxfee: any = type === 'ERC-20_Tx' ? null : 'txFee'
	const headerToken: any = type === 'ERC-20_Tx' ? 'token' : null
	const [renderData, setRenderData] = React.useState<any>(null)

	useEffect(() => {
		if (addressData) {
			if (data?.length && filtered && type === 'ERC-20_Tx') {
				setRenderData(toUniqueValueByBlock(data))
			}
			if (data?.length && type !== 'ERC-20_Tx' && !filtered) {
				setRenderData(toUniqueValueByBlock(data))
			}
			if (
				addressData &&
				addressData?.latestTransactions?.length &&
				type === 'ERC-20_Tx' &&
				!filtered
			) {
				setRenderData(toUniqueValueByBlock(addressData.latestTransactions))
			}
		}
	}, [addressData, data, filtered, type, loading])

	const { width } = useWindowSize()

	const { transactionFilters, ERC20Filters, methodFilters } = sidePages
	const [isShow, setIsShow] = useState(false)
	const setActiveLink = ({ isActive }: any) =>
		isActive ? 'tabs__link tabs__link-active' : 'tabs__link'

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
						<div className="tabs__sideMenu">
							<button
								className="tabs__sideMenu-icon"
								onClick={() => setIsShow(!isShow)}
							>
								<SideMenu />
							</button>
							{isShow && (
								<div className="tabs__exportModal-mobile">
									<ExportCsv />
								</div>
							)}
						</div>
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

					{renderData && renderData?.length ? (
						renderData.map((transaction: any, index: number) =>
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
					) : (
						<Loader />
					)}
				</section>
			</div>
		</>
	)
}

export default Tabs
