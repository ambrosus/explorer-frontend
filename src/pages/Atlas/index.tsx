import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import React from 'react';

export const Atlas = () => {
  const [sortTerm, setSortTerm] = React.useState<string>('balance');

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
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
