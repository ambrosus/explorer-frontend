import addressesReducer from './addressesReducer';
import apolloReducer from './apolloReducer';
import appReducer from './appReducer';
import atlasReducer from './atlasReducer';
import blocksReducer from './blocksReducer';
import bundlesReducer from './bundlesReducer';
import hermesReducer from './hermesReducer';
import homeReducer from './homeReducer';
import positionReducer from './positionReducer';
import tokenFiltersReducer from './tokenFiltersReducer';
import transactionsReducer from './transactionsReducer';
import { combineReducers } from 'redux';

const reducers: any = combineReducers({
  app: appReducer,
  position: positionReducer,
  tokenFilters: tokenFiltersReducer,
  address: addressesReducer,
  apollo: apolloReducer,
  atlas: atlasReducer,
  bundles: bundlesReducer,
  blocks: blocksReducer,
  hermes: hermesReducer,
  home: homeReducer,
  transactions: transactionsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
