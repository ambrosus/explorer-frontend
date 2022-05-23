import { useTypedSelector } from 'hooks/useTypedSelector';
import { TransactionProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toUniqueValueByBlock } from 'utils/helpers';

const useTabs = (data: any) => {
  const { type, filtered } = useParams();
  const [prevType, setPrevType] = useState<any>(type);
  const [renderData, setRenderData] = React.useState<any>(null);
  const { loading, data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );

  useEffect(() => {
    if (type) {
      setPrevType(type);
    }
    if (prevType !== type) {
      setRenderData(null);
    }
    if (addressData && !loading) {
      if (data?.length && type !== 'ERC-20_Tx' && !filtered) {
        if (type === 'transfers') {
          setRenderData(() => {
            const transfersDataTx: TransactionProps[] = data.filter(
              (item: TransactionProps) => item.method === 'Transfer',
            );
            return transfersDataTx || [];
          });
        } else {
          setRenderData(toUniqueValueByBlock(data));
        }
      }
      if (data?.length && filtered && type === 'ERC-20_Tx') {
        setRenderData(toUniqueValueByBlock(data));
      }

      if (
        addressData &&
        addressData?.latestTransactions?.length &&
        type === 'ERC-20_Tx' &&
        !filtered
      ) {
        setRenderData(toUniqueValueByBlock(addressData.latestTransactions));
      }
    }
  }, [addressData, data, filtered, type, loading]);
  return { renderData };
};

export default useTabs;
