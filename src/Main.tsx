import React, { useEffect } from 'react';
import { RenderRoutes } from './components/RenderRoutes/RenderRoutes';

import { Layout } from './layouts/Layout';
import routes from './routes';

import './styles/Main.scss';
import { useActions } from './hooks/useActions';
import { setAppDataAsync } from './state/actionsCreators';
import { useTypedSelector } from './hooks/useTypedSelector';

const Main: React.FC  = () => {
	const {setAppDataAsync} = useActions();
	const {data : appData} = useTypedSelector((state: any) => state.app)

	// @ts-ignore
	useEffect( () => {
		setAppDataAsync()
	}, []);

	return (
		<Layout>
			{appData ?<RenderRoutes routes={routes} /> : null}
		</Layout>
	);
};

export default Main;
