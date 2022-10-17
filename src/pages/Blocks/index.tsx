import { useActions } from '../../hooks/useActions';
import { numberWithCommas } from '../../utils/helpers';
import TabsNew from '../Transactions/components/TabsNew';
import BlocksBody from './components/BlocksBody';
import BlocksHeader from './components/BlocksHeader';
import API from 'API/api';
import API2 from 'API/newApi';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { memo, useEffect } from 'react';

export const Blocks = memo(() => {
  const { setAppDataAsync } = useActions();

  const { data: appData } = useTypedSelector((state: any) => state.app);
  const total = appData?.netInfo?.lastBlock?.number || 0;
  const avgBlockTime = appData?.netInfo?.avgBlockTime || 0;
  const avgBlockSize = appData?.netInfo?.avgBlockSize || 0;
  const avgBlockGasUsed = appData?.netInfo?.avgBlockGasUsed || 0;
  const avgNectarPerc = `(${(
    (appData?.netInfo?.avgBlockGasUsed / appData?.netInfo?.avgBlockGasLimit ||
      0) * 100
  ).toFixed(2)}%)`;

  useEffect(() => {
    const interval = setInterval(() => {
      setAppDataAsync();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: numberWithCommas(total),
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
      value: `${numberWithCommas(avgBlockGasUsed.toFixed(1))} ${avgNectarPerc}`,
    },
  ];

  useEffect(() => {
    API2.getBlocks().then((res) => console.log(res));
  }, []);

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
            fetchData={API2.getBlocks}
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
});
