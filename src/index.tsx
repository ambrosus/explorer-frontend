import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Main from './Main'
import { store } from './state'

const rootNode = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	</Provider>,
	rootNode
)
