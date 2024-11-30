import FilterByRange from '../filter-by-range';
import ChartTotalValueLocked from './chart-total-value-locked';
import { useState } from 'react';

const TotalValueLocked = () => {
  const stateFilter = useState<string>('3months');

  return (
    <div id="tvl" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between md:items-center">
        <h4 className="leading-8 text-xl md:text-2xl">Total Value Locked</h4>
        <FilterByRange filter={stateFilter} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        <ChartTotalValueLocked
          title="Staking TVL"
          endPoint="tvlStaking"
          filter={stateFilter}
        />
        <ChartTotalValueLocked
          title="Nodes TVL"
          endPoint="tvlApollo"
          filter={stateFilter}
        />
        <ChartTotalValueLocked
          title="ASTRA TVL"
          endPoint="tvlDex"
          filter={stateFilter}
        />
        <ChartTotalValueLocked
          title="Overall TVL"
          endPoint="tvl"
          filter={stateFilter}
        />
      </div>
    </div>
  );
};

export default TotalValueLocked;
