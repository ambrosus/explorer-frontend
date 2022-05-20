import { useTypedSelector } from '../../hooks/useTypedSelector';
import React from 'react';

const Chart = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  return (
    <div className="bundles-activity">
      <div className="chart-header-title">BUNDLES ACTIVITY</div>
      <div className="bundlesActivity">{appData?.netInfo?.bundlesActivity}</div>
      <div className="days">Last 24 hours</div>
    </div>
  );
};

export default Chart;
