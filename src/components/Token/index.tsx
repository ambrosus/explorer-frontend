import { TParams } from '../../types';
import TokenFilter from './TokenFilter';
import { TokenProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Token: React.FC<TokenProps> = ({
  loading,
  addressData,
  onClick,
  selectedToken,
}) => {
  const { address }: TParams = useParams();

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
  }, [addressData]);

  return (
    <div className="token">
      <div className="token_info">
        <span className="token_info_name">Token</span>
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
