import React from 'react'
import { Route } from 'react-router-dom'

export const RouteWithSubRoutes = (route: any) => {
	const { path, exact, routes } = route
	return (
		<React.Fragment>
			<Route
				path={path}
				// @ts-ignore
				exact={exact}
				render={(props: any) => <route.component {...props} routes={routes} />}
			/>
		</React.Fragment>
	)
}
