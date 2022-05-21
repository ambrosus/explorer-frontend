import LatestTransactions from 'pages/Home/components/LastestTransactions';
import LatestBlocks from 'pages/Home/components/LatestBlocks';
import { BlocksContentProps } from 'pages/Home/home.interfaces';
import React, { FC } from 'react';

const BlocksContent: FC<BlocksContentProps> = ({ data }) => {
  return (
    <div className="blocks_content">
      <div className="blocks_content_table">
        <div className="blocks_content_heading">Lastest Blocks</div>
        {data?.latestBlocks.map((item, index: any) => (
          <LatestBlocks
            key={item.number}
            number={item.number}
            index={index}
            timestamp={item.timestamp}
            validator={item?.miner}
            totalTransactions={item.totalTransactions}
            blockReward={item?.blockRewards}
            name="name"
          />
        ))}
      </div>

      <div className="blocks_content_table">
        <div className="blocks_content_heading">Lastest Transactions</div>
        {data?.latestTransactions.map((item) => (
          <LatestTransactions
            key={item._id}
            status={item.status}
            hash={item.hash}
            timestamp={item.timestamp}
            from={item.from}
            to={item.to}
            amount={item?.value?.ether}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default BlocksContent;
