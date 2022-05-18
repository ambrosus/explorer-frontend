import LatestTransactions from 'components/LastestTransactions';
import LatestBlocks from 'components/LatestBlocks';
import { BlocksContentProps } from 'pages/Home/home.interfaces';
import React, { FC } from 'react';

const BlocksContent: FC<BlocksContentProps> = ({ data }) => {
  return (
    <div className="home__table">
      <div className="home__content">
        <div className="latestBlocks__heading">Lastest Blocks</div>
        <div className="latestBlocks__body">
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
          {/*<ViewMoreBtn nameBtn="View all blocks" />*/}
        </div>
      </div>

      <div className="home__content">
        <div className="latestBlocks__heading">Lastest Transactions</div>
        <div className="latestBlocks__body">
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
          {/*<ViewMoreBtn nameBtn="View all transactions" />*/}
        </div>
      </div>
    </div>
  );
};

export default BlocksContent;
