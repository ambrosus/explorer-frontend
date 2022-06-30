import { TParams } from '../../types';
import TokenFilter from './TokenFilter';
import { TokenProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//TODO refactor
let dataBuffer: any = null;
let load: any = false;

const Token: React.FC<TokenProps> = ({
  addressData,
  onClick,
  selectedToken,
}) => {
  const { address, type } = useParams<TParams>();
  const [isLoading, setIsLoading] = useState(load);
  const [data, setData] = useState<any>(dataBuffer);

  useEffect(() => {
    if (type !== 'contract') {
      if (addressData !== dataBuffer && Object.keys(addressData).length) {
        setIsLoading(true);
        dataBuffer = addressData;
        setData(addressData);
        setIsLoading(false);
      }
    }
  }, [addressData, address]);

  return (
    <div className="token">
      <div className="token_info">
        <span className="token_info_name">Token</span>
        <TokenFilter
          loading={isLoading}
          addressData={data}
          selectedToken={selectedToken}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default React.memo(Token);
