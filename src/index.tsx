import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './state';
import {PersistGate} from 'redux-persist/integration/react';
import Main from './Main';
import Loader from './components/Loader';

const rootNode = document.getElementById('root');
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor} loading={<Loader/>}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	rootNode,
);
