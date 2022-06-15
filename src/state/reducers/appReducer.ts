import { actionTypes } from '../action-types';
import { AppDataAction } from '../actions';

interface AppState {
  loading: boolean;
  error: object | string | null;
  data: object | null;
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};
const reducer = (
  state: AppState = initialState,
  action: AppDataAction,
): AppState => {
  switch (action.type) {
    case actionTypes.SET_APP_DATA__START:
      return { ...state, loading: true };
    case actionTypes.SET_APP_DATA__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.SET_APP_DATA__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
