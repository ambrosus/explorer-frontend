import TokenItem from '../TokenItem';
import {
  TokenModalProps,
  TokenType,
} from 'pages/Addresses/AddressDetails/address-details.interface';
import { is } from 'ramda';
import { FC, useEffect, useState } from 'react';

const TokenModal: FC<TokenModalProps> = ({
  addressData,
  selectedToken,
  setToken,
}) => {
  const [name] = useState('');
  const [filteredTokensList, setFilteredTokensList] = useState([]);

  useEffect(() => {
    if (name) {
      const newTokensList =
        addressData &&
        addressData?.tokens.filter((token: TokenType) =>
          token.name.toLowerCase().includes(name.toLowerCase()),
        );
      setFilteredTokensList(newTokensList || []);
      if (!newTokensList.length) {
        setFilteredTokensList(addressData?.tokens || []);
      }
    }
  }, [name, addressData?.tokens, selectedToken]);

  const isScroll =
    addressData?.tokens?.length > 5
      ? 'token_modal token_modal_scroll'
      : 'token_modal';

  return (
    <div className={isScroll}>
      {addressData?.tokens?.length ? (
        <>
          <div>
            <div className="token_modal_tokens">
              ERC-20 Tokens
              <span className="universall_light2" style={{ marginLeft: 4 }} />
            </div>
            <div className="token_modal_arrows" />
          </div>
          {!filteredTokensList.length
            ? addressData?.tokens.map(
                (token: { name: string; idx: number }) => (
                  <TokenItem
                    key={token.name + token.idx}
                    selectedToken={selectedToken}
                    token={token}
                    setToken={setToken}
                  />
                ),
              )
            : filteredTokensList.map((token: { name: string; idx: number }) => (
                <TokenItem
                  key={token.name + token.idx}
                  selectedToken={selectedToken}
                  token={token}
                  setToken={setToken}
                />
              ))}
        </>
      ) : (
        <div>
          <div className="token_modal_tokens">
            <div>You don't have tokens yet</div>
            <span className="universall_light2" style={{ marginLeft: 4 }} />
          </div>
          <div className="token_modal_arrows" />
        </div>
      )}
    </div>
  );
};

export default TokenModal;
