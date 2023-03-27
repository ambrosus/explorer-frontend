import API from '../../API/api';
import TabsNew from '../Transactions/components/TabsNew';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ambMonthUSD, numberWithCommas } from 'utils/helpers';

export const Bundles = () => {
  const { data } = useTypedSelector((state) => state.app);

  const {
    totalBundles,
    bundlesActivity,
    totalAssets = 0,
    totalEvents = 0,
    bundleCost = 0,
  } = data?.netInfo || {};

  const { data: appData } = useTypedSelector((state: any) => state.app);

  const totalEntries = totalAssets + totalEvents;

  const avgBundleLoad = totalEntries
    ? (totalEntries / totalBundles).toFixed(2)
    : 0;

  const itemFirst: any = [
    {
      name: 'TOTAL',
      value: numberWithCommas(totalBundles) || 0,
    },
    {
      name: 'ENTRIES TOTAL',
      value: numberWithCommas(totalEntries),
    },
    {
      name: 'AVERAGE BUNDLE LOAD',
      value: numberWithCommas(avgBundleLoad),
    },
  ];
  const itemSecond: any = [
    {
      name: '24H ACTIVITY',
      value: bundlesActivity || 0,
    },
    {
      name: 'BUNDLE COST',
      value: `${bundleCost?.ether || 0} AMB`,
    },
    {
      name: 'APROX BUNDLE',
      value: `${ambMonthUSD(
        appData?.tokenInfo.price_usd,
      )} AMB / cost next month`,
    },
  ];

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/bundles/" />
        <title>Bundles | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Explore AirDAO Network Bundles: average bundle load, aprox bundle, bundle cost, entries total etc."
        />
      </Helmet>
      <Content.Header>
        <h1 style={{ margin: '32px 0' }}>Bundles</h1>
        <HeadInfo data={itemFirst} className="head_info head_bundle" />
        <HeadInfo data={itemSecond} className="head_info" />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <BundleBlocksHeader />}
          fetchData={API.getBundles}
          fetchParams={{ next: '' }}
          label="Recent Bundles"
          render={(list: any) =>
            list.map((el: any, index: any) => (
              <BundleBlocksBody key={index} index={index + 1} item={el} />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
