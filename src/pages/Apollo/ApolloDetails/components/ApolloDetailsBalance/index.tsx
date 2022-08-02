import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import { ambToUSD, statusMessage } from 'utils/helpers';

const ApolloDetailsHead = ({ apollo }: any) => {
  const ambBalance = apollo?.balance?.ether || 0;
  const ambStake = apollo?.stake?.ether || 0;

  const { data: appData } = useTypedSelector((state: any) => state?.app);
  const { total_price_usd } = appData?.tokenInfo || 0;

  const usdBalance = +ambToUSD(ambBalance, total_price_usd);
  const usdStake = +ambToUSD(ambStake, total_price_usd);

  const itemFirst: any = [
    {
      name: 'BALANCE',
      value: `${ambBalance.toFixed(2)} AMB / $ ${usdBalance.toFixed(2)}`,
    },
    {
      name: 'UPTIME',
      value: statusMessage(
        apollo?.state ? apollo : { state: '' },
        'ApolloDetails',
      ),
      style: {
        color: '#1acd8c',
      },
    },
    {
      name: 'STAKE',
      value: `${ambStake.toFixed(2)} AMB / $ ${usdStake.toFixed(2)}`,
    },
    {
      name: 'SOFTWARE',
      value: apollo?.version,
    },
  ];

  return <HeadInfo data={itemFirst} className="head_info" />;
};

export default ApolloDetailsHead;
