import { Addresses } from 'pages/Addresses'
import { AddressDetails }  from 'pages/Addresses/AddressDetails'
import { Apollo } from 'pages/Apollo'
import { Atlas } from 'pages/Atlas'
import { Blocks } from 'pages/Blocks'
import { Bundles } from 'pages/Bundles'
import { Hermes } from 'pages/Hermes'
import { Index } from 'pages/Home'
import { Transactions } from 'pages/Transactions'
import React from 'react'

import { IRoute } from './types'

interface IAppRoutes {
	routes: IRoute[]
	subRoutes: IRoute[]
}

export const routes: IRoute[] = [
	{
		path: '/',
		key: 'home',
		exact: true,
		component: () => <Index />,
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
		path: '/addresses',
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
]
export const subRoutes: IRoute[] = [
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
]

const appRoutes: IAppRoutes = { routes, subRoutes }

export default appRoutes
