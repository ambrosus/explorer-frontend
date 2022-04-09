import {actionTypes} from "../action-types";
import {Action} from "../actions";

interface AppState {
    loading: boolean;
    error: object | string | null;
    data: object | null;
}

const initialState = {
    loading: false,
    data: null,
    error: null
}
const reducer = (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
        case actionTypes.SET_APP_DATA__START :
            return {loading: true, error: null, data: {}}
        case actionTypes.SET_APP_DATA__SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case actionTypes.SET_APP_DATA__FAIL:
            return {loading: false, error: action.payload, data: {}}
        default:
            return state;
    }
}
export default reducer;
