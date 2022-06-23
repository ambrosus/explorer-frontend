import useSortData from '../../hooks/useSortData';
import { getBlocksData } from '../../services/block.service';
import BlocksBody from './components/BlocksBody';
import BlocksHeader from './components/BlocksHeader';
import BlocksSort from './components/DataTitle';
import DataTitle from './components/DataTitle';
import MainInfoBlocks from './components/MainInfoBlocks';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import React from 'react';

export const Blocks = () => {
  const { ref, renderData, loading } = useSortData(
    getBlocksData,
    null,
    'totalBundles',
  );
  return (
    <Content>
      <Content.Header>
        <div className="block_main_title">
          <h1 className="main_info_blocks_heading">Blocks</h1>
        </div>
        <MainInfoBlocks />
      </Content.Header>
      <Content.Body>
        <div className="blocks_main">
          <DataTitle title="Blocks" />
          <div className="blocks_main_table">
            <BlocksHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) =>
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext ? (
                    <BlocksBody
                      index={index}
                      lastCardRef={ref}
                      key={index}
                      item={item}
                    />
                  ) : (
                    <BlocksBody index={index} key={index} item={item} />
                  ),
                )
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
