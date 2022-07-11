import { BlockDetails } from './pages/Blocks/BlockDetails';
import { IRoute } from './types';
import { Addresses } from 'pages/Addresses';
import AddressDetails from 'pages/Addresses/AddressDetails';
import { Apollo } from 'pages/Apollo';
import { ApolloDetails } from 'pages/Apollo/ApolloDetails';
import { Atlas } from 'pages/Atlas';
import { AtlasDetails } from 'pages/Atlas/AtlasDetails';
import { Blocks } from 'pages/Blocks';
import { Bundles } from 'pages/Bundles';
import BundleDetails from 'pages/Bundles/BundleDetails';
import { Hermes } from 'pages/Hermes';
import { Home } from 'pages/Home';
import { Transactions } from 'pages/Transactions';
import { TransactionDetails } from 'pages/Transactions/TransactionsDetails';

interface IAppRoutes {
  routes: IRoute[];
  addressesRoutes: IRoute[];
  apolloRoutes: IRoute[];
  atlasRoutes: IRoute[];
  bundleRoutes: IRoute[];
  blockRoutes: IRoute[];
  transactions: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: '/',
    key: 'home',
    exact: true,
    component: () => <Home />,
    isClick: true,
  },
  {
    path: '/apollo',
    key: 'Apollo',
    exact: true,
    component: () => <Apollo />,
    isClick: true,
  },
  {
    path: '/atlas',
    key: 'Atlas',
    exact: true,
    component: () => <Atlas />,
    isClick: true,
  },

  {
    path: '/hermes',
    key: 'Hermes',
    exact: true,
    component: () => <Hermes />,
    isClick: false,
  },
  {
    path: '/addresses',
    key: 'Addresses',
    exact: true,
    component: () => <Addresses />,
    isClick: true,
  },
  {
    path: '/blocks',
    key: 'Blocks',
    exact: true,
    component: () => <Blocks />,
    isClick: true,
  },
  {
    path: '/transactions',
    key: 'Transactions',
    exact: true,
    component: () => <Transactions />,
    isClick: true,
  },
  {
    path: '/bundles',
    key: 'Bundles',
    exact: true,
    component: () => <Bundles />,
    isClick: true,
  },
];
export const addressesRoutes: IRoute[] = [
  {
    path: '/addresses/:address',
    key: 'Address Details',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },
  {
    path: '/addresses/:address/:type',
    key: 'Address Details2',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },

  {
    path: '/addresses/:address/:type/:filtered',
    key: 'Address Details3',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },
  {
    path: '/addresses/:address/:type/:filtered/:tokenToSorted',
    key: 'Address Details4',
    exact: true,
    isClick: false,
    component: () => <AddressDetails />,
  },
];

export const apolloRoutes: IRoute[] = [
  {
    path: '/apollo/:address',
    key: 'Apollo Details',
    exact: true,
    component: () => <ApolloDetails />,
    isClick: false,
  }
];
export const blockRoutes: IRoute[] = [
  {
    path: '/blocks/:address',
    key: 'Block Details',
    exact: true,
    component: () => <BlockDetails />,
    isClick: false,
  },
];

export const atlasRoutes: IRoute[] = [
  {
    path: '/atlas/:address',
    key: 'Atlas Details',
    exact: true,
    component: () => <AtlasDetails />,
    isClick: false,
  }
];

export const transactions: IRoute[] = [
  {
    path: '/transactions/:hash',
    key: 'TransactionsDetails',
    exact: true,
    component: () => <TransactionDetails />,
    isClick: true,
  },
];

export const bundleRoutes: IRoute[] = [
  {
    path: '/bundles/:address',
    key: 'Bundle Details',
    exact: false,
    component: () => <BundleDetails />,
    isClick: false,
  },
  {
    path: '/bundles/:address/:type',
    key: 'Bundle Details type',
    exact: false,
    component: () => <BundleDetails />,
    isClick: false,
  },
];

const appRoutes: IAppRoutes = {
  bundleRoutes,
  routes,
  addressesRoutes,
  apolloRoutes,
  atlasRoutes,
  blockRoutes,
  transactions,
};

export default appRoutes;
