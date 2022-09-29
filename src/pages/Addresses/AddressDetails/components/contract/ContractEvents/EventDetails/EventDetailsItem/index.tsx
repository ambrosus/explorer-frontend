import React, { memo } from 'react';

const EventDetailsItem = ({ input, index, lastIndex }: any) => {
  return (
    <div>
      {index === 0 && '( '}
      <span className="universall_ibm">
        {input.indexed && `index_topic_${index + 1} `}
      </span>

      <span className="universall_semibold universall_green universall_ibm">
        {`${input.type} `}
      </span>
      <span className="universall_semibold universall_red universall_ibm">
        {`${input.name}`}
        {input.indexed && ', '}
      </span>
      {index === lastIndex && ' )'}
    </div>
  );
};

export default memo(EventDetailsItem);
