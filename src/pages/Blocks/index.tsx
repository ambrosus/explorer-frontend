import React from 'react';
import BlocksBody from './components/BlocksBody';
import BlocksHeader from './components/BlocksHeader';
import { Content } from 'components/Content';
import API from "../../API/api";
import TabsNew from "../Transactions/components/TabsNew";
import { useTypedSelector } from 'hooks/useTypedSelector';
import HeadInfo from 'components/HeadInfo';

export const Blocks = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const total = appData?.netInfo?.lastBlock?.number || 0;
  const avgBlockTime = appData?.netInfo?.avgBlockTime || 0;
  const avgBlockSize = appData?.netInfo?.avgBlockSize || 0;
  const avgBlockGasUsed = appData?.netInfo?.avgBlockGasUsed || 0;
  const avgNectarPerc = `(${(
    (appData?.netInfo?.avgBlockGasUsed / appData?.netInfo?.avgBlockGasLimit ||
      0) * 100
  ).toFixed(2)}%)`;

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: total,
    },
    {
      name: 'AVG. BLOCK SIZE',
      value: `${avgBlockSize.toFixed(1)} Bytes`,
    },
    {
      name: 'AVG. BLOCK TIME',
      value: `${avgBlockTime.toFixed(1)} sec`,
    },
    {
      name: 'AVG. NECTAR USED',
      value: `${avgBlockGasUsed.toFixed(1)} ${avgNectarPerc}`,
    },
  ];

  return (
    <Content>
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
            fetchParams={{ page: '' }}
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
};
