import React from 'react';
import BlocksBody from './components/BlocksBody';
import BlocksHeader from './components/BlocksHeader';
import MainInfoBlocks from './components/MainInfoBlocks';
import { Content } from 'components/Content';
import API from "../../API/api";
import TabsNew from "../Transactions/components/TabsNew";

export const Blocks = () => {
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
