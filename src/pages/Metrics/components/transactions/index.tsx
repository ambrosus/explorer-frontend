import FilterByRange from '../filter-by-range';
import ChartTransaction from './chart-transaction';
import { useState } from 'react';

const Transactions = () => {
  const stateFilter = useState<string>('3months');

  return (
    <>
      <div id="transactions" className="flex flex-col gap-y-6">
        <div className="flex justify-between items-center">
          <h4 className="leading-8">Transactions</h4>
          <FilterByRange filter={stateFilter} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          <ChartTransaction
            title="Harbor Transactions"
            endPoint="stakingTxHarbor"
            filter={stateFilter}
          />
          <ChartTransaction
            title="Astra Transactions"
            endPoint="txNumberDex"
            filter={stateFilter}
          />
          <ChartTransaction
            title="Overall Chain Transactions"
            endPoint="transactions"
            filter={stateFilter}
          />
        </div>
      </div>
      <hr className="my-6 border-neutral-500" />
    </>
  );
};

export default Transactions;
