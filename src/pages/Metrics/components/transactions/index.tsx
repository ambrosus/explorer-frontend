import FilterByRange from '../filter-by-range';
import ChartTransaction from './chart-transaction';
import { useState } from 'react';

const Transactions = () => {
  const stateFilter = useState<string>('3months');

  return (
    <div id="transactions" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between md:items-center">
        <h4 className="leading-8 text-xl md:text-2xl">Transactions</h4>
        <FilterByRange filter={stateFilter} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-5">
        <ChartTransaction
          title="LST staking transactions"
          endPoint="stakingTxHarbor"
          filter={stateFilter}
        />
        <ChartTransaction
          title="Dex transactions"
          endPoint="txNumberDex"
          filter={stateFilter}
        />
        <ChartTransaction
          title="Overall chain transactions"
          endPoint="transactions"
          filter={stateFilter}
        />
      </div>
    </div>
  );
};

export default Transactions;
