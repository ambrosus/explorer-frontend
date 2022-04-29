import Amb from 'assets/icons/Cryptos/Amb'
import GreenCircle from 'assets/icons/StatusAction/GreenCircle'
import IncomeTrasaction from 'assets/icons/StatusAction/IncomeTrasaction'
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle'
import OutgoingTransaction from 'assets/icons/StatusAction/OutgoingTransaction'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { AddressBlockProps } from 'pages/Addresses/AddressDetails/types'
import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { sliceData5, sliceData10 } from 'utils/helpers'

import { TParams } from '../../types'

const AddressBlock: React.FC<AddressBlockProps> = ({
	onClick,
	lastCardRef,
	isLatest,
	txhash,
	method,
	from,
	to,
	date,
	block,
	amount,
	txfee,
	token,
}) => {
	const online: any = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />
	const { addFilter } = useActions()
	const { address, type }: TParams = useParams()

	const navigate = useNavigate()
	const { data: addressData } = useTypedSelector((state: any) => state.position)

	const isTxHash: JSX.Element | null =
		txhash === null ? null : (
			<div
				ref={lastCardRef}
				className="addressDetails__tbody-td universall__light2"
				style={{ fontWeight: '600' }}
			>
				{sliceData10(txhash as string)}
			</div>
		)

	const isMethod =
		method === null ? null : (
			<div className="addressDetails__tbody-td">
				{from && from === address ? (
					<OutgoingTransaction />
				) : (
					<IncomeTrasaction />
				)}
				{method}
			</div>
		)
	const isFrom =
		from === null ? null : address !== from ? (
			<NavLink to={`/addresses/${from}`}>
				<div className="addressDetails__tbody-td">
					{sliceData5(from as string)}
				</div>
			</NavLink>
		) : (
			<div className="addressDetails__tbody-td">
				{sliceData5(from as string)}
			</div>
		)
	const isTo =
		to === null ? null : address !== to ? (
			<NavLink to={`/addresses/${to}`}>
				<div className="addressDetails__tbody-td universall__light2">
					{sliceData5(to as string)}
				</div>
			</NavLink>
		) : (
			<div className="addressDetails__tbody-td universall__light2">
				{sliceData5(to as string)}
			</div>
		)
	const isDate =
		date === null ? null : (
			<div className="addressDetails__tbody-td">{date}</div>
		)
	const isBlock: any =
		type === 'ERC-20_Tx' ? null : (
			<div className="addressDetails__tbody-td">{block}</div>
		)
	const isAmount =
		amount === null ? null : (
			<div className="addressDetails__tbody-td">
				<span className="universall__indent-icon">
					<Amb />
				</span>
				{amount}
				{token && token !== 'AMB' ? (
					<div
						style={{
							padding: '0 5px',
							cursor: 'pointer',
							color: '#808a9d',
							textDecoration: 'underline',
						}}
						onClick={() => {
							addressData?.tokens.forEach((item: any) => {
								if (item.name === token) {
									onClick(item)
									addFilter(item)
									navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}`)
								} else {
									return ''
								}
							})
						}}
					>
						{
							// @ts-ignore
							token ? token?.slice(0, 8) : ''
						}
					</div>
				) : (
					<div style={{ padding: '0 5px', color: '#808a9d' }}>AMB</div>
				)}
			</div>
		)

	const isTxFee: any =
		type === 'ERC-20_Tx' ? null : (
			<div className="addressDetails__tbody-td" style={{ padding: 0 }}>
				<span
					className="universall__indent-icon"
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{online}
				</span>
				{txfee} AMB
			</div>
		)

	const isToken: any =
		type === 'ERC-20_Tx' ? (
			<div
				className="addressDetails__tbody-td universall__light2"
				style={{ fontWeight: '600' }}
			>
				{!isLatest ? (
					token
				) : (
					<div
						onClick={() => {
							// eslint-disable-next-line array-callback-return
							addressData?.tokens.map((item: any) => {
								if (item.name === token) {
									onClick(item)
									addFilter(item)
									navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}`)
								}
							})
						}}
					>
						{token}
					</div>
				)}
			</div>
		) : null

	return (
		<>
			{isTxHash}
			{isMethod}
			{isFrom}
			{isTo}
			{isDate}
			{isBlock}
			{isAmount}
			{isTxFee}
			{isToken}
		</>
	)
}

export default AddressBlock
