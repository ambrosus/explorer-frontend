import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import React from 'react';

export const Atlas = () => {
  const [sortTerm, setSortTerm] = React.useState<string>('balance');

  const num = 6;

  return (
    <Content>
      <Content.Header>
        <MainInfoAtlas />
      </Content.Header>
      <Content.Body>
        <div className="Atlas_main">
          <AtlasBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />

          <div
            className="Atlas_main_table"
            style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
          >
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
