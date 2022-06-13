import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
import {ambToUSD} from "../../../../../utils/helpers";
import {Currency} from "../../../../../components/UI/Currency";
import Loader from "../../../../../components/Loader";

const AtlasDetailsBalance = ({atlas}: any) => {
  const {data: appData} = useTypedSelector((state: any) => state.app);
  const {balance, stake, url} = atlas !== null && atlas
  const ambBalance = balance?.ether || 0;
  const ambStake = stake?.ether || 0;
  const {price_usd} = appData && appData?.tokenInfo || 0
  const usdBalance = ambToUSD(ambBalance, price_usd);
  const usdStake = ambToUSD(ambStake, price_usd);

  return atlas !== null ? (
    <div className="atlas_details_balance">
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          BALANCE
        </div>
        <div className="atlas_details_balance_cell">
          <span className="atlas_details_balance_fonts_bold">
                      <Currency value={ambBalance || 0} symbol='AMB' fixed={2}/>
          </span>
          <span className=""> /
            <Currency value={usdBalance} symbol='$' side='left' fixed={2}/>
          </span>
        </div>
      </div>
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          STAKE
        </div>
        <div className="atlas_details_balance_cell">
          <span className="atlas_details_balance_fonts_bold">
             <Currency
              value={ambStake}
              symbol='AMB'
              fixed={2}
            />{' '}

          </span>
          <span className=""> /
            <Currency value={usdStake} symbol='$' side='left' fixed={2}/>
          </span>
        </div>
      </div>
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          URL
        </div>
        <div className="atlas_details_balance_fonts_bold">{url}</div>
      </div>
    </div>
  ) : <Loader/>
};

export default AtlasDetailsBalance;
