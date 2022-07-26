import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import Loader from 'components/Loader';
import useAsyncStoreData from 'hooks/useAsyncStoreData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
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
        <h1 style={{ margin: '32px 0' }}>Bundles</h1>
        <HeadInfo data={itemFirst} className="head_info head_bundle" />
        <HeadInfo data={itemSecond} className="head_info" />
      </Content.Header>
      <Content.Body>
        <div className="bundles_blocks">
          <div className="bundles_blocks_heading">Recent Bundles</div>
          <div className="bundles_blocks_table">
            <BundleBlocksHeader />
            {data2?.data?.length ? (
              data2.data.map((item: any, index: number) => (
                <BundleBlocksBody
                  lastCardRef={data2?.pagination?.hasNext ? ref1 : null}
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
        {data2?.pagination?.hasNext && <Loader />}
      </Content.Body>
    </Content>
  );
};
