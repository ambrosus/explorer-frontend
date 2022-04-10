import {actionTypes} from "../action-types";
import { AppDataAction, PositionAction } from '../actions';

interface PositionReducerState {
    loading: boolean;
    error: object | string | null;
    data: object | Array<any> | null;
}

const initialState = {
    loading: false,
    data: null,
    error: null
}
const reducer = (state: PositionReducerState = initialState, action: PositionAction): PositionReducerState => {
    switch (action.type) {
        case actionTypes.SET_POSITION__START :
            return {loading: true, error: null, data: null}
        case actionTypes.SET_POSITION__SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case actionTypes.SET_POSITION__FAIL:
            return {loading: false, error: action.payload, data: null}
        default:
            return state;
    }
}
export default reducer;
