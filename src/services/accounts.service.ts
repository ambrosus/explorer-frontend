import API from '../API/api'

export const getAccountsData = async (
	sortTerm: string,
	pageNum: number,
) => {
	const data: any = await API.getAccounts({
		limit: 20,
		sort: sortTerm,
		page: pageNum,
	})
	return data
}
