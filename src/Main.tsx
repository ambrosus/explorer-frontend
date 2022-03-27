import React, { useEffect } from 'react';
import { RenderRoutes } from './components/RenderRoutes/RenderRoutes';
import { Layout } from './layouts/Layout';
import { routes } from './routes';
import API from './API/api';
import storage from './utils/storage';

import './styles/Main.scss';
import { CLIENT_VERSION } from './utils/constants';

const Main = () => {
	useEffect(() => {
		API.getInfo().then((netInfo: any = {}) => {
			storage.set('netInfo', netInfo);
			storage.set('gitTagVersion', CLIENT_VERSION);
		});
		API.getToken().then(async (tokenInfo = {}) => {
			const totalSupply = await API.getTokenTotalSupply().then((totalSupplyToken = {}) => {
				return totalSupplyToken;
			});
			tokenInfo.total_supply = totalSupply;
			storage.set('tokenInfo', tokenInfo);
		});

		API.getTokenMountPrice().then((totalPriceToken = {}) => {
			storage.set('totalPriceToken', totalPriceToken);
		});
	}, []);

	return (
		<Layout>
			<RenderRoutes routes={routes} />
		</Layout>
	);
};

export default Main;
