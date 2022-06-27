import { CustomTooltipProps } from '../../pages/Home/home.interfaces';
import React from 'react';

//TODO when backend will be
export const CustomTooltip = ({
  payload,
  label,
  active,
}: CustomTooltipProps) => {
  if (active) {
    return (
      <div className="chart_custom_tooltip">
        <p className="chart_intro">{label}</p>
        <p className="chart_label">
          <span className="chart_label_name">Date :</span>{' '}
          <span>{`${payload[0].payload?.date}`}</span>
        </p>
        <p className="chart_label">
          <span className="chart_label_name">Transactions :</span>
          <span>{`${payload[0].payload?.count}`}</span>
        </p>
      </div>
    );
  }

  return null;
};
