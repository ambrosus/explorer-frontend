import { useTypedSelector } from '../../hooks/useTypedSelector';
import LatestTransactions from 'pages/Home/components/LastestTransactions';
import LatestBlocks from 'pages/Home/components/LatestBlocks';
import { BlocksContentProps } from 'pages/Home/home.interfaces';
import React, { FC } from 'react';

const BlocksContent: FC<BlocksContentProps> = ({ data }) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  return (
    <div className="blocks_content">
      <div className="blocks_content_table">
        <div className="blocks_content_heading">Latest Blocks</div>
        {data?.latestBlocks.length > 0 && (
          <table>
            <tbody>
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
                  lastBlock={appData.netInfo.lastBlock.number}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="blocks_content_table">
        <div className="blocks_content_heading">Latest Transactions</div>
        {data?.latestTransactions.length > 0 && (
          <table>
            <tbody>
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
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlocksContent;
