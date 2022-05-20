import { useDebounce } from '../../hooks/useDebounce';
import { TParams } from '../../types';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const OverallBalance: React.FC<OverallBalanceProps> = ({
  addressBalance = 0,
}) => {
  const { loading, data: appData } = useTypedSelector(
    (state: any) => state.app,
  );
  const { address }: TParams = useParams();
  const [balance, setBalance] = useState<any>(Number(addressBalance));
  const [amountInUsd, setAmountInUsd] = useState<any>(Number(addressBalance));

  const balMemo = useMemo(
    () => (balance ? Number(addressBalance) : Number(addressBalance)),
    [address, addressBalance],
  );
  let amountInUsdMemo = useMemo(() => {
    return (
      (appData &&
        appData?.total_price_usd &&
        appData.total_price_usd &&
        appData.total_price_usd * Number(addressBalance)) ||
      0
    );
  }, [appData, address]);

  const deboucePrice = useDebounce(amountInUsdMemo, 1000);
  useEffect(() => {
    if (!balMemo || address) {
      if (addressBalance) {
        setBalance(addressBalance);
      }
      if (appData && appData?.total_price_usd && appData.total_price_usd) {
        setAmountInUsd(appData.total_price_usd * Number(addressBalance));
      }
    }
  }, [addressBalance, address, amountInUsd]);

  return (
    <div className="addressDetails__div">
      <span
        className="addressDetails__div-span universall__dark"
        style={{ fontWeight: 700 }}
      >
        Balance
      </span>
      <span className="addressDetails__div-span universall__dark">
        {`${
          balMemo ? Number(balMemo).toFixed(2) : Number(balance).toFixed(2)
        } AMB`}{' '}
      </span>
      <span className="addressDetails__div-span universall__dark">/</span>
      <span className="addressDetails__div-span universall__light2">{`$ ${
        amountInUsd ? amountInUsd.toFixed(2) : deboucePrice.toFixed(2)
      }`}</span>
    </div>
  );
};

export default OverallBalance;
