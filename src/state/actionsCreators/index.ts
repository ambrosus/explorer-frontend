import {actionTypes} from "../action-types";
import { AppDataAction, PositionAction } from '../actions';
import {Dispatch} from "redux";
import API from '../../API/api';
import { CLIENT_VERSION } from '../../utils/constants';

export const setAppDataAsync = () => {
    return async (dispatch: Dispatch<AppDataAction>) => {
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


export const setPosition = (promiseFunc: (arg0: object) => any, ...params:any) => {
    return async (dispatch: Dispatch<PositionAction>) => {
        dispatch({
            type: actionTypes.SET_POSITION__START
        })
        try {
            // @ts-ignore
            const result = await promiseFunc(...params);
            dispatch({
                type: actionTypes.SET_POSITION__SUCCESS,
                payload: result,
            })
        } catch (error: any) {
            dispatch({
                type: actionTypes.SET_POSITION__FAIL,
                payload: `Error in setPosition() ${error.message}`,
            })
        }
    }
}

