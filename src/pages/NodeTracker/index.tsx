import BlockList from './components/block-list';
import ActiveList from './components/block-list/active-list';
import MapChart from './components/map-chart';
import Notify from './components/notify';
import StatisticsTable from './components/statistics-table';
import DataProvider from './contexts/data/provider';
import { Content } from 'components/Content';
import { Helmet } from 'react-helmet';

export const NodeTracker: React.FC = () => {
  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/" />
        <title>Node Tracker | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Node Tracker shows statistics of active AirDAO network nodes. The statistics include total AMB staked per continent and a map of global node distribution."
        />
      </Helmet>
      <DataProvider>
        <main className="mx-auto max-w-screen-xl w-full px-5 pb-14">
          <h4 className="mb-6">Node Tracker</h4>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-[20px] lg:gap-5 mb-4">
            <div className="panel col-span-3">
              <Notify />
            </div>
            <div className="panel col-span-2 flex items-center">
              <BlockList />
            </div>
          </div>
          <div className="panel mb-4">
            <ActiveList />
          </div>
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-[20px] lg:gap-5 mb-4 items-start">
              <MapChart />
            </div>
          </div>
          <StatisticsTable />
        </main>
      </DataProvider>
    </Content>
  );
};
