import { ITokenItemProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React from 'react';
import { getTokenIcon } from 'utils/helpers';

const TokenItem = ({ token, selectedToken, setToken }: ITokenItemProps) => {
  const Icon = getTokenIcon(token.symbol);
  return (
    <div
      className="token_item"
      onClick={() => {
        setToken(token);
      }}
      style={{
        // @ts-ignore
        backgroundColor:
          selectedToken &&
          selectedToken?.name &&
          selectedToken?.name === token?.name
            ? '#EFF2F5'
            : null,
      }}
    >
      <div className="token_item_icon">
        <Icon />
      </div>

      <div className="token_item_tokens">
        <div>
          {token?.name?.length > 40
            ? `${token?.name.slice(0, 40)}...`
            : token?.name}
        </div>
        <div className="universall_light2">
          {token?.balance} {token?.symbol}
        </div>
      </div>
      <div className="token_item_amount" />
    </div>
  );
};

export default React.memo(TokenItem);
