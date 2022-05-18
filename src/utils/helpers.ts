import { TransactionProps } from '../pages/Addresses/AddressDetails/address-details.interface'
import Amb from 'assets/icons/Cryptos/Amb'
import Eth from 'assets/icons/Cryptos/Eth'
import moment from 'moment'

export const sliceData5 = (item: string | any) => {
  /*
   * @param {string} item
   * @returns {string}
   */
  if (!item) {
    return ''
  }
  return item.length > 5
    ? `${item.slice(0, 5)}...${item.slice(item.length - 5)}`
    : item
}
export const sliceData10 = (item: string | any) => {
  /*
   * @param {string} item
   * @returns {string}
   */
  if (!item) {
    return ''
  }
  return item.length > 10
    ? `${item.slice(0, 10)}...${item.slice(item.length - 10)}`
    : item
}
export const calcTime = (time: any) => {
  /*
   * @param {string} time
   * @returns {string}
   */
  return moment(time).isValid() ? moment(time * 1000).fromNow() : ''
}

export const setupStyle = (item: string | undefined) => {
  /*
   * @param {string} item
   * @returns {string}
   */
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
  /*
   * @param {Array} data
   * @param {String} key
   * @returns {Array}
   */
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
  } catch {
    return arr
  }
}

export const getTokenIcon = (symbol: string) => {
  /*
   * @param {string} symbol
   * @returns {Component}
   */
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

export default function removeArrayDuplicates(array: any, key = '_id') {
  /*
   * @param {array} array - Array of elements to filter
   * @param {string} key - Element's key to filter by
   * @returns {array}
   */
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

export const numWithCommas = (val: number) => {
  /*
   * @param {number} x - Number to format
   * @returns {string}
   */
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
}

export const isFloat = (n: number | string) => {
  /* jsDoc
   * @param {number | string} n - Number to check
   * @returns {boolean}
   */
  return Number(n) === n && n % 1 !== 0
}

export const displayAmount = (n: number | string) => {
  /* jsDoc
   * @param {number | string} n - Number to check
   * @returns {string}
   */
  return isFloat(n) ? Number(n).toFixed(8) : Number(n).toFixed(2)
}
