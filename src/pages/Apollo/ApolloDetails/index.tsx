import API from '../../../API/api';
import NodeHeader from '../../../components/NodeHeader';
import useSortData from '../../../hooks/useSortData';
import {
  getAccountTxData,
  getApolloData,
} from '../../../services/apollo.service';
import { apolloDetailsSorting } from '../../../utils/sidePages';
import AddressBlock from '../../Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import TabsNew from '../../Transactions/components/TabsNew';
import { Account } from '../apollo.interface';
import ApolloDetailsBalance from './components/ApolloDetailsBalance';
import ApolloDetailsMain from './components/ApolloDetailsMain';
import ApolloDetailsMiningStats from './components/ApolloDetailsMiningStats';
import { Content } from 'components/Content';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

export const ApolloDetails = () => {
  const { address }: TParams = useParams();

  return (
    <Content>
      <Content.Header>
        <NodeHeader getNodeData={getApolloData}>
          {({ node }: any) => {
            return node !== null ? (
              <>
                <ApolloDetailsMain apollo={node} />
                <ApolloDetailsBalance apollo={node} />
                <ApolloDetailsMiningStats apollo={node} />
              </>
            ) : null;
          }}
        </NodeHeader>
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
