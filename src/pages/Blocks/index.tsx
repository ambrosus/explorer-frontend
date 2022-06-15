import useSortData from '../../hooks/useSortData';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import React from 'react';
import BlocksBody from './components/BlocksBody';
import MainInfoBlocks from "./components/MainInfoBlocks";
import BlocksHeader from "./components/BlocksHeader";
import {getBlocksData} from "../../services/block.service";
import BlocksSort from "./components/BlocksSort";

export const Blocks = () => {
  const { ref, renderData, loading } = useSortData(
    getBlocksData,
    null,
    'totalBundles',
  );

  return (
    <Content>
      <Content.Header>
        <MainInfoBlocks />
      </Content.Header>
      <Content.Body>
        <div className="atlas_main">
          <BlocksSort />
          <div className="atlas_main_table">
            <BlocksHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) =>
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext ? (
                    <BlocksBody
                      lastCardRef={ref}
                      key={index}
                      item={item}
                    />
                  ) : (
                    <BlocksBody
                      key={index}
                      item={item}
                    />
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
