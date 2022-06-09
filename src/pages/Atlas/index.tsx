import useSortData from '../../hooks/useSortData';
import { getAtlasData } from '../../services/atlas.service';
import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import React from 'react';

export const Atlas = () => {
  const { ref, sortTerm, setSortTerm, renderData, loading } =
    useSortData(getAtlasData,null,'balance');

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
              ? renderData.data.map((item: any, index: number) => {
                  return renderData.data.length - 1 === index ? (
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
                  );
                })
              : null}
          </div>
          {!loading && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
