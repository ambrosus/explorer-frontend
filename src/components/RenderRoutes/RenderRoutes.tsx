import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from './RouteWithSubRoutes';

export const RenderRoutes = (props: any) => {
	const { routes } = props;
	return (
		<Switch>
			{routes.map((route: any) => (
				<RouteWithSubRoutes key={route.key} {...route} />
			))}
			<Route component={() => <h1>Page not found!</h1>} />
		</Switch>
	);
};
