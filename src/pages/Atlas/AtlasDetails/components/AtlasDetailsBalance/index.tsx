import { Currency } from '../../../../../components/UI/Currency';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { ambToUSD } from '../../../../../utils/helpers';

const AtlasDetailsBalance = ({ atlas }: any) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { balance, stake, url } = atlas !== null && atlas;
  const ambBalance = balance?.ether || 0;
  const ambStake = stake?.ether || 0;
  const total_price_usd = appData?.total_price_usd ?? 0;
  const usdBalance = ambToUSD(ambBalance, total_price_usd);
  const usdStake = ambToUSD(ambStake, total_price_usd);

  return (
    <div className="atlas_details_balance">
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          BALANCE
        </div>
        <div className="atlas_details_balance_cell">
          <span className="atlas_details_balance_fonts_bold">
            <Currency value={ambBalance || 0} symbol="AMB" fixed={2} />
          </span>
          <span className="">
            {' '}
            /
            <Currency value={usdBalance} symbol="$" side="left" fixed={2} />
          </span>
        </div>
      </div>
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          STAKE
        </div>
        <div className="atlas_details_balance_cell">
          <span className="atlas_details_balance_fonts_bold">
            <Currency value={ambStake} symbol="AMB" fixed={2} />{' '}
          </span>
          <span className="">
            {' '}
            /
            <Currency value={usdStake} symbol="$" side="left" fixed={2} />
          </span>
        </div>
      </div>
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          URL
        </div>
        <a
          className="atlas_details_balance_fonts_bold"
          rel="noreferrer"
          target="_blank"
          href={url}
        >
          {url}
        </a>
      </div>
    </div>
  );
};

export default AtlasDetailsBalance;
