import API from '../../../API/api';
import { atlasDetailsSorting } from '../../../utils/sidePages';
import AddressBlock from '../../Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import TabsNew from '../../Transactions/components/TabsNew';
import AtlasDetailsHead from './components/AtlasDetailsHead';
import { Content } from 'components/Content';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

export const AtlasDetails = () => {
  const { getAddressData } = useActions();
  const { address }: TParams = useParams();

  useEffect(() => {
    getAddressData(address);
  }, []);

  const { data: addressData } = useTypedSelector((state) => state.addressData);

  return (
    <Content>
      <Content.Header>
        <AtlasDetailsHead atlas={addressData?.atlasInfo?.data} />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tabs={atlasDetailsSorting}
          fetchData={API.getAccountTx}
          fetchParams={{ address }}
          render={(txs: any) =>
            txs.map((transaction: any) => (
              <AddressBlock
                inners={transaction.inners}
                isLatest={true}
                key={transaction.hash}
                txhash={transaction.hash}
                method={transaction.type}
                from={transaction.from}
                to={transaction.to}
                date={moment(transaction.timestamp * 1000).fromNow()}
                block={transaction.blockNumber}
                amount={transaction.value.ether}
                txfee={transaction.gasCost.ether}
                token={`${transaction?.token ? transaction?.token : 'AMB'}`}
                symbol={`${transaction?.symbol ? transaction?.symbol : 'AMB'}`}
                isTableColumn="address_blocks_cells"
              />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
