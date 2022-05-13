import AddressesBody from 'components/Addresses/AddressesBody'
import AddressesHeader from 'components/Addresses/AddressesHeader'
import AddressesSort from 'components/Addresses/AddressesSort'
import MainInfoAddresses from 'components/Addresses/MainInfoAddresses'
import { Content } from 'components/Content'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { getAccountsData } from '../../services/accounts.service'
import removeArrayDuplicates from '../../utils/helpers'

export const Addresses = () => {
	const [accounts, setAccounts] = React.useState([])
	const [pagination, setPagination] = React.useState<any>({})
	const [sortTerm, setSortTerm] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [nextPage, setNextPage] = useState<any>('')
	const observer = useRef<IntersectionObserver>()

	const lastCardRef = useCallback(
		(node: any) => {
			if (loading) return

			if (observer.current) {
				observer.current.disconnect()
			}
			observer.current = new IntersectionObserver((entries) => {
				console.log('nextPage',nextPage)
				if (entries[0].isIntersecting && nextPage) {
					setLoading(true)
				}
			})
			if (node) {
				observer.current.observe(node)
			}
		},
		[loading, pagination]
	)

	useEffect(() => {
		getAccountsData(
			sortTerm,
			nextPage,
		).then((res) => {
			console.log('res.pagination',res.pagination)
			setPagination(res.pagination)
			setAccounts(res.data)
			setLoading(false)
		})
	}, [sortTerm])

	useEffect(() => {
		if (nextPage) {
			getAccountsData(
				sortTerm,
				nextPage,
			).then((res) => {
				console.log('res.pagination',res.pagination)
				if (res.pagination && res.pagination.hasNext) {
					setNextPage(res.pagination.next)
				}else {
					setNextPage('')
				}
				setAccounts(removeArrayDuplicates([...accounts, ...res.data]))
				setLoading(false)
			})
		}
	}, [nextPage])



	return (
		<Content>
			<Content.Header>
				<MainInfoAddresses />
			</Content.Header>
			<Content.Body>
				<div className='addresses__mainTable'>
					<AddressesSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
					<div className='addresses__table'>
						<AddressesHeader />
						{accounts && accounts.length && accounts.map((account: any, index) =>
							account && accounts.length - 1 === index ? (
								<AddressesBody
									key={account && account._id ? account._id : index}
									lastCardRef={lastCardRef}
									address={account && account.address ? account.address : null}
									balance={account && account.balance ? account.balance : null}
									rank={index + 1}
									txCount={account && account.totalTx ? account.totalTx : null}
								/>
							) : (
								<AddressesBody
									key={account && account._id ? account._id : index}
									address={account && account.address ? account.address : null}
									balance={account && account.balance ? account.balance : null}
									rank={index + 1}
									txCount={account && account.totalTx ? account.totalTx : null}
								/>
							),
						)}
					</div>
				</div>
			</Content.Body>
		</Content>
	)
}
