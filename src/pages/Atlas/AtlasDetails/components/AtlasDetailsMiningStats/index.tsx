import { Currency } from '../../../../../components/UI/Currency';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { ambToUSD } from '../../../../../utils/helpers';
import moment from 'moment';

const AtlasDetailsMiningStats = ({ atlas }: any) => {
  const { totalBundles, payPeriods } = atlas !== null && atlas;
  const bundles = totalBundles || 0;
  const available = payPeriods?.available || 0;
  const forecast = payPeriods?.current?.forecast || 0;
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const { price_usd } = (appData && appData?.tokenInfo) || 0;

  const usdForecast = ambToUSD(forecast, price_usd);
  const usdAvailable = ambToUSD(available, price_usd);
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
  return (
    <div className="atlas_details_mining_stats">
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
          Total bundles
        </div>
        <div className="atlas_details_mining_stats_fonts_bold">{bundles}</div>
      </div>
    </div>
  );
};

export default AtlasDetailsMiningStats;
