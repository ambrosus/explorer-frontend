import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { IMainInfoApollo } from '../../apolloBlocks.interface';
import { Number } from 'components/Number';
import { FC, useEffect } from 'react';

const MainInfoApollo: FC<IMainInfoApollo> = ({ info, data }) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  console.log(appData);
  return (
    <div className="main_info_apollo">
      <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
      <div className="main_info_apollo_table">
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">TOTAL NODES</span>
          <span className="main_info_apollo_cell_secondary">{info.total}</span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">Online</span>
          <span
            className="main_info_apollo_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {info.online}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">offline</span>
          <span className="main_info_apollo_cell_secondary">
            {' '}
            {info.offline}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">CONNECTING</span>
          <span className="main_info_apollo_cell_secondary">
            {' '}
            {info.connecting}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">
            Avg block / prop. time
          </span>
          <span>
            {' '}
            <Number
              className="main_info_apollo_cell_secondary"
              discharge="sec"
              value={
                appData?.netInfo?.avgBlockTime
                  ? `${appData.netInfo.avgBlockTime}`
                  : '0'
              }
              fixed={2}
            />{' '}
          </span>
        </div>
        <div className="main_info_apollo_cell">Chart cell</div>
      </div>
    </div>
  );
};

export default MainInfoApollo;
