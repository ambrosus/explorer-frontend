import CopyBtn from 'components/CopyBtn';
import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';
import { ambToUSD } from 'utils/helpers';

const AtlasDetailsHead = ({ atlas }: any) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { address }: TParams = useParams();

  const ambBalance = atlas?.balance?.ether || 0;
  const ambStake = atlas?.stake?.ether || 0;
  const total_price_usd = appData?.total_price_usd ?? 0;
  const usdBalance = +ambToUSD(ambBalance, total_price_usd);
  const usdStake = +ambToUSD(ambStake, total_price_usd);

  const available = atlas?.payPeriods?.available || 0;
  const forecast = atlas?.payPeriods?.current?.forecast || 0;

  const usdForecast = +ambToUSD(forecast, total_price_usd);
  const usdAvailable = +ambToUSD(available, total_price_usd);
  const nextPayDay = (startDay: any): any => {
    let today = moment().format('YYYY-MM-DD');
    let delta = moment(startDay).diff(today);

    if (delta < 0) {
      startDay = moment(startDay).add(28, 'days').format('YYYY-MM-DD');
      return nextPayDay(startDay);
    } else {
      return startDay;
    }
  };

  const itemFirst: any = [
    {
      _id: (Math.random() * 10).toFixed(2),
      name: 'BALANCE',
      value: `${ambBalance.toFixed(2)} AMB / $ ${usdBalance.toFixed(2)}`,
    },

    {
      _id: (Math.random() * 10).toFixed(2),
      name: 'STAKE',
      value: `${ambStake.toFixed(2)} AMB / $ ${usdStake.toFixed(2)}`,
    },
    {
      _id: (Math.random() * 10).toFixed(2),
      name: 'URL',
      value: (
        <a
          className="atlas_details_balance_fonts_bold"
          rel="noreferrer"
          target="_blank"
          href={atlas?.url}
        >
          {atlas?.url || 'wait'}
        </a>
      ),
    },
  ];

  const itemSecond: any = [
    {
      _id: (Math.random() * 1000).toFixed(5),
      name: 'AVAILABLE PAYOUT BALANCE',
      value: `${available.toFixed(2)} AMB / $ ${usdAvailable.toFixed(2)}`,
    },

    {
      _id: (Math.random() * 1000).toFixed(5),
      name: 'FORECASTED REVENUE',
      value: `${forecast.toFixed(2)} AMB / $ ${usdForecast.toFixed(2)}`,
    },
    {
      _id: (Math.random() * 1000).toFixed(5),
      name: 'NEXT PAYOUT DATE',
      value: moment(nextPayDay('1970-01-01')).format('DD/MM/YYYY'),
    },
    {
      _id: (Math.random() * 1000).toFixed(5),
      name: 'TOTAL BUNDLES',
      value: atlas?.totalBundles || 0,
    },
  ];

  return (
    <>
      <div className="atlas_details_main">
        <div className="atlas_details_main_nd">
          <h1>ND Atlas</h1>
          <div className="atlas_details_main_online">
            {atlas?.state || 'WAIT'}
          </div>
        </div>
        <div className="atlas_details_main_address">
          <div className="atlas_details_main_cell universall_bold">Address</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div className="address_content">{address}</div>
            <CopyBtn />
          </div>
        </div>
      </div>
      <HeadInfo data={itemFirst} className="head_info" />;
      <HeadInfo data={itemSecond} className="head_info" />;
    </>
  );
};

export default AtlasDetailsHead;
