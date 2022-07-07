import { actionTypes } from '../action-types';
import { HermesDataAction } from '../actions';
import { PagesState } from 'state/state.interface';

const initialState: PagesState = {
  loading: true,
  data: null,
  error: null,
};
const reducer = (
  state: PagesState = initialState,
  action: HermesDataAction,
): PagesState => {
  switch (action.type) {
    case actionTypes.SET_HERMES_DATA__START:
      return { ...state, loading: true };
    case actionTypes.SET_HERMES_DATA__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.SET_HERMES_DATA__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
