import TokenFilter from '../TokenFilter';
import { TokenType } from 'pages/Addresses/AddressDetails/address-details.interface';
import React from 'react';

export interface TokenProps {
  selectedToken: TokenType | null;
  onClick: any;
}

const Token: React.FC<TokenProps> = ({ onClick, selectedToken }) => {
  return (
    <div className="token">
      <div className="token__info">
        <span className="token__info-name">Token</span>
        <TokenFilter selectedToken={selectedToken} onClick={onClick} />
      </div>
    </div>
  );
};

export default Token;
