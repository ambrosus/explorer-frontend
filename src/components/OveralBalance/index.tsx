import { numberWithCommas } from '../../utils/helpers';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { OverallBalanceProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useEffect, useState } from 'react';

let buffer: string | number = '0';
let dollarBuffer: string | number = '';
let addressBuffer = '';

const OverallBalance: React.FC<OverallBalanceProps> = ({
  addressBalance,
  address,
}) => {
  const [amountInUsd, setAmountInUsd] = useState(
    address !== addressBuffer ? 0 : +dollarBuffer,
  );
  const [addressBalanceBuffer, setAddressBalanceBuffer] = useState(
    address !== addressBuffer ? 0 : +buffer,
  );
  const { data: appData } = useTypedSelector((state: any) => state.app);

  useEffect(() => {
    if (
      //TODO !addressBalance
      addressBalance !== undefined &&
      addressBalance !== null &&
      appData?.tokenInfo?.total_price_usd
    ) {
      addressBuffer = address;
      buffer = addressBalance;
      const usdPrice = appData?.tokenInfo?.price_usd * +addressBalance;

      dollarBuffer = usdPrice;
      setAmountInUsd(usdPrice);
      setAddressBalanceBuffer(+addressBalance);
    }
  }, [addressBalance, appData]);

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
            isNaN(+addressBalanceBuffer)
              ? 0.0
              : numberWithCommas(addressBalanceBuffer)
          } AMB`}{' '}
        </span>
        <span className="address_details_info_text_span universall_dark">
          /
        </span>
        <span className="address_details_info_text_span universall_light2">{`$ ${
          isNaN(amountInUsd) ? 0.0 : numberWithCommas(amountInUsd.toFixed(2))
        }`}</span>
      </div>
    </div>
  );
};

export default OverallBalance;
