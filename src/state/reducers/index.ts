import addressReducer from './addressReducer';
import appReducer from './appReducer';
import positionReducer from './positionReducer';
import sourcifyReducer from './sourcifyReduser';
import tokenFiltersReducer from './tokenFiltersReducer';
import { combineReducers } from 'redux';

const reducers: any = combineReducers({
  app: appReducer,
  position: positionReducer,
  tokenFilters: tokenFiltersReducer,
  addressData: addressReducer,
  sourcify: sourcifyReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
