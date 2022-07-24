import { Currency } from '../../../../../components/UI/Currency';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { ambToUSD, statusMessage } from '../../../../../utils/helpers';
import React from 'react';

const ApolloDetailsBalance = ({ apollo }: any) => {
  const { balance, stake, version } = apollo || {};
  const ambBalance = balance?.ether || 0;
  const ambStake = stake?.ether || 0;
  const { data: appData } = useTypedSelector((state: any) => state?.app);
  console.log(appData);

  const { total_price_usd } = appData?.tokenInfo || 0;

  const usdBalance = ambToUSD(ambBalance, total_price_usd);
  const usdStake = ambToUSD(ambStake, total_price_usd);

  return (
    <div className="apollo_details_balance">
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          BALANCE
        </div>
        <div className="apollo_details_balance_cell">
          <span className="apollo_details_balance_fonts_bold">
            <Currency value={ambBalance || 0} symbol="AMB" fixed={2} />
          </span>
          <span className="">
            {' '}
            /
            <Currency value={usdBalance} symbol="$" side="left" fixed={2} />
          </span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          UPTIME
        </div>
        <div className="apollo_details_balance_online">
          {statusMessage(
            apollo?.state ? apollo : { state: '' },
            'ApolloDetails',
          )}
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          STAKE
        </div>
        <div className="apollo_details_balance_cell">
          <span className="apollo_details_balance_fonts_bold">
            {' '}
            <Currency value={ambStake} symbol="AMB" fixed={2} />{' '}
          </span>
          <span className="">
            {' '}
            /
            <Currency value={usdStake} symbol="$" side="left" fixed={2} />
          </span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          SOFTWARE
        </div>
        <div className="apollo_details_balance_fonts_bold">{version}</div>
      </div>
    </div>
  );
};

export default ApolloDetailsBalance;
