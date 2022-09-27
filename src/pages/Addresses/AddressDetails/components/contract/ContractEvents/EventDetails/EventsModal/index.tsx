import React, { memo } from 'react';

const EventModal = ({ type, name, value, indexed }: any) => {
  const uint256Style = indexed && 'universall_light2';
  return (
    <div className="contract_events-body-modal-cell">
      <div className="contract_events-body-modal-heading">{`${type} ${name}`}</div>
      <div className={`contract_events-body-modal-address ${uint256Style}`}>
        {value.toString()}
      </div>
    </div>
  );
};

export default memo(EventModal);
