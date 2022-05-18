import BlocksBody from 'components/Blocks/BlocksBody';
import BlocksHeader from 'components/Blocks/BlocksHeader';
import { Content } from 'components/Content';
import React, { useEffect } from 'react';

export const Apollo = () => {
  useEffect(() => {
    fetch(
      `https://blockbook.ambrosus.io/api/v2/address/0xB500558a3886ecf07B4B4B31B54c4bd1ef378D34`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);
  const num = 6;
  return (
    <Content>
      <Content.Header>
        <h1>Apollo</h1>
      </Content.Header>
      <Content.Body>
        <div
          className="blocks"
          style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
        >
          <BlocksHeader />
          <BlocksBody />
          <BlocksBody />
          <BlocksBody />
          <BlocksBody />
          <BlocksBody />
          <BlocksBody />
          <BlocksBody />
        </div>
      </Content.Body>
    </Content>
  );
};
