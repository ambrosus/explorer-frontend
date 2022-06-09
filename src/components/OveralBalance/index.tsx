import { useTypedSelector } from 'hooks/useTypedSelector';
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useEffect, useState } from 'react';

//TODO refactor
let amountInUsdBuffer = 0;

const OverallBalance: React.FC<OverallBalanceProps> = ({ addressBalance }) => {
  const [amountInUsd, setAmountInUsd] = useState(amountInUsdBuffer);
  const [addressBalanceBuffer, setAddressBalanceBuffer] = useState(
    +addressBalance,
  );
  const { data: appData } = useTypedSelector((state: any) => state.app);

  useEffect(() => {
    if (
      //TODO !addressBalance
      addressBalance !== undefined &&
      addressBalance !== null &&
      appData?.total_price_usd
    ) {
      const usdPrice = appData.total_price_usd * +addressBalance;
      amountInUsdBuffer = usdPrice;
      setAmountInUsd(usdPrice);
      setAddressBalanceBuffer(+addressBalance);
    }
  }, [addressBalance]);

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
          {`${isNaN(addressBalanceBuffer) ? 0.0 : addressBalanceBuffer} AMB`}{' '}
        </span>
        <span className="address_details_info_text_span universall_dark">
          /
        </span>
        <span className="address_details_info_text_span universall_light2">{`$ ${
          amountInUsd === NaN ? 0.0 : amountInUsd.toFixed(2)
        }`}</span>
      </div>
    </div>
  );
};

export default OverallBalance;
