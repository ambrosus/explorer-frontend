// import { Atlas } from './pages/Atlas';
import { BlockDetails } from './pages/Blocks/BlockDetails';
// import { Bundles } from './pages/Bundles';
import NodeSetup from './pages/NodeSetup';
import Finish from './pages/NodeSetup/components/Finish';
import { IRoute } from './types';
import { Addresses } from 'pages/Addresses';
import AddressDetails from 'pages/Addresses/AddressDetails';
import { Apollo } from 'pages/Apollo';
import { ApolloDetails } from 'pages/Apollo/ApolloDetails';
import { AtlasDetails } from 'pages/Atlas/AtlasDetails';
import { Blocks } from 'pages/Blocks';
import BundleDetails from 'pages/Bundles/BundleDetails';
import { Home } from 'pages/Home';
import Metrics from 'pages/Metrics';
import { NodeTracker } from 'pages/NodeTracker';
import { Transactions } from 'pages/Transactions';
import { TransactionDetails } from 'pages/Transactions/TransactionsDetails';

interface IAppRoutes {
  routes: IRoute[];
  subMenuItems: IRoute[];
  addressesRoutes: IRoute[];
  apolloRoutes: IRoute[];
  atlasRoutes: IRoute[];
  bundleRoutes: IRoute[];
  blockRoutes: IRoute[];
  transactions: IRoute[];
}

export const subMenuItems: IRoute[] = [
  {
    path: '/node-tracker',
    key: 'Node Tracker',
    exact: false,
    component: () => <NodeTracker />,
    isClick: true,
  },
];

export const routes: IRoute[] = [
  {
    path: '/',
    key: 'Home',
    exact: true,
    component: () => <Home />,
    isClick: true,
  },
  {
    path: '/apollo/',
    key: 'Apollo',
    exact: true,
    component: () => <Apollo />,
    isClick: true,
  },
  // {
  //   path: '/atlas/',
  //   key: 'Atlas',
  //   exact: true,
  //   component: () => <Atlas />,
  //   isClick: true,
  // },
  {
    path: '/address/',
    key: 'Addresses',
    exact: true,
    component: () => <Addresses />,
    isClick: true,
  },
  {
    path: '/blocks/',
    key: 'Blocks',
    exact: true,
    component: () => <Blocks />,
    isClick: true,
  },
  {
    path: '/tx/',
    key: 'Transactions',
    exact: true,
    component: () => <Transactions />,
    isClick: true,
  },
  {
    path: '/metrics/',
    key: 'Metrics & Charts',
    exact: true,
    component: () => <Metrics />,
    isClick: true,
  },
  {
    path: '/node-setup/',
    key: 'Launch a node',
    exact: true,
    component: () => <NodeSetup />,
    isClick: true,
  },
];

export const addressesRoutes: IRoute[] = [
  {
    path: '/address/:address/',
    key: 'Address Details',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },
  {
    path: '/address/:address/token/:tokenAddress',
    key: 'Address Details',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },
];

export const apolloRoutes: IRoute[] = [
  {
    path: '/apollo/:address/',
    key: 'Apollo Details',
    exact: true,
    component: () => <ApolloDetails />,
    isClick: false,
  },
  {
    path: '/node-setup/finish/:nodeAddress',
    key: 'Node finish',
    exact: true,
    component: () => <Finish />,
    isClick: false,
  },
];
export const blockRoutes: IRoute[] = [
  {
    path: '/block/:address/',
    key: 'Block Details',
    exact: true,
    component: () => <BlockDetails />,
    isClick: false,
  },
];

export const atlasRoutes: IRoute[] = [
  {
    path: '/atlas/:address/',
    key: 'Atlas Details',
    exact: true,
    component: () => <AtlasDetails />,
    isClick: false,
  },
];

export const transactions: IRoute[] = [
  {
    path: '/tx/:hash/',
    key: 'TransactionsDetails',
    exact: true,
    component: () => <TransactionDetails />,
    isClick: true,
  },
];

export const bundleRoutes: IRoute[] = [
  {
    path: '/bundles/:address/',
    key: 'Bundle Details',
    exact: false,
    component: () => <BundleDetails />,
    isClick: false,
  },
  {
    path: '/bundles/:address/:type/',
    key: 'Bundle Details type',
    exact: false,
    component: () => <BundleDetails />,
    isClick: false,
  },
];

const appRoutes: IAppRoutes = {
  bundleRoutes,
  subMenuItems,
  routes,
  addressesRoutes,
  apolloRoutes,
  atlasRoutes,
  blockRoutes,
  transactions,
};

export default appRoutes;
