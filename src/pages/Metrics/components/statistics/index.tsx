import { NumberType, useFormatter } from '../../../../utils/formatNumbers';
import { useGetTotalMetrics } from '../../lib/hooks/use-get-total-metrics';
import ListItem from './list-item';

interface PropsListItems {
  title: string;
  value: string;
  type: NumberType;
  isMultiline: boolean;
  tooltipText: string;
}

const listItems: PropsListItems[] = [
  {
    title: 'Total Users',
    value: 'totalUsers',
    type: NumberType.WholeNumber,
    isMultiline: false,
    tooltipText: 'The total number of wallet addresses created on the network.',
  },
  {
    title: 'Active Users',
    value: 'activeUsers1Month',
    type: NumberType.WholeNumber,
    isMultiline: true,
    tooltipText:
      'The number of unique wallet addresses that interacted with the <br/> network in the selected time period.',
  },
  {
    title: 'Total Transactions',
    value: 'transactions',
    type: NumberType.WholeNumber,
    isMultiline: false,
    tooltipText: 'The total number of transactions recorded on the network.',
  },
  {
    title: 'Total Value Locked',
    value: 'totalValueLocked',
    type: NumberType.FiatTokenPrice,
    isMultiline: true,
    tooltipText:
      'The total value of assets currently locked in the <br/> network’s smart contracts.',
  },
];

const ActiveList = () => {
  const { data, isLoading } = useGetTotalMetrics();
  const { formatNumber } = useFormatter();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 sm:gap-5 md:place-items-center">
        {listItems.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            value={formatNumber({
              input: data ? data[item.value] : 0,
              type: item.type,
            })}
            isMultiline={item.isMultiline}
            tooltipText={item.tooltipText}
            isLoading={isLoading}
          />
        ))}
      </div>
      <hr className="my-6 border-neutral-500" />
    </>
  );
};

export default ActiveList;
