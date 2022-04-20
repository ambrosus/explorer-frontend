import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {  store } from './state';
import Main from './Main';

const rootNode = document.getElementById('root');
ReactDOM.render(
	<Provider store={store}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
	</Provider>,
	rootNode,
);
