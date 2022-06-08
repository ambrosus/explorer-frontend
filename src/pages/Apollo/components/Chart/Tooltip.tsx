import { CustomTooltipProps } from '../../../Home/home.interfaces';
import React from 'react';

export const CustomTooltip = ({
  payload,
  label,
  active,
}: CustomTooltipProps) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: '#FFFFFF',
          border: '1px solid #F4F5F6',
          opacity: 0.96,
          filter: 'drop-shadow(0px 4px 12px rgba(74, 56, 174, 0.15))',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRadius: '2px',
          width: '200px',
          fontSize: '14px',
          color: '#333',
        }}
      >
        <p className="intro">{payload?.[0]?.payload?.date}</p>
        <p className="label">
          <span className="label-name">Date :</span>{' '}
          <span>{`${payload?.[0]?.payload?.date}`}</span>
        </p>
        <p className="label">
          <span className="label-name">Nodes Online :</span>
          <span>{`${payload?.[0]?.payload?.count}`}</span>
        </p>
      </div>
    );
  }

  return null;
};
