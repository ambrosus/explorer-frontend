import appReducer from './appReducer';
import bundleReducer from './bundleReducer';
import positionReducer from './positionReducer';
import tokenFiltersReducer  from './tokenFiltersReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  app: appReducer,
  position: positionReducer,
  tokenFilters: tokenFiltersReducer,
  // bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
