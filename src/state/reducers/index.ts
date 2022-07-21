import appReducer from './appReducer';
import bundlesReducer from './bundlesReducer';
import positionReducer from './positionReducer';
import tokenFiltersReducer from './tokenFiltersReducer';
import { combineReducers } from 'redux';

const reducers: any = combineReducers({
  app: appReducer,
  position: positionReducer,
  tokenFilters: tokenFiltersReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
