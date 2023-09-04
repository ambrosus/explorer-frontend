import { memo } from 'react';

const Spinner = ({ className = '' }) => {
  return <div className={`spinner ${className}`}></div>;
};

export default memo(Spinner);
