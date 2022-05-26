import { useTypedSelector } from 'hooks/useTypedSelector'
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface'
import React, { useEffect, useState } from 'react'

const OverallBalance: React.FC<OverallBalanceProps> = ({ addressBalance=0 }) => {
  const [amountInUsd, setAmountInUsd] = useState(0)
  const { data: appData } = useTypedSelector((state: any) => state.app)

  useEffect( () => {
    if (appData && appData?.total_price_usd && appData.total_price_usd) {
      setAmountInUsd(appData.total_price_usd * Number(addressBalance))
    }
  }, [addressBalance])

  return (
    <div className="address_details_info_text">
			<span
        className="address_details_info_text_span universall_dark"
        style={{ fontWeight: 700, marginRight: 8 }}
      >
				Balance
			</span>
      <div
        style={{
          display: 'flex',
          gap: 4,
        }}
      >
        <span className="address_details_info_text_span universall_dark">
				{`${addressBalance} AMB`}{' '}
			</span>
        <span className="address_details_info_text_span universall_dark">
          /
        </span>
        <span className="address_details_info_text_span universall_light2">{`$ ${
        amountInUsd && amountInUsd.toFixed(2)
      }`}</span>
      </div>
    </div>
  )
}

export default OverallBalance
