import { SET_APP_DATA } from './constants';

export interface AppDataState {
  type : string,
  payload : {}
}

const defaultState = {
  info: null
};

export default (state = defaultState, { type, payload }: AppDataState) => {
  switch (type) {
    case SET_APP_DATA:
      return { ...state, info: payload };
    default:
      return state;
  }
};
