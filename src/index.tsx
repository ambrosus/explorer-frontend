import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'

import Main from './Main'
import { store } from './state'
import 'react-notifications-component/dist/theme.css'

const rootNode = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ReactNotifications/>
			<Main />
		</BrowserRouter>
	</Provider>,
	rootNode
)
