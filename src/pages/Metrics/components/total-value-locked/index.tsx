import FilterByRange from '../filter-by-range';
import ChartTotalValueLocked from './chart-total-value-locked';
import { useState } from 'react';

const TotalValueLocked = () => {
  const stateFilter = useState<string>('3months');

  return (
    <div id="tvl" className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h4 className="leading-8">Total Value Locked</h4>
        <FilterByRange filter={stateFilter} />
      </div>
      <div className="grid grid-cols-2 gap-5">
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
