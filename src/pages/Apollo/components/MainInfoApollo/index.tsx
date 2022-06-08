import Chart from '../Chart';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { numWithCommas } from 'utils/helpers';

const MainInfoApollo = ({ info, chartData }: any) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const totalAddresses: number =
    appData && numWithCommas(appData.netInfo.accounts.total);
  const holders: number =
    appData && numWithCommas(appData.netInfo.accounts.withBalance);
  return (
    <div className="main_info_apollo">
      <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
      <div className="main_info_apollo_table">
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">TOTAL NODES</span>
          <span className="main_info_apollo_cell_secondary">{info?.total}</span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">Online</span>
          <span
            className="main_info_apollo_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {info?.online}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">offline</span>
          <span className="main_info_apollo_cell_secondary">
            {info?.offline}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">CONNECTING</span>
          <span className="main_info_apollo_cell_secondary">
            {info?.connecting}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">
            Avg block / prop. time
          </span>
          <span className="main_info_apollo_cell_secondary">5.16 sec</span>
        </div>
        <div className="main_info_apollo_cell" style={{ padding: 5 }}>
          {/*<Chart chartData={chartData} />*/}
        </div>
      </div>
    </div>
  );
};

export default MainInfoApollo;
