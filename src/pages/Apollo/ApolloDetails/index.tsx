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
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { TParams } from 'types';

export const ApolloDetails = () => {
  const { address, type = '' }: TParams = useParams();
  const [apollo, setApollo] = useState(null);
  const navigate = useNavigate();

  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAccountTxData,
    address,
    type,
  );

  const { data, isError, isLoading } = useQuery('todos', () =>
    getApolloData(address as string),
  );

  useEffect(() => {
    if (!isLoading) setApollo(data?.data);
  }, []);

  if (isError) navigate(`/notfound`);

  return (
    <Content>
      <Content.Header>
        <div className="apollo_details_header">
          <ApolloDetailsMain apollo={apollo} />
          <ApolloDetailsBalance apollo={apollo} />
          <ApolloDetailsMiningStats apollo={apollo} />
        </div>
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
