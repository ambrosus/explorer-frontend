import HeadInfo from 'components/HeadInfo';
import { Number } from 'components/Number';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import React from 'react';

const BlockHeaderInfo = ({ block }: any) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const {
    number,
    blockRewards = 0,
    totalTransactions = 0,
    size = 0,
    timestamp = 0,
  } = block || 0;

  const txCount = blockRewards?.length + totalTransactions || 0;
  const { lastBlock } = appData?.netInfo || 0;
  const confirmations = lastBlock?.number - number;

  const blockStatus = (confirmations: any) => {
    return confirmations > 0 ? 'Confirmed' : 'Unconfirmed';
  };

  const itemFirst: any = [
    {
      name: 'STATUS',
      value: blockStatus(confirmations),
      style: {
        color: '#1acd8c',
      },
    },
    {
      name: 'CONFIRMATIONS',
      value: confirmations < 0 ? 0 : confirmations || 0,
    },
    {
      name: 'TXS IN THIS BLOCK',
      value: txCount,
    },
    {
      name: 'SIZE',
      value: size,
    },
    {
      name: 'CREATED',
      value: moment(timestamp * 1000).fromNow(),
    },
  ];
  return (
    <>
      <HeadInfo data={itemFirst} className="head_info" />
    </>
    // <div className="main_info_blocks_blocks">
    //   <div className="main_info_blocks_blocks_table">
    //     <div className="main_info_blocks_blocks_cell">
    //       <span className="main_info_block_cell_primary">Status</span>
    //       <span
    //         className="main_info_block_cell_secondary"
    //         style={{
    //           color: '#1acd8c',
    //         }}
    //       >
    //         {blockStatus(confirmations)}
    //       </span>
    //     </div>
    //     <div className="main_info_blocks_blocks_cell">
    //       <span className="main_info_block_cell_primary">CONFIRMATIONS</span>
    //       <span className="main_info_block_cell_secondary">
    //         <Number value={confirmations < 0 ? 0 : confirmations || 0} />
    //       </span>
    //     </div>

    //     <div className="main_info_blocks_blocks_cell">
    //       <span className="main_info_block_cell_primary">
    //         TXS IN THIS BLOCK
    //       </span>
    //       <span className="main_info_block_cell_secondary">{txCount}</span>
    //     </div>
    //     <div className="main_info_blocks_blocks_cell">
    //       <span className="main_info_block_cell_primary">SIZE</span>
    //       <span className="main_info_block_cell_secondary">{size ?? 0}</span>
    //     </div>
    //     <div className="main_info_blocks_blocks_cell">
    //       <span className="main_info_block_cell_primary">CREATED</span>
    //       <span className="main_info_block_cell_secondary">
    //         {moment(timestamp * 1000).fromNow()}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BlockHeaderInfo;
