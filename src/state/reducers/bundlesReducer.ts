import { actionTypes } from '../action-types';
import { BunlesDataAction } from '../actions';
import { PagesState } from 'state/state.interface';

const initialState: PagesState = {
  loading: true,
  data: [],
  error: null,
};
const reducer = (
  state: PagesState = initialState,
  action: BunlesDataAction,
): PagesState => {
  switch (action.type) {
    case actionTypes.SET_BUNDLES_DATA__START:
      return { ...state, loading: true };
    case actionTypes.SET_BUNDLES_DATA__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.SET_BUNDLES_DATA__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
