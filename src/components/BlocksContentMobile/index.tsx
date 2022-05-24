import LatestTransactions from 'pages/Home/components/LastestTransactions';
import LatestBlocks from 'pages/Home/components/LatestBlocks';
import { BlocksContentProps } from 'pages/Home/home.interfaces';
import React, { FC, useState } from 'react';

const BlocksContentMobile: FC<BlocksContentProps> = ({ data }) => {
  const [index, setIndex] = useState<number>(1);

  return (
    <div className="blocks_content_mobile">
      <div className="blocks_content_mobile_table">
        <div className="blocks_content_mobile_head">
          <button
            className={`blocks_content_mobile_heading ${
              index === 1 ? 'blocks_content_mobile_active' : ''
            }`}
            onClick={() => setIndex(1)}
          >
            Lastest Blocks
          </button>
          <button
            className={`blocks_content_mobile_heading ${
              index === 2 ? 'blocks_content_mobile_active' : ''
            }`}
            onClick={() => setIndex(2)}
          >
            Lastest Transactions
          </button>
        </div>
        {index === 1 ? (
          <>
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
          </>
        ) : null}
        {index === 2 ? (
          <>
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BlocksContentMobile;
