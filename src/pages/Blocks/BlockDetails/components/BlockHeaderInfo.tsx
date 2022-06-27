import { IBlock } from '../index';
import { Number } from 'components/Number';
import moment from 'moment';
import React from 'react';

interface IBlockInfoProps<T> {
  lastBlock: {
    number: number;
  };
  block: T;
}

const BlockHeaderInfo = ({
  lastBlock,
  block,
}: IBlockInfoProps<IBlock[] | any>) => {
  const { number, blockRewards, totalTransactions, size, timestamp } =
    block !== null && block !== undefined && block;

  const txCount = blockRewards?.length + totalTransactions || 0;

  const confirmations: number = lastBlock.number - number ?? 0;

  const blockStatus = (confirmations: number) => {
    return confirmations > 0 ? 'Confirmed' : 'Unconfirmed';
  };

  return (
    <div className="main_info_block">
      <div className="main_info_block_table">
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">Status</span>
          <span
            className="main_info_block_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {blockStatus(confirmations as number)}
          </span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">CONFIRMATIONS</span>
          <span className="main_info_block_cell_secondary">
            <Number value={confirmations < 0 ? 0 : confirmations} />
          </span>
        </div>

        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">
            TXS IN THIS BLOCK
          </span>
          <span className="main_info_block_cell_secondary">{txCount}</span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">SIZE</span>
          <span className="main_info_block_cell_secondary">{size ?? 0}</span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">CREATED</span>
          <span className="main_info_block_cell_secondary">
            {moment(timestamp * 1000).fromNow() ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlockHeaderInfo;
