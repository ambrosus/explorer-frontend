import BundleTabs from 'pages/Bundles/components/BundleTabs';

const BundleMainTabs = ({ data }: any) => {
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
      <h1 style={{ margin: '32px 0' }}>Bundles</h1>
      <BundleTabs data={itemFirst} mainColumns="repeat(3, auto)" />
      <BundleTabs data={itemSecond} mainColumns="repeat(3, auto)" />
    </>
  );
};

export default BundleMainTabs;
