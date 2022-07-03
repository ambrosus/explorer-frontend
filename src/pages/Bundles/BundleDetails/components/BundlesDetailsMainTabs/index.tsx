import HeadInfo from 'components/HeadInfo';
import { BUNDLE_MAX_LOAD } from 'utils/constants';
import {
  bundleExpirationTime,
  byteToMgb,
  calcDataTime,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

const BundleDetailsMainTabs = ({ data }: any) => {
  const { totalEvents = 0, totalAssets = 0 } = data;

  const total = totalEvents + totalAssets;

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
      value: calcDataTime(bundleExpirationTime(data)),
    },
    {
      _id: 4,
      name: 'NODE',
      value: data.node.toUpperCase(),
    },
    {
      _id: 5,
      name: 'BUNDLE LOAD',
      value: `${Math.round((total / BUNDLE_MAX_LOAD) * 10000) / 100}%`,
    },
  ];
  return (
    <>
      <HeadInfo data={itemFirst} className="bundle_details_tab" />
      <HeadInfo data={itemSecond} className="bundle_details_tab" />
    </>
  );
};

export default BundleDetailsMainTabs;
