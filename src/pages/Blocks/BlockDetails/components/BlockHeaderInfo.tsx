import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { TParams } from '../../../../types';
import React from 'react';
import { useParams } from 'react-router-dom';

const BlockHeaderInfo = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { address }: TParams = useParams();

  return (
    <div className="main_info_block">
      <div className="main_info_block_table">
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">TOTAL NODES</span>
          <span className="main_info_block_cell_secondary">
            {appData?.netInfo?.apollos?.total || 0}
          </span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">Online</span>
          <span
            className="main_info_block_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {appData?.netInfo?.apollos?.online || 0}
          </span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">offline</span>
          <span className="main_info_block_cell_secondary">
            {appData?.netInfo?.apollos?.offline || 0}
          </span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">CONNECTING</span>
          <span className="main_info_block_cell_secondary">
            {appData?.netInfo?.apollos?.connecting || 0}
          </span>
        </div>
        <div className="main_info_block_cell">
          <span className="main_info_block_cell_primary">
            Avg block / prop. time
          </span>
          <span className="main_info_block_cell_secondary">5.16 sec</span>
        </div>
        {/*<div className="main_info_block_cell" style={{ padding: 5 }}>*/}
        {/*  <Chart chartData={chartData} />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default BlockHeaderInfo;
