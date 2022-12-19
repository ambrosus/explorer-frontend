import { TransactionProps } from '../pages/Addresses/AddressDetails/address-details.interface';
import { ENABLE_LOGS } from './constants';
import Amb from 'assets/icons/Cryptos/Amb';
import Bnb from 'assets/icons/Cryptos/Bnb';
import Busd from 'assets/icons/Cryptos/Busd';
import Eth from 'assets/icons/Cryptos/Eth';
import Usdc from 'assets/icons/Cryptos/Usdc';
import Usdt from 'assets/icons/Cryptos/Usdt';
import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle';
import moment from 'moment';

export const sliceData5 = (item: string | null | undefined) => {
  if (!item) {
    return '';
  }
  return item.length > 10
    ? `${item.slice(0, 5)}...${item.slice(item.length - 5)}`
    : item;
};
export const sliceData10 = (
  item: string | null | undefined,
  sliceNum: number = 4,
) => {
  if (!item) {
    return '';
  }
  return item.length > 10
    ? `${item.slice(0, sliceNum)}...${item.slice(item.length - sliceNum)}`
    : item;
};
export const calcTime = (time: number | null | undefined) => {
  if (!time) {
    return '';
  }
  /*
   * @param {string} time
   * @returns {string}
   */
  return moment(time).isValid() ? moment(time * 1000).fromNow() : '';
};

export const calcTimeAgo = (time: number | null | undefined) => {
  if (!time) {
    return '';
  }
  /*
   * @param {string} time
   * @returns {string}
   */
  return moment(time).isValid() ? moment(time * 1000).fromNow() : '';
};

export const sliceDataString = (item: string | null | undefined) => {
  if (!item) {
    return [];
  }

  const res = `${item.slice(0, Math.ceil(item.length / 2))} ${item.slice(
    Math.ceil(item.length / 2),
  )}`.split(' ');

  return res;
};

export const setupStyle = (item: string | undefined) => {
  switch (item) {
    case 'ERC-20_Tx':
      return 'address_blocks_erc20';

    default:
      return 'address_blocks_cells';
  }
};

/*
 * @param {Array} data
 * @param {String} key
 *liceData
 * @returns {Array}
 */
export const toUniqueValueByBlock = (arr: any) => {
  try {
    const compare: any = new Map(
      [...arr].map((item) => [item.txHash, item]),
    ).values();
    const newTx: TransactionProps[] = [...compare].sort(
      (a: any, b: any) => b.block - a.block,
    );
    return newTx;
  } catch {
    return arr;
  }
};

export const getTokenIcon = (symbol: string) => {
  /*
   * @param {string} symbol
   * @returns {Component}
   */
  switch (symbol) {
    case 'SAMB':
      return Amb;
    case 'WETH':
      return Eth;
    case 'ETH':
      return Eth;
    case 'AMB':
      return Amb;
    case 'BNB':
      return Bnb;
    case 'WBNB':
      return Bnb;
    case 'USDT':
      return Usdt;
    case 'USDC':
      return Usdc;
    case 'BUSD':
      return Busd;
    default:
      return Amb;
  }
};

export default function removeArrayDuplicates<
  T extends Array<object>,
  K extends keyof T[0],
>(array: T, key = '_id') {
  /*
   * @param {array} array - Array of elements to filter
   * @param {string} key - Element's key to filter by
   * @returns {array}
   */
  const ids: any = [];
  return array.filter((item: any) => {
    if (ids.indexOf(item[key]) < 0) {
      ids.push(item[key]);
      return item;
    } else {
      return false;
    }
  });
}

export const numWithCommas = (val: number | string) => {
  /*
   * @param {number} x - Number to format
   * @returns {string}
   */
  if (typeof val === 'string') {
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const isFloat = (n: number | string) => {
  /*
   * @param {number | string} n - Number to check
   * @returns {boolean}
   */
  return Number(n) === n && n % 1 !== 0;
};

export const displayAmount = (n: number | string) => {
  /*
   * @param {number | string} n - Number to check
   * @returns {string}
   */
  return isFloat(n) ? Number(n).toFixed(8) : Number(n).toFixed(2);
};

export const calckBlocks = (blockReward: any) =>
  blockReward
    .reduce(
      (acc: any, item: { reward: { ether: any } }) => acc + item.reward.ether,
      0,
    )
    .toFixed(5);

export const isOnline = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return <GreenCircle />;

    case 'PENDING':
      return <OrangeCircle />;

    default:
      return <GreenCircle />;
  }
};

export const getAmbTokenSymbol = (tokenName: string) => {
  switch (tokenName.trim()) {
    case 'Hera pool token':
      return 'HPT';
    case 'Plutus pool token':
      return 'PPT';
    case 'Ganymede pool token':
      return 'GPT';
    default:
      return tokenName;
  }
};

export const log = (...args: any) => {
  /*
   * @param {any} args
   * @returns {void}
   */
  return ENABLE_LOGS && console.log(...args);
};

export const numberWithCommas = (number: string | number) =>
  +number > 1
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : number;

export const ambMonthUSD = (usd_price: any) => {
  let result: any = 8 / parseFloat(usd_price);
  if (!result) {
    result = 0;
  }
  return result.toFixed(2);
};

export const currenCurrency = (
  value: string | number,
  nameCurrency: string | number,
) => {
  switch (nameCurrency) {
    case 'TOTAL SUPPLY':
      return `${Number(value).toFixed()}`;

    case 'MARKET CAP':
      return `${Number(value).toFixed()}`;

    case 'AMB PRICE':
      return `${Number(value).toFixed(6)}`;

    default:
      return value;
  }
};
export const nameCurrency = (name: string) => {
  switch (name) {
    case 'TOTAL SUPPLY':
      return ' AMB';
    case 'MARKET CAP':
      return ' USD';

    case 'AMB PRICE':
      return ' USD';

    default:
      return '';
  }
};

export const wrapString = (string: string) => {
  return string.split('::').map((item, index) => (
    <span key={index + 1} style={{ fontSize: 'inherit' }}>
      {item}
    </span>
  ));
};
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatDate(
  timestamp: any,
  showDate: any = false,
  showTime: any = false,
): any {
  const date: any = new Date(timestamp * 1000);

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month: any = moment().format('MM');
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  if (showDate && !showTime) {
    return `${day}/${month}/${year}`;
  }
  return `${
    showDate ? `${dayName}, ${day} ${months[month]} ${year} ` : ''
  }${hours}:${minutes}:${seconds}`;
}

export function timeSince(date: any) {
  let seconds = Math.floor((+new Date() - date * 1000) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + ' year' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ' month' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' day' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hour' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' minute' + (interval > 1 ? 's' : '');
  }

  seconds = seconds < 1 ? 1 : seconds;

  return Math.floor(seconds) + ' second' + (seconds !== 1 ? 's' : '');
}

export const statusMessage = (node: any = {}, nodeName: string) => {
  if (node.state === 'RETIRED') {
    return 'Retired';
  }

  if (nodeName === 'ApolloDetails') {
    switch (node.status) {
      case 'ONLINE':
        return (
          <>
            {timeSince(
              node?.statusHistory[0] ? node.statusHistory[0].timestamp : '',
            )}
          </>
        );
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return <div className="apollo_blocks_body_cell_offline">Offline</div>;
    }
  } else if (nodeName === 'Apollo') {
    switch (node.status) {
      case 'ONLINE':
        return (
          <>
            <div className="apollo_blocks_body_cell_online">Uptime</div>{' '}
            {timeSince(
              node?.statusHistory[0] ? node.statusHistory[0].timestamp : '',
            )}
          </>
        );
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return <div className="apollo_blocks_body_cell_offline">Offline</div>;
    }
  } else {
    switch (node.state) {
      case 'ONBOARDED':
        return (
          <>
            <div className="apollo_blocks_body_cell_online">Onboarded</div>
          </>
        );
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return 'Offline';
    }
  }
};
export const ambToUSD = (amb: any = 0, usd_price: any = 0) => {
  let result = amb * parseFloat(usd_price);

  return result.toFixed(2);
};

export function scientificToDecimal(num: any) {
  const sign = Math.sign(num);
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    const zero = '0';
    const parts = String(num).toLowerCase().split('e');
    const e: any = parts.pop();
    let l = Math.abs(e);
    const direction = e / l;
    const coffee_array = parts[0].split('.');

    if (direction === -1) {
      coffee_array[0] = String(Math.abs(Number(coffee_array[0])));
      num = zero + '.' + new Array(l).join(zero) + coffee_array.join('');
    } else {
      const dec = coffee_array[1];
      if (dec) l = l - dec.length;
      num = coffee_array.join('') + new Array(l + 1).join(zero);
    }
  }

  if (sign < 0) {
    num = -num;
  }

  return num;
}

export const byteToMgb = (size: number | undefined) => {
  if (!size) {
    return '';
  }
  const Mgb = 1048576;
  return (size / Mgb).toFixed(4);
};

export const calcDataTime = (time: number | null | undefined) => {
  if (!time) {
    return '';
  }

  return moment(time).isValid()
    ? moment(time * 1000).format('ddd, D MMMM YYYY')
    : '';
};

export const calcBundleTime = (time: number | null | undefined) => {
  if (!time) {
    return '';
  }

  return moment(time).isValid() ? moment(time * 1000).format('HH:mm:ss') : '';
};

export const bundleExpirationTime = (bundle: any) =>
  bundle.uploadTimestamp + bundle.storagePeriods * 13 * 28 * 24 * 60 * 60;

export const firstLetterUp = (str = ' ') => str[0].toUpperCase() + str.slice(1);

export const diffStyleToCell = (
  value1: number | string = 0,
  value2: number | string = 0,
): JSX.Element => {
  return (
    <>
      <span>{numberWithCommas((+value1).toFixed(2))}</span>
      {` AMB / `}
      <span style={{ fontWeight: 400 }}>
        {`$ ${numberWithCommas((+value2).toFixed(2))}`}
      </span>
    </>
  );
};
