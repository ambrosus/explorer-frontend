import {actionTypes} from "../action-types";

interface SetAppDataAction {
    type: actionTypes.SET_APP_DATA__START;
}

interface SetAppDataActionSuccess {
    type: actionTypes.SET_APP_DATA__SUCCESS;
    payload: object | null;
}

interface SetAppDataActionFailure {
    type: actionTypes.SET_APP_DATA__FAIL;
    payload: object | string | null;
}

export type  Action = SetAppDataAction |
  SetAppDataActionSuccess |
    SetAppDataActionFailure
