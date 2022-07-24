import { Currency } from '../../../../../components/UI/Currency';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { ambToUSD } from '../../../../../utils/helpers';
import HeadInfo from 'components/HeadInfo';
import moment from 'moment';

const AtlasDetailsMiningStats = ({ atlas }: any) => {
  const available = atlas?.payPeriods?.available || 0;
  const forecast = atlas?.payPeriods?.current?.forecast || 0;
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const total_price_usd = appData?.total_price_usd ?? 0;

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
      {/* <HeadInfo data={itemSecond} className="head_info" />; */}
      {/* <div className="atlas_details_mining_stats">
        <div className="atlas_details_mining_stats_cells">
          <div className="atlas_details_mining_stats_fonts_normal universall_light1">
            AVAILABLE PAYOUT BALANCE
          </div>
          <div className="">
            <span className="atlas_details_mining_stats_fonts_bold">
              <Currency value={available} fixed={2} symbol="AMB" />
            </span>
            <span className="">
              {' '}
              /
              <Currency value={usdAvailable} fixed={2} side="left" />
            </span>
          </div>
        </div>
        <div className="atlas_details_mining_stats_cells">
          <div className="atlas_details_mining_stats_fonts_normal universall_light1">
            FORECASTED REVENUE
          </div>
          <div className="">
            <span className="atlas_details_mining_stats_fonts_bold">
              <Currency value={forecast} fixed={2} symbol="AMB" />
            </span>
            <span className="">
              {' '}
              /
              <Currency value={usdForecast} fixed={2} side="left" />
            </span>
          </div>
        </div>
        <div className="atlas_details_mining_stats_cells">
          <div className="atlas_details_mining_stats_fonts_normal universall_light1">
            NEXT PAYOUT DATE
          </div>
          <div className="">
            <span className="atlas_details_mining_stats_fonts_bold">
              {moment(nextPayDay('1970-01-01')).format('DD/MM/YYYY')}
            </span>
          </div>
        </div>
        <div className="atlas_details_mining_stats_cells">
          <div className="atlas_details_mining_stats_fonts_normal universall_light1">
            TOTAL BUNDLES
          </div>
          <div className="atlas_details_mining_stats_fonts_bold">
            {totalBundles}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AtlasDetailsMiningStats;
