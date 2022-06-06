import { IRoute } from './types';
import { Addresses } from 'pages/Addresses';
import { AddressDetails } from 'pages/Addresses/AddressDetails';
import { Apollo } from 'pages/Apollo';
import { Atlas } from 'pages/Atlas';
import { Blocks } from 'pages/Blocks';
import { Bundles } from 'pages/Bundles';
import { Hermes } from 'pages/Hermes';
import { Home } from 'pages/Home';
import { Transactions } from 'pages/Transactions';
import React from 'react';

interface IAppRoutes {
  routes: IRoute[];
  subRoutes: IRoute[];
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
    isClick: false,
  },
  {
    path: '/transactions',
    key: 'Transactions',
    exact: true,
    component: () => <Transactions />,
    isClick: false,
  },
  {
    path: '/bundles',
    key: 'Bundles',
    exact: true,
    component: () => <Bundles />,
    isClick: false,
  },
];
export const subRoutes: IRoute[] = [
  {
    path: '/addresses/:address',
    key: 'Address Details',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },
  {
    path: '/addresses/:address/:type',
    key: 'Address Details',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },

  {
    path: '/addresses/:address/:type/:filtered',
    key: 'Address Details',
    exact: true,
    component: () => <AddressDetails />,
    isClick: false,
  },
  {
    path: '/addresses/:address/:type/:filtered/:tokenToSorted',
    key: 'Address Details',
    exact: true,
    isClick: false,
    component: () => <AddressDetails />,
  },
];

const appRoutes: IAppRoutes = { routes, subRoutes };

export default appRoutes;
