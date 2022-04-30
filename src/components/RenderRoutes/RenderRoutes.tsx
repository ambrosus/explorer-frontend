import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Error404 from '../../pages/Error404'
import Loader from '../Loader'

export const RenderRoutes = (props: any) => {
	const { routes } = props
	return (
		<Routes>
			{routes.routes.map((route: any) => (
				<Route
					suspense={<Loader />}
					key={route.key}
					path={route.path}
					element={<route.component />}
					{...route}
				/>
			))}
			{routes.subRoutes.map((route: any) => (
				<Route
					suspense={<Loader />}
					key={route.key}
					path={route.path}
					element={<route.component />}
					{...route}
				/>
			))}
			<Route path="*" element={<Error404 />} />
		</Routes>
	)
}
