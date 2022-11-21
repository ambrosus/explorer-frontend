import TokenFilter from './TokenFilter';
import { TokenProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React from 'react';

const Token: React.FC<TokenProps> = ({
  addressData,
  onClick,
  selectedToken,
}) => {
  return (
    <div className="token">
      <div className="token_info">
        <span className="token_info_name">Token</span>
        <TokenFilter
          loading={false}
          addressData={addressData}
          selectedToken={selectedToken}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default React.memo(Token);
