import HeadInfo from 'components/HeadInfo';
import { NavLink } from 'react-router-dom';
import { BUNDLE_MAX_LOAD } from 'utils/constants';
import {
  bundleExpirationTime,
  byteToMgb,
  calcBundleTime,
  calcDataTime,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

const BundleDetailsMainTabs = ({ data }: any) => {
  const { totalEvents = 0, totalAssets = 0 } = data;

  const total = totalEvents + totalAssets;
  const created = (
    <span>
      {calcDataTime(data.uploadTimestamp)}
      <span style={{ fontSize: 10 }}>
        {' '}
        {calcBundleTime(data.uploadTimestamp)}
      </span>
    </span>
  );

  const expired = (
    <div>
      {calcDataTime(bundleExpirationTime(data))}
      <span style={{ fontSize: 10 }}>
        {' '}
        {calcBundleTime(data.uploadTimestamp)}
      </span>
    </div>
  );

  const itemFirst: any = [
    {
      _id: 1,
      name: 'BY',
      value: (
        <NavLink rel="canonical" to={`/address/${data.uploader}/`} style={{ color: '#808A9D' }}>
          {sliceData5(data.uploader)}
        </NavLink>
      ),
      style: {
        color: '#808A9D',
      },
    },
    {
      _id: 2,
      name: 'TX HASH',
      value: (
        <NavLink rel="canonical" to={`/tx/${data?.txHash}/`} style={{ color: '#808A9D' }}>
          {sliceData10(data?.txHash, 12)}
        </NavLink>
      ),
      style: {
        color: '#808A9D',
      },
    },
    {
      _id: 3,
      name: 'BLOCK',
      value: (
        <NavLink
          rel="canonical"
          to={`/blocks/${data.block.number}`}
          style={{ color: '#808A9D' }}
        >
          {data.block.number}
        </NavLink>
      ),

      style: {
        color: '#808A9D',
      },
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
      value: created,
    },

    {
      _id: 2,
      name: 'DURATION',
      value: `${data.storagePeriods} year`,
    },
    {
      _id: 3,
      name: 'EXPIRATION DATE',
      value: expired,
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
