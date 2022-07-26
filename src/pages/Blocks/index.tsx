import useSortData from '../../hooks/useSortData';
import { getBlocksData } from '../../services/block.service';
import BlocksBody from './components/BlocksBody';
import BlocksHeader from './components/BlocksHeader';
import DataTitle from './components/DataTitle';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import Loader from 'components/Loader';
import { useTypedSelector } from 'hooks/useTypedSelector';

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

  const { ref, renderData, loading } = useSortData(
    getBlocksData,
    'totalBundles',
  );

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
          <DataTitle title="Blocks" />
          <div className="blocks_main_table">
            <BlocksHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) => (
                  <BlocksBody
                    index={index + 1}
                    lastCardRef={
                      renderData.data.length - 1 === index &&
                      renderData?.pagination?.hasNext
                        ? ref
                        : undefined
                    }
                    key={index}
                    item={item}
                  />
                ))
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
