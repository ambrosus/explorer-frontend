import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Main from 'components/Main'
import { store } from './state'

/*
 * @param {Provider} store - redux store
 * @param {BrowserRouter} BrowserRouter - react router
 * @param {Main} Main - main component
 */

export const App = (): JSX.Element => (
		<Provider store={store}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</Provider>
	)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)
