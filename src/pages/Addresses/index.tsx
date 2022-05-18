import AddressesBody from 'components/Addresses/AddressesBody'
import AddressesHeader from 'components/Addresses/AddressesHeader'
import AddressesSort from 'components/Addresses/AddressesSort'
import MainInfoAddresses from 'components/Addresses/MainInfoAddresses'
import { Content } from 'components/Content'
import Loader from 'components/Loader'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getAccountsData } from 'services/accounts.service'
import removeArrayDuplicates from 'utils/helpers'
import { Account, AccountsData } from './addresses.interface'

export const Addresses = () => {
	const [accounts, setAccounts] = React.useState<AccountsData>([])
	const [sortTerm, setSortTerm] = React.useState<string>('balance')
	const { ref, inView } = useInView()
	const { loading } = useTypedSelector((state) => state.app)

	useEffect(() => {
		const next = ''
		getAccountsData(sortTerm, next).then((res: AccountsData) => {
			setAccounts(res)
		})
	}, [])

	useEffect(() => {
		const next = ''
		getAccountsData(sortTerm, next).then((res: AccountsData) => {
			setAccounts(res)
		})
	}, [sortTerm])

	useEffect(() => {
		if (inView) {
			const next: string = accounts?.pagination.next
			if (next) {
				getAccountsData(sortTerm, next).then((res: AccountsData) => {
					setAccounts((prev: AccountsData) => {
						return {
							...prev,
							data: removeArrayDuplicates([...prev.data, ...res?.data]),
							pagination: res.pagination,
						}
					})
				})
			}

		}
	}, [inView])

	return (
		<Content>
			<Content.Header>
				<MainInfoAddresses />
				<div className='loader'>{loading && <Loader />}</div>
			</Content.Header>
			<Content.Body>
				<div className='addresses__mainTable'>
					<AddressesSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
					<div className='addresses__table'>
						<AddressesHeader />
						{accounts && accounts.data && accounts.data.length
							? accounts.data.map((account: Account, index: number) => {
								return account && accounts.data.length - 1 === index ? (
									<AddressesBody
										key={ account._id}
										lastCardRef={ref}
										isContract={account.isContract}
										address={account.address}
										balance={account.balance}
										rank={index + 1}
										txCount={account.totalTx}
									/>
								) : (
									<AddressesBody
                    key={ account._id}
                    isContract={account.isContract}
                    address={account.address}
                    balance={account.balance}
                    rank={index + 1}
                    txCount={account.totalTx}
									/>
								)
							})
							: null}
					</div>
				</div>
			</Content.Body>
		</Content>
	)
}
