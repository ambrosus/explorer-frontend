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
        <main className="mx-auto max-w-screen-2xl w-full pb-20">
          <div className="flex flex-col lg:flex-row">
            <aside className="sticky z-30 border border-solid border-black-200 mb-4 lg:mb-0 mx-4 lg:mx-0 bg-white lg:border-none lg:bg-transparent h-full block top-[85px] rounded-5 lg:top-16">
              <AnchorNavigation />
            </aside>
            <div className="w-full border-l px-4 lg:px-12 border-neutral-500">
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
