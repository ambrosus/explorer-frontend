import { actionTypes } from '../action-types';
import { SourcifyesDataAction } from '../actions';
import { PagesState } from 'state/state.interface';

const initialState = {
  loading: false,
  data: null,
  error: null,
};
const reducer = (
  state: PagesState = initialState,
  action: SourcifyesDataAction,
): PagesState => {
  switch (action.type) {
    case actionTypes.GET_SOURCIFY_DATA__START:
      return { ...state, loading: true };
    case actionTypes.GET_SOURCIFY_DATA__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.GET_SOURCIFY_DATA__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
