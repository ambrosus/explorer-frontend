import {useTypedSelector} from 'hooks/useTypedSelector';

const MainInfoApollo = () => {
  const {data: appData} = useTypedSelector((state: any) => state.app);
  const {
    apollos: {
      total,
      online,
      offline,
      connecting
    },
    avgBlockTime
  } = appData?.netInfo ?? {
    apollos: {
      total: 0,
      online: 0,
      offline: 0,
      connecting: 0,
    },
    avgBlockTime: 0
  }

  return (
    <div className="main_info_apollo">
      <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
      <div className="main_info_apollo_table">
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">TOTAL NODES</span>
          <span className="main_info_apollo_cell_secondary">
            {total || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">ONLINE</span>
          <span
            className="main_info_apollo_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {online || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">OFFLINE</span>
          <span className="main_info_apollo_cell_secondary">
            {offline || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">CONNECTING</span>
          <span className="main_info_apollo_cell_secondary">
            {connecting || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">
            Avg block / prop. time
          </span>
          <span className="main_info_apollo_cell_secondary">
            {avgBlockTime} sec
          </span>
        </div>
        {/*<div className="main_info_apollo_cell" style={{ padding: 5 }}>*/}
        {/*  <Chart chartData={chartData} />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default MainInfoApollo;
