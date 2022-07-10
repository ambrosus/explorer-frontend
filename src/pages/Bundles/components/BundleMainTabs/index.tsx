import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ambMonthUSD, numberWithCommas } from 'utils/helpers';

const BundleMainTabs = ({ data }: any) => {
  const {
    totalBundles,
    bundlesActivity,
    totalAssets,
    totalEvents,
    bundleCost,
  } = data || 0;

  const { data: appData } = useTypedSelector((state: any) => state.app);

  const totalEntries = totalAssets + totalEvents;

  const avgBundleLoad = totalEntries
    ? (totalEntries / totalBundles).toFixed(2)
    : 0;

  const itemFirst: any = [
    {
      _id: 1,
      name: 'TOTAL',
      value: numberWithCommas(totalBundles),
    },
    {
      _id: 2,
      name: 'ENTRIES TOTAL',
      value: numberWithCommas(totalEntries),
    },
    {
      _id: 3,
      name: 'AVERAGE BUNDLE LOAD',
      value: avgBundleLoad,
    },
  ];
  const itemSecond: any = [
    {
      _id: 1,
      name: '24H ACTIVITY',
      value: bundlesActivity,
    },
    {
      _id: 2,
      name: 'BUNDLE COST',
      value: `${bundleCost?.ether} AMB`,
    },
    {
      _id: 3,
      name: 'APROX BUNDLE',
      value: `${ambMonthUSD(
        appData?.totalPriceToken.total_price_usd,
      )} AMB / cost next month`,
    },
  ];
  return (
    <>
      <h1 style={{ margin: '32px 0' }}>Bundles</h1>
      <HeadInfo data={itemFirst} className="bundle_tabs" />
      <HeadInfo data={itemSecond} className="bundle_tabs" />
      {}
    </>
  );
};

export default BundleMainTabs;
