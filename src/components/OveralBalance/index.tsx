import { useDebounce } from '../../hooks/useDebounce';
import { TParams } from '../../types';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const OverallBalance: React.FC<OverallBalanceProps> = ({
  addressBalance = 0,
}) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
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
          {`${
            balMemo ? Number(balMemo).toFixed(2) : Number(balance).toFixed(2)
          } AMB`}{' '}
        </span>
        <span className="address_details_info_text_span universall_dark">
          /
        </span>
        <span className="address_details_info_text_span universall_light2">{`$ ${
          amountInUsd ? amountInUsd.toFixed(2) : deboucePrice.toFixed(2)
        }`}</span>
      </div>
    </div>
  );
};

export default OverallBalance;
