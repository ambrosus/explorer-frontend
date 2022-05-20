import LatestTransactions from 'pages/Home/components/LastestTransactions';
import LatestBlocks from 'pages/Home/components/LatestBlocks';
import { BlocksContentProps } from 'pages/Home/home.interfaces';
import React, { FC, useState } from 'react';

const BlocksContentMobile: FC<BlocksContentProps> = ({ data }) => {
  const [index, setIndex] = useState<number>(1);

  return (
    <div className="home__table">
      <div className="home__content">
        <div className="latestBlocks__head">
          <button
            className={`latestBlocks__mobile-heading ${
              index === 1 ? 'latestBlocks__mobile-active' : ''
            }`}
            onClick={() => setIndex(1)}
          >
            Lastest Blocks
          </button>
          <button
            className={`latestBlocks__mobile-heading ${
              index === 2 ? 'latestBlocks__mobile-active' : ''
            }`}
            onClick={() => setIndex(2)}
          >
            Lastest Transactions
          </button>
        </div>
        {index === 1 ? (
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
          </div>
        ) : null}
        {index === 2 ? (
          <div className="home__content">
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
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BlocksContentMobile;
