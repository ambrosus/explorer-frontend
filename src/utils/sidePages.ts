import { TApolloSortProps } from '../pages/Apollo/apolloBlocks.interface';

export const transactionFilters = [
  { title: 'All', value: 'all' },
  { title: 'Transfers', value: 'transfers' },
  { title: 'Inners', value: 'inners' },
  { title: 'Contract call', value: 'contracts' },
  { title: 'ERC-20 Tx', value: 'tokens' },
  // { title: 'Events', value: 'events' },
];
const ERC20Filters = [
  { title: 'All', value: '' },
  { title: 'Transfers', value: 'transfers' },
];

const methodFilters = [
  { title: 'Transfers', value: 'transfers' },
  { title: 'Contracts', value: 'contracts' },
  { title: 'Fees', value: 'fees' },
  { title: 'Validator Proxy', value: 'validator_proxy' },
  { title: 'Bundle Uploads', value: 'bundle_uploads' },
  { title: 'Payouts', value: 'payouts' },
];

export const apolloDetailsSorting: TApolloSortProps[] = [
  { title: 'All', value: 'all' },
  { title: 'Transfers', value: 'transfers' },
  { title: 'Block Rewards', value: 'block_rewards' },
];
export const atlasDetailsSorting: TApolloSortProps[] = [
  { title: 'All', value: '' },
  { title: 'Transfers', value: 'transfers' },
  { title: 'Sheltering', value: 'sheltering' },
];

export const transactionsTabs = [
  { title: 'All', value: '' },
  { title: 'Transfers', value: 'transfers' },
  { title: 'Contracts', value: 'contracts' },
  { title: 'Block Rewards', value: 'block_rewards' },
  { title: 'Internal', value: 'internal' },
];

export const bundleTabs = [
  { title: 'Assets', value: 'assets' },
  { title: 'Events', value: 'events' },
];
export const contractTabs = [
  { title: 'CODE', value: 'code' },
  { title: 'READ CONTRACT', value: 'read' },
  { title: 'WRITE CONTRACT', value: 'write' },
  { title: 'READ CONTRACT AS PROXY', value: 'readAsProxy' },
  { title: 'WRITE CONTRACT AS PROXY', value: 'writeAsProxy' },
  { title: 'VERIFY CONTRACT', value: 'verify' },
  { title: 'EVENTS', value: 'events' },
];

export const sidePages = {
  transactionFilters,
  ERC20Filters,
  methodFilters,
  apolloDetailsSorting,
  contractTabs,
  bundleTabs,
};
