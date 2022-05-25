import { useTypedSelector } from '../../hooks/useTypedSelector';
import React from 'react';

const Chart = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  return (
    <div className="chart">
      <div className="chart_activity">
        <div className="chart_header_title">BUNDLES ACTIVITY</div>
        <div className="chart_body">{appData?.netInfo?.bundlesActivity}</div>
        <div className="chart_days">Last 24 hours</div>
      </div>
    </div>
  );
};

export default Chart;
