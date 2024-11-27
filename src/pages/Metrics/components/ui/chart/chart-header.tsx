import { ChartHeaderProps } from '../../../types';
import React from 'react';

const ChartHeader: React.FC<ChartHeaderProps> = ({ name, children }) => {
  return (
    <div className="flex items-center flex-1 justify-between mb-3">
      {name && (
        <h6 className="text-base text-black-600 leading-6 font-semibold">
          {name}
        </h6>
      )}
      {children && (
        <b className="text-sm leading-6 font-semibold text-neutral-400">
          {children}
        </b>
      )}
    </div>
  );
};

export default ChartHeader;
