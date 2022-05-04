const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
]
const ERC20Filters = [
	{ title: 'All', value: 'all' },
	{ title: 'Transfers', value: 'transfers' },
]

const methodFilters = [
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Contracts', value: 'contracts' },
	{ title: 'Fees', value: 'fees' },
	{ title: 'Validator Proxy', value: 'validator_proxy' },
	{ title: 'Bundle Uploads', value: 'bundle_uploads' },
	{ title: 'Payouts', value: 'payouts' },
]

export const sidePages = {
	transactionFilters,
	ERC20Filters,
	methodFilters,
}