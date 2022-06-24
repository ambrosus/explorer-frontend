import BundleDetailsMain from '../BundleDetailsMain';

const BundleDetailsMainTabs = ({ data }: any) => {
  const itemFirst: any = [
    {
      _id: 1,
      name: 'BY',
      value: data,
    },
    {
      _id: 2,
      name: 'TX HASH',
      value: data,
    },
    {
      _id: 3,
      name: 'BLOCK',
      value: data,
    },
    {
      _id: 4,
      name: 'BUNDLE COST',
      value: data,
    },
    {
      _id: 5,
      name: 'SIZE',
      value: data,
    },
  ];
  const itemSecond: any = [
    {
      _id: 1,
      name: 'CREATED',
      value: data,
    },
    {
      _id: 2,
      name: 'DURATION',
      value: data,
    },
    {
      _id: 3,
      name: 'EXPIRATION DATE',
      value: data,
    },
    {
      _id: 4,
      name: 'NODE',
      value: data,
    },
    {
      _id: 5,
      name: 'BUNDLE LOAD',
      value: data,
    },
  ];
  return (
    <>
      <BundleDetailsMain data={itemFirst} mainColumns="3fr 3fr 2fr 2fr 1fr" />
      <BundleDetailsMain data={itemSecond} mainColumns="3fr 2fr 3fr 2fr 2fr" />
    </>
  );
};

export default BundleDetailsMainTabs;
