import API from '../../../API/api';
import NodeHeader from '../../../components/NodeHeader';
import { getAtlasData } from '../../../services/atlas.service';
import { atlasDetailsSorting } from '../../../utils/sidePages';
import AddressBlock from '../../Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import TabsNew from '../../Transactions/components/TabsNew';
import AtlasDetailsBalance from './components/AtlasDetailsBalance';
import AtlasDetailsMain from './components/AtlasDetailsMain';
import AtlasDetailsMiningStats from './components/AtlasDetailsMiningStats';
import { Content } from 'components/Content';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

export const AtlasDetails = () => {
  const { address }: TParams = useParams();

  return (
    <Content>
      <Content.Header>
        <NodeHeader getNodeData={getAtlasData}>
          {({ node }: any) => {
            return (
              node && (
                <>
                  <AtlasDetailsMain atlas={node} />
                  <AtlasDetailsBalance atlas={node} />
                  <AtlasDetailsMiningStats atlas={node} />
                </>
              )
            );
          }}
        </NodeHeader>
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
