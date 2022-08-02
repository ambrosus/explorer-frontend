import React from "react";
import { Content } from 'components/Content';
import useSortData from 'hooks/useSortData';
import HeadInfo from 'components/HeadInfo';
import Loader from 'components/Loader';
import useAsyncStoreData from 'hooks/useAsyncStoreData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { getBundleInfo } from 'services/bundle.service';
import API from "../../API/api";
import TabsNew from "../Transactions/components/TabsNew";
import { getBundlesData } from 'services/bundle.service';
import { ambMonthUSD, numberWithCommas } from 'utils/helpers';

export const Bundles = () => {
  const { data } = useTypedSelector((state) => state.app);
  const { ref: ref1, renderData: data2 } = useAsyncStoreData(getBundlesData);

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
      value: avgBundleLoad,
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
        appData?.tokenInfo.total_price_usd,
      )} AMB / cost next month`,
    },
  ];

  return (
    <Content>
      <Content.Header>
        <BundleMainTabs data={appData} />
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
