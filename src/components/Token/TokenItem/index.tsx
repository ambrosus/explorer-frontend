import { ITokenItemProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React from 'react';
import { getTokenIcon } from 'utils/helpers';

const TokenItem = ({ token, selectedToken, setToken }: ITokenItemProps) => {
  const Icon = getTokenIcon(token.symbol, token.name);

  return (
    <div
      className={
        selectedToken?.address === token?.address
          ? 'token_item token_item_active'
          : 'token_item'
      }
      onClick={() => setToken(token)}
    >
      <div className="token_item_icon">
        <Icon />
      </div>

      <div className="token_item_tokens">
        <div>
          {token?.name || `${token.address.substring(0, 4)}...${token.address.substring(token.address.length - 4, token.address.length)}`}
        </div>
        <div className="universall_light2">
          {token?.balance.ether} {token?.symbol}
        </div>
      </div>
      <div className="token_item_amount" />
    </div>
  );
};

export default React.memo(TokenItem);
