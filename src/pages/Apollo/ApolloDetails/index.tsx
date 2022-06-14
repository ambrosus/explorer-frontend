import useSortData from '../../../hooks/useSortData';
import {
  getAccountTxData,
  getApolloData,
} from '../../../services/apollo.service';
import { apolloDetailsSorting } from '../../../utils/sidePages';
import { TokenType } from '../../Addresses/AddressDetails/address-details.interface';
import ApolloDetailsBalance from './components/ApolloDetailsBalance';
import ApolloDetailsMain from './components/ApolloDetailsMain';
import ApolloDetailsMiningStats from './components/ApolloDetailsMiningStats';
import { Content } from 'components/Content';
import Tabs2 from 'components/Tabs/Tabs2';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

export const ApolloDetails = () => {
  const { address, type = '' }: TParams = useParams();
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [apollo, setApollo] = useState(null);
  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAccountTxData,
    address,
    type,
  );

  const getDataApollo = async () => {
    const apolloData = await getApolloData(address as string);
    setApollo(apolloData.data);
  };
  useEffect(() => {
    getDataApollo();
  }, []);

  return (
    <Content>
      <Content.Header isLoading={!!apollo}>
        <div className="apollo_details_header">
          <ApolloDetailsMain apollo={apollo}/>
          <ApolloDetailsBalance apollo={apollo} />
          <ApolloDetailsMiningStats apollo={apollo} />
        </div>
      </Content.Header>
      <Content.Body>
        <Tabs2
          loading={loading}
          lastCardRef={ref}
          onClick={setSelectedToken}
          selectedToken={selectedToken}
          transactionType={type}
          data={sortTerm === type && renderData && renderData ? renderData : []}
          setTransactionType={setSortTerm}
          isIcon={false}
          pageType="apollo"
          sortOptions={apolloDetailsSorting}
        />
      </Content.Body>
    </Content>
  );
};
