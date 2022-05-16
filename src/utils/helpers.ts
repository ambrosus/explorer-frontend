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

/* toUniqueValueByBlock  jsDoc
 * @param {Array} data
 * @param {String} key
 *
 * @returns {Array}
 */
export const toUniqueValueByBlock = (arr: any) => {
  try {
    const compare: any = new Map(
      [...arr].map((item) => {
        return [item.hash ? item.hash : item.block, item]
      }),
    ).values()
    const newTx: TransactionProps[] = [...compare].sort(
      (a: any, b: any) => b.block - a.block,
    )
    return newTx
  } catch (e) {
    return arr || []
  }
}
  /*
   * @param {string} tokenName
   * @returns {string}
   */
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

  /*
   * @param {number} x - Number to format
   *
   * @returns {string}
   */

  export const numWithCommas = (val: number) => {
    return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
  }
