import NodeHeader from '../../../components/NodeHeader';
import useSortData from '../../../hooks/useSortData';
import {
  getAccountTxData,
  getApolloData,
} from '../../../services/apollo.service';
import { apolloDetailsSorting } from '../../../utils/sidePages';
import ApolloDetailsBalance from './components/ApolloDetailsBalance';
import ApolloDetailsMain from './components/ApolloDetailsMain';
import ApolloDetailsMiningStats from './components/ApolloDetailsMiningStats';
import { Content } from 'components/Content';
import Tabs2 from 'components/Tabs/Tabs2';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

export const ApolloDetails = () => {
  const { address, type = '' }: TParams = useParams();

  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAccountTxData,
    address,
    type,
  );

  return (
    <Content>
      <Content.Header>
        <NodeHeader getNodeData={getApolloData}>
          {({ node }: any) => (
            <>
              <ApolloDetailsMain apollo={node} />
              <ApolloDetailsBalance apollo={node} />
              <ApolloDetailsMiningStats apollo={node} />
            </>
          )}
        </NodeHeader>
      </Content.Header>
      <Content.Body>
        <Tabs2
          loading={loading}
          lastCardRef={ref}
          transactionType={type}
          data={sortTerm === type && renderData ? renderData : []}
          setTransactionType={setSortTerm}
          isIcon={false}
          pageType="apollo"
          sortOptions={apolloDetailsSorting}
        />
      </Content.Body>
    </Content>
  );
};
