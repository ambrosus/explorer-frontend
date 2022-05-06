import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Main from './Main'
import ReduxToastrLib from './components/ReduxToastr'
import { store } from './state'

const rootNode = document.getElementById('root')
/*
 * @param {Provider} store - redux store
 * @param {ReduxToastrLib} ReduxToastrLib - redux toastr
 * @param {BrowserRouter} BrowserRouter - react router
 * @param {Main} Main - main component
 */
ReactDOM.render(
	<Provider store={store}>
		<ReduxToastrLib />
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	</Provider>,
	rootNode
)
