import React, { memo } from 'react';

const EventModal = ({ type, name, value, indexed }: any) => {
  return (
    <div className="contract_events-body-modal-cell">
      <div>{`${type} ${name}`}</div>
      <div className="contract_events-body-modal-address">
        {indexed ? value : value.toString()}
      </div>
    </div>
  );
};

export default memo(EventModal);
