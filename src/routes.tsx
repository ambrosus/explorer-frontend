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

interface IRoute {
	path: string,
	key: string,
	exact: boolean,
	component: React.FC
}
interface IAppRoutes{
	routes: IRoute[],
	subRoutes: IRoute[]
}

export const routes:IRoute[] = [
	{
		path: '/',
		key: 'home',
		exact: true,
		component: () => <Home />,
	},
	{
		path: 'apollo',
		key: 'Apollo',
		exact: true,
		component: () => <Apollo />,
	},
	{
		path: 'atlas',
		key: 'Atlas',
		exact: true,
		component: () => <Atlas />,
	},
	{
		path: 'hermes',
		key: 'Hermes',
		exact: true,
		component: () => <Hermes />,
	},
	{
		path: 'addresses',
		key: 'Addresses',
		exact: true,
		component: () => <Addresses />,
	},
	{
		path: 'blocks',
		key: 'Blocks',
		exact: true,
		component: () => <Blocks />,
	},
	{
		path: 'transactions',
		key: 'Transactions',
		exact: true,
		component: () => <Transactions />,
	},
	{
		path: 'bundles',
		key: 'Bundles',
		exact: true,
		component: () => <Bundles />,
	},
];
export const subRoutes :IRoute[] = [
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
	{
		path: '/addresses/:address/:type/:filtered',
		key: 'Address Details',
		exact: true,
		component: () => <AddressDetails />,
	},
	{
		path: '/addresses/:address/:type/:filtered/:tokenToSorted',
		key: 'Address Details',
		exact: true,
		component: () => <AddressDetails />,
	},
];

const appRoutes:IAppRoutes = { routes, subRoutes };

export default appRoutes;
