import { actionTypes } from '../action-types'
import { FiltersAction } from '../actions'

interface TokenFiltersReducerState {
	filters: any[]
}

const initialState = {
	filters: [],
}

export const tokenFiltersReducer = (
	state: TokenFiltersReducerState = initialState,
	action: FiltersAction | any
): TokenFiltersReducerState => {
	switch (action.type) {
		case actionTypes.ADD_FILTER:
			// @ts-ignore
			return {
				...state,
				filters: action.payload,
			}
		case actionTypes.REMOVE_FILTER: {
			// @ts-ignore
			const newFilters = !state.filters.includes(action.payload)
				? state.filters
				: state.filters.filter((filter) => filter !== action.payload)
			return {
				...state,
				filters: newFilters,
			}
		}
		case actionTypes.CLEAR_FILTERS: {
			return { filters: [] }
		}
		default:
			return state
	}
}
