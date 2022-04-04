import React from 'react';
import { Home } from './pages/Home';
import { Apollo } from './pages/Apollo';
import { Atlas } from './pages/Atlas';
import { Hermes } from './pages/Hermes';
import { Addresses } from './pages/Addresses';
import { Blocks } from './pages/Blocks';
import { Transactions } from './pages/Transactions';
import { Bundles } from './pages/Bundles';
import { AddressDetails } from './pages/Addresses/AddressDetails';

export const routes = [
	{
		path: '/',
		key: 'home',
		exact: true,
		component: () => <Home />,
	},
	{
		path: '#',
		key: 'Apollo',
		exact: true,
		component: () => <Apollo />,
	},
	{
		path: '#',
		key: 'Atlas',
		exact: true,
		component: () => <Atlas />,
	},
	{
		path: '#',
		key: 'Hermes',
		exact: true,
		component: () => <Hermes />,
	},
	{
		path: '#',
		key: 'Addresses',
		exact: true,
		component: () => <Addresses />,
	},
	{
		path: '#',
		key: 'Blocks',
		exact: true,
		component: () => <Blocks />,
	},
	{
		path: '#',
		key: 'Transactions',
		exact: true,
		component: () => <Transactions />,
	},
	{
		path: '#',
		key: 'Bundles',
		exact: true,
		component: () => <Bundles />,
	},
];

export const subRoutes = [
	{
		path: '/addresses/:address',
		key: 'Address Details',
		exact: true,
		component: () => <AddressDetails />,
	},
	{
		path: '/addresses/:address/:type',
		key: 'Address Details',
		exact: true,
		component: () => <AddressDetails />,
	},
];

const appRoutes = { routes, subRoutes };
export default appRoutes;
