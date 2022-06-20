import { Currency } from '../../../../../components/UI/Currency';
import moment from 'moment';
import React from 'react';
import { sliceData5 } from 'utils/helpers';

const BlockBody = ({ lastCardRef, item }: any) => {
  const { type, blockHash, from, to, timestamp, value } = item;
  const amount = value?.ether || 0;
  return (
    <div className="block_body" ref={lastCardRef}>
      <div className="block_body_cell">{sliceData5(blockHash)}</div>
      <div className="block_body_cell">{type}</div>
      <div className="block_body_cell">{sliceData5(from)} </div>
      <div className="block_body_cell">{sliceData5(to)}</div>
      <div className="block_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="block_body_cell">
        <Currency value={amount} symbol="AMB" fixed={2} />
      </div>
    </div>
  );
};

export default BlockBody;
