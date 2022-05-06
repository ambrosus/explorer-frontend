import { useTypedSelector } from 'hooks/useTypedSelector'
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface'
import React, { useEffect, useState } from 'react'

const OverallBalance: React.FC<OverallBalanceProps> = ({ addressBalance }) => {
	const [amountInUsd, setAmountInUsd] = useState(0)
	const { data: appData } = useTypedSelector((state: any) => state.app)

	// @ts-ignore
	// eslint-disable-next-line
	useEffect(async () => {
		if (appData && appData?.total_price_usd && appData.total_price_usd) {
			setAmountInUsd(appData.total_price_usd * Number(addressBalance))
		}
	}, [addressBalance])

	return (
		<div className="addressDetails__div">
			<span
				className="addressDetails__div-span universall__dark"
				style={{ fontWeight: 700 }}
			>
				Balance
			</span>
			<span className="addressDetails__div-span universall__dark">
				{`${addressBalance} AMB`}{' '}
			</span>
			<span className="addressDetails__div-span universall__dark">/</span>
			<span className="addressDetails__div-span universall__light2">{`$ ${
				amountInUsd && amountInUsd.toFixed(2)
			}`}</span>
		</div>
	)
}

export default OverallBalance
