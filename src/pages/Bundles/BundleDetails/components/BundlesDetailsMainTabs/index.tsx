import BundleDetailsTabs from '../BundleDetailsTab';
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
      name: 'BY',
      value: sliceData5(data.uploader),
    },
    {
      _id: 2,
      name: 'TX HASH',
      value: sliceData10(data?.txHash, 12),
    },
    {
      _id: 3,
      name: 'BLOCK',
      value: data.block.number,
    },
    {
      _id: 4,
      name: 'BUNDLE COST',
      value: `${data.uploadFee.ether} AMB`,
    },
    {
      _id: 5,
      name: 'SIZE',
      value: `${byteToMgb(data.size)} Mb`,
    },
  ];
  const itemSecond: any = [
    {
      _id: 1,
      name: 'CREATED',
      value: calcDataTime(data.uploadTimestamp),
    },
    {
      _id: 2,
      name: 'DURATION',
      value: `${data.storagePeriods} year`,
    },
    {
      _id: 3,
      name: 'EXPIRATION DATE',
      value: calcDataTime(data.uploadTimestamp),
    },
    {
      _id: 4,
      name: 'NODE',
      value: data.node.toUpperCase(),
    },
    {
      _id: 5,
      name: 'BUNDLE LOAD',
      value: calcDataTime(data.uploadTimestamp),
    },
  ];
  return (
    <>
      <BundleDetailsTabs data={itemFirst} mainColumns="repeat(5, auto)" />
      <BundleDetailsTabs data={itemSecond} mainColumns="repeat(5, auto)" />
    </>
  );
};

export default BundleDetailsMainTabs;
