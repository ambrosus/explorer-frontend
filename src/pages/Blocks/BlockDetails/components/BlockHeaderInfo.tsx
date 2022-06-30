import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Number } from 'components/Number';
import moment from 'moment';
import React from 'react';

const BlockHeaderInfo = ({ block }: any) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { number, blockRewards, totalTransactions, size, timestamp } =
    block !== null && block !== undefined && block;
  const txCount = blockRewards?.length + totalTransactions || 0;
  const { lastBlock } = appData?.netInfo ?? {
    lastBlock: {
      number: 0,
    },
  };
  const confirmations = lastBlock.number - number ?? 0;

  const blockStatus = (confirmations: any) => {
    return confirmations > 0 ? 'Confirmed' : 'Unconfirmed';
  };
  return (
    <div className="main_info_block">
      <div className="main_info_block_table row-table">
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">Status</span>
          <span
            className="main_info_block_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {blockStatus(confirmations)}
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
