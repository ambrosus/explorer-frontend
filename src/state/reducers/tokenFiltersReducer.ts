import {actionTypes} from '../action-types';
import {FiltersAction} from '../actions';

interface TokenFiltersReducerState {
  filters: any[];
}

const initialState = {
  filters: [],
};

const reducer = (
  state: TokenFiltersReducerState = initialState,
  action: FiltersAction | any,
): TokenFiltersReducerState => {
  switch (action.type) {
    case actionTypes.ADD_FILTER:
      return {
        ...state,
        filters: action.payload,
      };
    case actionTypes.CLEAR_FILTERS: {
      return {filters: []};
    }
    default:
      return state;
  }
};
export default reducer
