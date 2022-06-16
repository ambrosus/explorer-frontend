import Tabs2 from '../../../components/Tabs/Tabs2';
import useSortData from '../../../hooks/useSortData';
import { getAccountTxData } from '../../../services/apollo.service';
import { atlasDetailsSorting } from '../../../utils/sidePages';
import { TokenType } from '../../Addresses/AddressDetails/address-details.interface';
import AtlasDetailsBalance from './components/AtlasDetailsBalance';
import AtlasDetailsMain from './components/AtlasDetailsMain';
import AtlasDetailsMiningStats from './components/AtlasDetailsMiningStats';
import { Content } from 'components/Content';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAtlasData } from 'services/atlas.service';
import { TParams } from 'types';

export const AtlasDetails = () => {
  const { address, type = '' }: TParams = useParams();
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [atlas, setAtlas] = useState(null);

  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAccountTxData,
    address,
    type,
  );

  const getDataApollo = async () => {
    const atlasData = await getAtlasData(address as string);
    setAtlas(atlasData.data);
  };

  useEffect(() => {
    getDataApollo();
  }, []);

  return (
    <Content>
      <Content.Header>
        <div className="apollo_details_header">
          <AtlasDetailsMain atlas={atlas} />
          <AtlasDetailsBalance atlas={atlas} />
          <AtlasDetailsMiningStats atlas={atlas} />
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
          pageType="atlas"
          sortOptions={atlasDetailsSorting}
        />
      </Content.Body>
    </Content>
  );
};
