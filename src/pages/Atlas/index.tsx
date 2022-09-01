import API from '../../API/api';
import TabsNew from '../Transactions/components/TabsNew';
import { TAtlasSortProps } from './atlasBlocks.interface';
import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';

const sortOptions: TAtlasSortProps[] = [
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Total bundles',
    value: 'totalBundles',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Stake',
    value: 'stake',
  },
];

export const Atlas = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const total = appData?.netInfo?.atlases?.total || 0;
  const avgBlockTime = appData?.netInfo?.avgBlockTime || 0;

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: total,
    },

    {
      name: 'Avg block / prop. time',
      value: `${avgBlockTime} sec`,
    },
  ];

  return (
    <Content>
      <Content.Header>
        <h1 className="main_info_atlas_heading">Atlas Nodes</h1>
        <HeadInfo data={itemFirst} className="head_info" />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <AtlasBlocksHeader pageTitle="bundles" />}
          sortOptions={sortOptions}
          fetchData={API.getAtlases}
          initSortTerm={'totalBundles'}
          fetchParams={{ sort: '', next: '' }}
          label="Nodes"
          render={(list: any) =>
            list.map((el: any, index: any) => (
              <AtlasBlocksBody key={index} index={index + 1} item={el} />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
