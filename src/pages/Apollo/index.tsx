import API from '../../API/api';
import { apollosSorting } from '../../utils/sidePages';
import AtlasBlocksHeader from '../Atlas/components/AtlasBlocksHeader';
import TabsNew from '../Transactions/components/TabsNew';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import API2 from 'API/newApi';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { memo, useEffect, useState } from 'react';

export const Apollo = memo(() => {
  const [apolloData, setApolloData] = useState<any>(null);

  useEffect(() => {
    API2.getInfo().then((res) => setApolloData(res.data));
  }, []);

  const {
    total = 0,
    online = 0,
    offline = 0,
    connecting = 0,
  } = apolloData?.apollos || 0;

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: total,
    },
    {
      name: 'ONLINE',
      value: online,
      style: {
        color: '#1acd8c',
      },
    },
    {
      name: 'OFFLINE',
      value: offline,
    },
    {
      name: 'CONNECTING',
      value: connecting,
    },
    {
      name: 'Avg block / prop. time',
      value: `${apolloData?.avgBlockTime.toFixed(3)} sec`,
    },
  ];

  return (
    <Content>
      <Content.Header>
        <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
        <HeadInfo data={itemFirst} className="head_info" />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <AtlasBlocksHeader pageTitle="blocks" />}
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
});
