import React from 'react';
import { Home } from './pages/Header/Home';
import { Apollo } from './pages/Header/Apollo';
import { Atlas } from './pages/Header/Atlas';
import { Hermes } from './pages/Header/Hermes';
import { Addresses } from './pages/Header/Addresses';
import { Blocks } from './pages/Header/Blocks';
import { Transactions } from './pages/Header/Transactions';
import { Bundles } from './pages/Header/Bundles';

export const routes = [
	{
		path: '/',
		key: 'home',
		exact: true,
		component: () => <Home />,
	},
	{
		path: '/apollo',
		key: 'Apollo',
		exact: true,
		component: () => <Apollo />,
	},
	{
		path: '/atlas',
		key: 'Atlas',
		exact: true,
		component: () => <Atlas />,
	},
	{
		path: '/hermes',
		key: 'Hermes',
		exact: true,
		component: () => <Hermes />,
	},
	{
		path: '/addresses',
		key: 'Addresses',
		exact: true,
		component: () => <Addresses />,
	},
	{
		path: '/blocks',
		key: 'Blocks',
		exact: true,
		component: () => <Blocks />,
	},
	{
		path: '/transactions',
		key: 'Transactions',
		exact: true,
		component: () => <Transactions />,
	},
	{
		path: '/bundles',
		key: 'Bundles',
		exact: true,
		component: () => <Bundles />,
	},
];

export const routesMenu = [
	{
		path: '/',
		key: 'home',
		exact: true,
		component: () => <Home />,
	},
	{
		path: '/apollo',
		key: 'Apollo',
		exact: true,
		component: () => <Apollo />,
	},
	{
		path: '/atlas',
		key: 'Atlas',
		exact: true,
		component: () => <Atlas />,
	},
	{
		path: '/hermes',
		key: 'Hermes',
		exact: true,
		component: () => <Hermes />,
	},
	{
		path: '/addresses',
		key: 'Addresses',
		exact: true,
		component: () => <Addresses />,
	},
	{
		path: '/blocks',
		key: 'Blocks',
		exact: true,
		component: () => <Blocks />,
	},
	{
		path: '/transactions',
		key: 'Transactions',
		exact: true,
		component: () => <Transactions />,
	},
	{
		path: '/bundles',
		key: 'Bundles',
		exact: true,
		component: () => <Bundles />,
	},
];
