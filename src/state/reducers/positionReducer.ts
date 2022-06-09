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
    case actionTypes.SET_POSITION__START:
      return { ...state, loading: true };
    case actionTypes.SET_POSITION__SUCCESS:
      return { ...state, data: action.payload };
    case actionTypes.SET_POSITION__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
