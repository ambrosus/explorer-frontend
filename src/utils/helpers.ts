import moment from 'moment'
import { TransactionProps } from "../pages/Addresses/AddressDetails/address-details.interface";

export const sliceData5 = (item: string | any) => {
	if (!item) {
		return ''
	}
	return item.length > 5
		? `${item.slice(0, 5)}...${item.slice(item.length - 5)}`
		: item
}
export const sliceData10 = (item: string | any) => {
	if (!item) {
		return ''
	}
	return item.length > 10
		? `${item.slice(0, 10)}...${item.slice(item.length - 10)}`
		: item
}
export const calcTime = (time: any) =>
	moment(time).isValid() ? moment(time * 1000).fromNow() : ''

export const setActiveLink = (props: {
	isActive: boolean
}): string | undefined =>
	'tabs__link ' + (props.isActive ? 'tabs__link-active' : '')

export const setupStyle = (item: string | undefined) => {
	let type: { style: object } = {
		style: {},
	}
	switch (item) {
		case 'ERC-20_Tx':
			return (type.style = { gridTemplateColumns: 'repeat(7, auto)' })

		default:
			return (type.style = { gridTemplateColumns: 'repeat(8, auto)' })
	}
}

export 	const toUniqueValueByBlock = (arr:any) => {
	const compare: any = new Map(
		[...arr].map((item) => {
			return [
				item.hash ? item.hash : item.block ,
				item,
			]
		})
	).values()
	const newTx: TransactionProps[] = [...compare].sort(
		(a: any, b: any) => b.block - a.block
	)
	return newTx
}
