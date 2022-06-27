import useSortData from '../../hooks/useSortData';
import { getAtlasesData } from '../../services/atlas.service';
import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import React from 'react';

export const Atlas = () => {
  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAtlasesData,
    'totalBundles',
  );

  return (
    <Content>
      <Content.Header>
        <MainInfoAtlas />
      </Content.Header>
      <Content.Body>
        <div className="atlas_main">
          <AtlasBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
          <div className="atlas_main_table">
            <AtlasBlocksHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) =>
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext ? (
                    <AtlasBlocksBody
                      lastCardRef={ref}
                      key={index}
                      index={index + 1}
                      item={item}
                    />
                  ) : (
                    <AtlasBlocksBody
                      key={index}
                      index={index + 1}
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
