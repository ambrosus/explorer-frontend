import { NumberType, useFormatter } from '../../../../utils/formatNumbers';
import { useGetTotalMetrics } from '../../lib/hooks/use-get-total-metrics';
import ListItem from './list-item';
import API2 from 'API/newApi';
import { useState, useEffect } from 'react';

const ActiveList = () => {
  const { data, isLoading } = useGetTotalMetrics();
  const { formatNumber } = useFormatter();
  const [txData, setTxData] = useState<any>(null);

  useEffect(() => {
    API2.getInfo().then((res) => setTxData(res));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 sm:gap-5 md:place-items-center">
        <ListItem
          title="Total Users"
          value={formatNumber({
            input: data ? data.totalUsers : 0,
            type: NumberType.WholeNumber,
          })}
          isMultiline={false}
          tooltipText="The total number of wallet addresses created on the network."
          isLoading={isLoading}
        />
        <ListItem
          title="Active Users"
          value={formatNumber({
            input: data ? data.activeUsers1Month : 0,
            type: NumberType.WholeNumber,
          })}
          isMultiline={true}
          tooltipText="The number of unique wallet addresses that interacted with the <br/> network in the selected time period."
          isLoading={isLoading}
        />
        <ListItem
          title="Total Transactions"
          value={formatNumber({
            input: txData?.data.transactions?.total
              ? txData?.data.transactions?.total
              : 0,
            type: NumberType.WholeNumber,
          })}
          isMultiline={false}
          tooltipText="The total number of transactions recorded on the network."
          isLoading={isLoading}
        />
        <ListItem
          title="Total Value Locked"
          value={formatNumber({
            input: data ? data.totalValueLocked : 0,
            type: NumberType.FiatTokenPrice,
          })}
          isMultiline={true}
          tooltipText="The total value of assets currently locked in the <br/> network’s smart contracts."
          isLoading={isLoading}
        />
      </div>
      <hr className="my-6 border-neutral-500" />
    </>
  );
};

export default ActiveList;
