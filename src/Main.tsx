import React, { useEffect } from 'react';
import { RenderRoutes } from './components/RenderRoutes/RenderRoutes';

import { Layout } from './layouts/Layout';
import routes from './routes';

import './styles/Main.scss';
import { useActions } from './hooks/useActions';
import { setAppDataAsync } from './state/actionsCreators';

const Main: React.FC  = () => {
	const {setAppDataAsync} = useActions();

	// @ts-ignore
	useEffect( () => {
		setAppDataAsync()
	}, []);

	return (
		<Layout>
			<RenderRoutes routes={routes} />
		</Layout>
	);
};

export default Main;
