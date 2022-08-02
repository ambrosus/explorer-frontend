import React from 'react';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import MainInfoApollo from './components/MainInfoApollo';
import { Content } from 'components/Content';
import AtlasBlocksHeader from "../Atlas/components/AtlasBlocksHeader";
import API from "../../API/api";
import TabsNew from "../Transactions/components/TabsNew";
import {apollosSorting} from "../../utils/sidePages";

export const Apollo = () => {
  return (
    <Content>
      <Content.Header>
        <MainInfoApollo />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <AtlasBlocksHeader />}
          sortOptions={apollosSorting}
          fetchData={API.getApollos}
          initSortTerm={'totalBundles'}
          fetchParams={{ sort: '', next: '' }}
          label="Nodes"
          render={(list: any) =>
            list.map((el: any, index: any) => (
              <ApolloBlocksBody key={index} index={index + 1} item={el} />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
