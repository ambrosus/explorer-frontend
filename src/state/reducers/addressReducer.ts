import { actionTypes } from '../action-types';
import { AddressesDataAction } from '../actions';
import { PagesState } from 'state/state.interface';

const initialState = {
  loading: false,
  data: null,
  error: null,
};
const reducer = (
  state: PagesState = initialState,
  action: AddressesDataAction,
): PagesState => {
  switch (action.type) {
    case actionTypes.GET_ADDRESS_DATA__START:
      return { ...state, loading: true };
    case actionTypes.GET_ADDRESS_DATA__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.GET_ADDRESS_DATA__FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
