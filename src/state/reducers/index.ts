import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'

import appReducer from './appReducer'
import positionReducer from './positionReducer'
import { tokenFiltersReducer } from './tokenFiltersReducer'

const reducers = combineReducers({
	app: appReducer,
	position: positionReducer,
	tokenFilters: tokenFiltersReducer,
	toastr: toastrReducer, // <- Mounted at toastr.
})

export default reducers

export type RootState = ReturnType<typeof reducers>
