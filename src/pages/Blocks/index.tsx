import React, { memo, useEffect, useState } from 'react';
import { numberWithCommas } from '../../utils/helpers';
import TabsNew from '../Transactions/components/TabsNew';
import BlocksBody from './components/BlocksBody';
import BlocksHeader from './components/BlocksHeader';
import API from 'API/api';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { Helmet } from 'react-helmet';

const fetchParams = { page: '' };

export const Blocks = memo(() => {
  const [blockData, setBlockData] = useState<any>(null);

  const avgNectarPerc = `(${(
    (blockData?.avgBlockGasUsed / blockData?.avgBlockGasLimit || 0) * 100
  ).toFixed(2)}%)`;

  useEffect(() => {
    const interval = setInterval(() => {
      API.getInfo().then((res) => setBlockData(res));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: numberWithCommas(blockData?.lastBlock.number),
    },
    {
      name: 'AVG. BLOCK SIZE',
      value: `${blockData?.avgBlockSize.toFixed(1)} Bytes`,
    },
    {
      name: 'AVG. BLOCK TIME',
      value: `${blockData?.avgBlockTime.toFixed(1)} sec`,
    },
    {
      name: 'AVG. NECTAR USED',
      value: `${numberWithCommas(
        blockData?.avgBlockGasUsed.toFixed(1),
      )} ${avgNectarPerc}`,
    },
  ];

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/blocks/" />
      </Helmet>
      <Content.Header>
        <div className="block_main_title">
          <h1 className="main_info_blocks_heading">Blocks</h1>
        </div>
        <HeadInfo data={itemFirst} className="head_info" />
      </Content.Header>
      <Content.Body>
        <div className="blocks_main">
          <TabsNew
            tableHeader={() => <BlocksHeader />}
            fetchData={API.getBlocks}
            fetchParams={fetchParams}
            label="Blocks"
            render={(list: any) =>
              list.map((el: any, index: any) => (
                <BlocksBody key={index} index={index + 1} item={el} />
              ))
            }
          />
        </div>
      </Content.Body>
    </Content>
  );
});
