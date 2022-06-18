import NodeHeader from '../../../components/NodeHeader';
import Tabs2 from '../../../components/Tabs/Tabs2';
import useSortData from '../../../hooks/useSortData';
import {
  getAccountTxData,
} from '../../../services/apollo.service';
import { getAtlasData } from '../../../services/atlas.service';
import { atlasDetailsSorting } from '../../../utils/sidePages';
import { TokenType } from '../../Addresses/AddressDetails/address-details.interface';
import AtlasDetailsBalance from './components/AtlasDetailsBalance';
import AtlasDetailsMain from './components/AtlasDetailsMain';
import AtlasDetailsMiningStats from './components/AtlasDetailsMiningStats';
import { Content } from 'components/Content';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

export const AtlasDetails = () => {
  const { address, type = '' }: TParams = useParams();
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);

  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAccountTxData,
    address,
    type,
  );

  return (
    <Content>
      <Content.Header>
        <NodeHeader getNodeData={getAtlasData}>
          {({ node }: any) => (
            <>
              <AtlasDetailsMain atlas={node} />
              <AtlasDetailsBalance atlas={node} />
              <AtlasDetailsMiningStats atlas={node} />
            </>
          )}
        </NodeHeader>
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
          pageType="atlas"
          sortOptions={atlasDetailsSorting}
        />
      </Content.Body>
    </Content>
  );
};
