import { actionTypes } from '../action-types';
import { PositionAction } from '../actions';

interface PositionReducerState {
  loading: boolean;
  error: object | string | null;
  data: object | Array<any> | null;
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};
const reducer = (
  state: PositionReducerState = initialState,
  action: PositionAction,
): PositionReducerState => {
  switch (action.type) {
    //TODO переписать через спред
    case actionTypes.SET_POSITION__START:
      return { ...state, loading: true };
    case actionTypes.SET_POSITION__SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case actionTypes.SET_POSITION__FAIL:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
export default reducer;
