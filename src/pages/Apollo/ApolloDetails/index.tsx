import { Account } from '../apollo.interface';
import ApolloDetailsBalance from './components/ApolloDetailsBalance';
import ApolloDetailsMain from './components/ApolloDetailsMain';
import ApolloDetailsMiningStats from './components/ApolloDetailsMiningStats';
import API from 'API/api';
import { Content } from 'components/Content';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import AddressBlock from 'pages/Addresses/AddressDetails/components/AddressBlocks';
import TabsNew from 'pages/Transactions/components/TabsNew';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';
import { apolloDetailsSorting } from 'utils/sidePages';

export const ApolloDetails = () => {
  const { getAddressData } = useActions();
  const { address }: TParams = useParams();

  const { data: addressData } = useTypedSelector((state) => state.addressData);

  useEffect(() => {
    getAddressData(address);
  }, []);

  return (
    <Content>
      <Content.Header>
        <ApolloDetailsMain apollo={addressData?.apolloInfo?.data} />
        <ApolloDetailsBalance apollo={addressData?.apolloInfo?.data} />
        <ApolloDetailsMiningStats apollo={addressData?.apolloInfo?.data} />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tabs={apolloDetailsSorting}
          fetchData={API.getAccountTx}
          fetchParams={{ address, type: '' }}
          render={(txs: Account[]) =>
            txs.map((transaction: any) => (
              <AddressBlock
                key={transaction.hash}
                inners={transaction.inners}
                isLatest={true}
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
                isIcon={true}
              />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
