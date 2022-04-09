import React, { useEffect } from 'react';
import { RenderRoutes } from './components/RenderRoutes/RenderRoutes';

import { Layout } from './layouts/Layout';
import routes from './routes';
import API from './API/api';
import storage from './utils/storage';

import './styles/Main.scss';
import { CLIENT_VERSION } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setAppDataAsync } from './store/modules/appData/actions';

const Main: React.FC  = () => {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	// @ts-ignore
	useEffect(async () => {
		const netInfo = await API.getInfo();
		const tokenInfo =  await API.getToken().then(async (info = {}) => {
			const totalSupply = await API.getTokenTotalSupply().then((totalSupplyToken = {}) => {
				return totalSupplyToken;
			});
			info.total_supply = totalSupply;
			return info;
		});
		const totalPriceToken =await API.getTokenMountPrice();
		const result = {
			gitTagVersion: CLIENT_VERSION,
			netInfo: netInfo,
			tokenInfo: tokenInfo,
			totalPriceToken: totalPriceToken,
		};
		dispatch(setAppDataAsync(result));
	}, []);

	return (
		<Layout>
			<RenderRoutes routes={routes} />
		</Layout>
	);
};

export default Main;
