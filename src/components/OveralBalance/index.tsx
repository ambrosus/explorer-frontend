// import { useDebounce } from 'hooks/useDebounce';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const OverallBalance: React.FC<OverallBalanceProps> = ({
  addressBalance = 0,
}) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { address }: TParams = useParams();
  const [balance, setBalance] = useState<string | number>(
    Number(addressBalance),
  );
  const [amountInUsd, setAmountInUsd] = useState<number>(0);
  const balMemo = useMemo(
    () => balance !== 0 && Number(addressBalance),
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
  }, [appData, balance !== addressBalance, address]);

  useEffect(() => {
    if (address) {
      if (addressBalance) {
        setBalance(addressBalance);
      }
      if (appData && appData?.total_price_usd && appData.total_price_usd) {
        setAmountInUsd(appData.total_price_usd * Number(addressBalance));
      }
    }
  }, [addressBalance, address, amountInUsd]);
  useEffect(() => {
    return () => {
      setBalance(0);
      setAmountInUsd(0);
    };
  }, []);
  return (
    <div className="overal_balance">
      <span
        className="overal_balance_cell universall_dark"
        style={{ fontWeight: 700 }}
      >
        Balance
      </span>
      <span className="overal_balance_cell universall_dark">
        {`${
          balMemo ? Number(balMemo).toFixed(2) : Number(balance).toFixed(2)
        } AMB`}{' '}
      </span>
      <span className="overal_balance_cell universall_dark">/</span>
      <span className="overal_balance_cell universall_light2">{`$ ${
        amountInUsdMemo ? amountInUsdMemo.toFixed(2) : amountInUsd.toFixed(2)
      }`}</span>
    </div>
  );
};

export default OverallBalance;
