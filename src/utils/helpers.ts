import Amb from 'assets/icons/Cryptos/Amb'
import Eth from 'assets/icons/Cryptos/Eth'
import moment from 'moment'

import { TransactionProps } from '../pages/Addresses/AddressDetails/address-details.interface'

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

export const toUniqueValueByBlock = (arr: any) => {
	const compare: any = new Map(
		[...arr].map((item) => {
			return [item.hash ? item.hash : item.block, item]
		})
	).values()
	const newTx: TransactionProps[] = [...compare].sort(
		(a: any, b: any) => b.block - a.block
	)
	return newTx
}

export const getTokenIcon = (symbol: string) => {
	switch (symbol) {
		case 'SAMB':
			return Amb
		case 'WETH':
			return Eth
		case 'AMB':
			return Amb
		default:
			return Amb
	}
}

/*
 * Copyright: Ambrosus Inc.
 * Email: tech@ambrosus.io
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Remove all duplicates elements from an array
 *
 * @param {array} array - Array of elements to filter
 * @param {string} key - Element's key to filter by
 *
 * @returns {array}
 */

export default function removeArrayDuplicates(array: any, key = '_id') {
	const ids: any = []
	return array.filter((item: any) => {
		if (ids.indexOf(item[key]) < 0) {
			ids.push(item[key])
			return item
		} else {
			console.warn(`Duplicate found in an array: `, item[key])
			return false
		}
	})
}

export const numWithCommas = (val:number) => {
	return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
};
