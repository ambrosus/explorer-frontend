import { useTypedSelector } from 'hooks/useTypedSelector';
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useCallback, useEffect, useState } from 'react'
import { TParams } from '../../types'
import { useParams } from 'react-router-dom'

const OverallBalance: React.FC<OverallBalanceProps> = ({
  addressBalance = 0,
}) => {
  const {loading, data: appData } = useTypedSelector((state: any) => state.app);
  const { address }: TParams = useParams();
  const [balance, setBalance] = useState<any>(addressBalance);
  const [amountInUsd, setAmountInUsd] = useState(0);

  const setValues = useCallback(() => {
    if (addressBalance) {
      setBalance(addressBalance);
    }
    if (appData && appData?.total_price_usd && appData.total_price_usd) {
      setAmountInUsd(appData.total_price_usd * Number(addressBalance));
    }
  },[balance,addressBalance ,amountInUsd,address])

  useEffect(() => {
    setValues()
  }, [address,appData,addressBalance,balance, loading,amountInUsd]);

  return (
    <div className="addressDetails__div">
      <span
        className="addressDetails__div-span universall__dark"
        style={{ fontWeight: 700 }}
      >
        Balance
      </span>
      <span className="addressDetails__div-span universall__dark">
        {`${balance} AMB`}{' '}
      </span>
      <span className="addressDetails__div-span universall__dark">/</span>
      <span className="addressDetails__div-span universall__light2">{`$ ${
        amountInUsd && amountInUsd.toFixed(2)
      }`}</span>
    </div>
  );
};

export default OverallBalance;
