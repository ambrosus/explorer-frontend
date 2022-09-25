import { TApolloSortProps } from '../pages/Apollo/apolloBlocks.interface';

const transactionFilters = [
  { title: 'All', value: '' },
  { title: 'Transfers', value: 'transfers' },
  { title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
  { title: 'Contract', value: 'contract' },
];
const ERC20Filters = [
  { title: 'All', value: ' ' },
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

export const apollosSorting: TApolloSortProps[] = [
  { title: 'Address', value: 'address' },
  { title: 'Total blocks', value: 'totalBundles' },
  { title: 'Balance', value: 'balance' },
  { title: 'Stake', value: 'stake' },
];
export const apolloDetailsSorting: TApolloSortProps[] = [
  { title: 'All', value: '' },
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
  { title: 'Transactions', value: 'transactions' },
  { title: 'Transfers', value: 'transfers' },
  { title: 'Contracts', value: 'contracts' },
  { title: 'Fees', value: 'fees' },
  { title: 'Validator Proxy', value: 'validator_proxies' },
  { title: 'Block Rewards', value: 'block_rewards' },
  { title: 'KYCs', value: 'kycs' },
  { title: 'Challenges', value: 'challenges' },
  { title: 'Payouts', value: 'payouts' },
  { title: 'Roles', value: 'roles' },
  { title: 'Heads', value: 'heads' },
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
