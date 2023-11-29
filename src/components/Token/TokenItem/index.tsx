import { ITokenItemProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useMemo } from 'react';
import { getTokenIcon } from 'utils/helpers';
import {poolsTokens} from "../../../utils/constants";

const TokenItem = ({ token, selectedToken, setToken }: ITokenItemProps) => {
  const Icon = getTokenIcon(token.symbol, token.name, token.address);

  const tokenData = useMemo(() => {
    if (poolsTokens[token.address]) {
      return poolsTokens[token.address];
    } else {
      return {
        symbol: token.symbol,
        name:
          token.name ||
          `${token.address.substring(0, 4)}...${token.address.substring(
            token.address.length - 4,
            token.address.length,
          )}`,
      };
    }
  }, [token]);

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
        <div>{tokenData.name}</div>
        <div className="universall_light2">
          {(+token?.balance.ether).toFixed(2)} {tokenData.symbol}
        </div>
      </div>
      <div className="token_item_amount" />
    </div>
  );
};

export default React.memo(TokenItem);
