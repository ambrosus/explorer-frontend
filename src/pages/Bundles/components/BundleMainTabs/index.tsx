import BundleTabs from 'pages/Bundles/components/BundleTabs';
import {
  byteToMgb,
  calcDataTime,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

const BundleDetailsMainTabs = ({ data }: any) => {
  console.log(data);

  const itemFirst: any = [
    {
      _id: 1,
      name: 'TOTAL',
      value: data?.totalBundles,
    },
    {
      _id: 2,
      name: 'ENTRIES TOTAL',
      value: data?.totalBundles,
    },
    {
      _id: 3,
      name: 'AVERAGE BUNDLE LOAD',
      value: data?.totalBundles,
    },
  ];
  const itemSecond: any = [
    {
      _id: 1,
      name: '24H ACTIVITY',
      value: data?.bundlesActivity,
    },
    {
      _id: 2,
      name: 'BUNDLE COST',
      value: `${data?.bundleCost?.ether} AMB`,
    },
    {
      _id: 3,
      name: 'APROX BUNDLE',
      value: data?.totalBundles,
    },
  ];
  return (
    <>
      <BundleTabs data={itemFirst} mainColumns="repeat(3, auto)" />
      <BundleTabs data={itemSecond} mainColumns="repeat(3, auto)" />
    </>
  );
};

export default BundleDetailsMainTabs;
