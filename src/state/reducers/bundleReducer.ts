import { actionTypes } from '../action-types';
import { BunleDataAction } from '../actions';

interface BundleState {
  loading: boolean;
  error: object | string | null;
  data: object | null;
}

const initialState = {
  loading: true,
  data: null,
  error: null,
};
const reducer = (
  state: BundleState = initialState,
  action: BunleDataAction,
): BundleState => {
  switch (action.type) {
    case actionTypes.SET_BUNDLE_DATA__START:
      return { ...state, loading: true };
    case actionTypes.SET_BUNDLE_DATA__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.SET_BUNDLE_DATA__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
