import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ambMonthUSD, numberWithCommas } from 'utils/helpers';

const BundleMainTabs = ({ data }: any) => {
  const {
    totalBundles,
    bundlesActivity,
    totalAssets = 0,
    totalEvents = 0,
    bundleCost = 0,
  } = data || {};

  const { data: appData } = useTypedSelector((state: any) => state.app);

  const totalEntries = totalAssets + totalEvents;

  const avgBundleLoad = totalEntries
    ? (totalEntries / totalBundles).toFixed(2)
    : 0;

  const itemFirst: any = [
    {
      _id: 1,
      name: 'TOTAL',
      value: numberWithCommas(totalBundles) || 0,
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
      value: bundlesActivity || 0,
    },
    {
      _id: 2,
      name: 'BUNDLE COST',
      value: `${bundleCost?.ether || 0} AMB`,
    },
    {
      _id: 3,
      name: 'APROX BUNDLE',
      value: `${ambMonthUSD(
        appData?.tokenInfo.total_price_usd,
      )} AMB / cost next month`,
    },
  ];
  return (
    <>
      <h1 style={{ margin: '32px 0' }}>Bundles</h1>
      <HeadInfo data={itemFirst} className="head_info head_bundle" />
      <HeadInfo data={itemSecond} className="head_info" />
      {}
    </>
  );
};

export default BundleMainTabs;
