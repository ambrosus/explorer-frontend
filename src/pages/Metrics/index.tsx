import ChartsActiveUsers from './components/active-users';
import AnchorNavigation from './components/anchor-navigation';
import Statistics from './components/statistics';
import ChartsTotalValueLocked from './components/total-value-locked';
import ChartsTransactions from './components/transactions';
import { Content } from 'components/Content';
import { Helmet } from 'react-helmet';

const Metrics = () => {
  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/" />
        <title>Metrics & Charts | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Metrics & Charts provides detailed statistics on active AirDAO network nodes, including total AMB staked per continent and an interactive map of global node distribution."
        />
      </Helmet>
      <div className="flex flex-col">
        <main className="mx-auto max-w-screen-xl w-full pb-20">
          <div className="flex">
            <aside className="sticky h-full block top-16">
              <AnchorNavigation />
            </aside>
            <div className="w-full border-l pl-12 border-neutral-500">
              <Statistics />
              <ChartsActiveUsers />
              <ChartsTransactions />
              <ChartsTotalValueLocked />
            </div>
          </div>
        </main>
      </div>
    </Content>
  );
};

export default Metrics;
