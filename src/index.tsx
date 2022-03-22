import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';

const rootNode = document.getElementById('root');
ReactDOM.render(
	<BrowserRouter>
		<Main />
	</BrowserRouter>,
	rootNode
);
