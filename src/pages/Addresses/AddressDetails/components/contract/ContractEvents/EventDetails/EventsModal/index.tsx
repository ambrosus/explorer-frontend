import React, { memo } from 'react';

const EventModal = ({ type, name, value, indexed }: any) => {
  return (
    <div className="contract_events-body-modal-cell">
      <div
        style={{ display: 'flex', alignItems: 'center' }}
      >{`${type} ${name}`}</div>
      <div className="contract_events-body-modal-address">
        {value.toString()}
      </div>
    </div>
  );
};

export default memo(EventModal);
