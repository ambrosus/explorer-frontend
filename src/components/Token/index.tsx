import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TParams } from '../../types';
import TokenFilter from './TokenFilter';
import { TokenType } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface TokenProps {
  selectedToken: TokenType | null;
  onClick: any;
}

const Token: React.FC<TokenProps> = ({ onClick, selectedToken }) => {
  const { address }: TParams = useParams();
  const { loading, data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );
  const [prevAddress, setPrevAddress] = useState(address);

  const [newData, setNewData] = useState({});

  const newDataCallback = useCallback(() => {
    return addressData || newData;
  }, [prevAddress !== address]);

  useEffect(() => {
    setPrevAddress(address);
    if (!newDataCallback()) {
      setNewData(addressData);
    }
  }, [addressData]);

  useEffect(() => {
    if (addressData) {
      setNewData(addressData);
    }
    return () => {
      setNewData({});
    };
  }, [addressData]);

  return (
    <div className="token">
      <div className="token__info">
        <span className="token__info-name">Token</span>
        <TokenFilter
          loading={Object.keys(newDataCallback())?.length ? false : loading}
          addressData={
            Object.keys(newDataCallback())?.length ? newDataCallback() : newData
          }
          selectedToken={selectedToken}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Token;
