import { SET_APP_DATA } from './constants';

export const setAppDataAsync = (data:object)=>({
      type: SET_APP_DATA,
      payload: data,
    })

