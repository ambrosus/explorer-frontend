import {actionTypes} from "../action-types";
import {Action} from "../actions";
import {Dispatch} from "redux";
import API from '../../API/api';
import { CLIENT_VERSION } from '../../utils/constants';

export const setAppDataAsync = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: actionTypes.SET_APP_DATA__START
        })
        try {
            const netInfo = await API.getInfo();
            const tokenInfo =  await API.getToken().then(async (info = {}) => {
                const totalSupply = await API.getTokenTotalSupply().then((totalSupplyToken = {}) => {
                    return totalSupplyToken;
                });
                info.total_supply = totalSupply;
                return info;
            });
            const totalPriceToken =await API.getTokenMountPrice();
            const result = {
                gitTagVersion: CLIENT_VERSION,
                netInfo: netInfo,
                tokenInfo: tokenInfo,
                totalPriceToken: totalPriceToken,
            };
            dispatch({
                type: actionTypes.SET_APP_DATA__SUCCESS,
                payload: result,
            })
        } catch (error: any) {
            dispatch({
                type: actionTypes.SET_APP_DATA__FAIL,
                payload: `Error in setAppDataAsync() ${error.message}`,
            })
        }
    }
}
