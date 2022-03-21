import React from 'react';
import { Home } from './pages/Home';
import { Apollo } from './pages/Apollo';
import { Atlas } from './pages/Atlas';
import { Hermes } from './pages/Hermes';
import { Addresses } from './pages/Addresses';
import { Blocks } from './pages/Blocks';
import { Transactions } from './pages/Transactions';
import { Bundles } from './pages/Bundles';

const routes = [
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

export default routes;
