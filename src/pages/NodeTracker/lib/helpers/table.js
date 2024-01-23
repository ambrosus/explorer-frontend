import moment from 'moment';
import _ from 'lodash';

export const formatBestBlockNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0\u00A0');
};

export const lastBlockTime = (timestamp) => {
  if (timestamp === 0) return '∞';

  let time = new Date().getTime();
  const diff = Math.floor((time - timestamp) / 1000);

  if (diff < 60) return Math.round(diff) + ' s ago';

  return moment.duration(Math.round(diff), 's').humanize() + ' ago';
};

export const blockPropagationFilter = (ms, prefix = '+') => {
  let result = 0;

  if (ms < 1000) {
    return (ms === 0 ? '' : prefix) + ms + ' ms';
  }

  if (ms < 1000 * 60) {
    result = ms / 1000;
    return prefix + result.toFixed(1) + ' s';
  }

  if (ms < 1000 * 60 * 60) {
    result = ms / 1000 / 60;
    return prefix + Math.round(result) + ' min';
  }

  if (ms < 1000 * 60 * 60 * 24) {
    result = ms / 1000 / 60 / 60;
    return prefix + Math.round(result) + ' h';
  }

  result = ms / 1000 / 60 / 60 / 24;
  return prefix + Math.round(result) + ' days';
};

export const blockPropagationAvgFilter = (stats, bestBlock) => {
  let ms = stats.propagationAvg;

  if (bestBlock - stats.block.number > 40) {
    return '∞';
  }
  return blockPropagationFilter(ms, '');
};

export const hashFilter = (hash) => {
  if (!hash.length) return '';

  if (hash.substr(0, 2) === '0x') {
    hash = hash.substr(2, 64);
  }

  return hash.substr(0, 8) + '...' + hash.substr(56, 8);
};

export const latencyFilter = (node) => {
  if (_.isUndefined(node.readable)) node.readable = {};

  if (_.isUndefined(node.stats)) {
    node.readable.latencyClass = 'danger';
    node.readable.latency = 'offline';
  }

  if (node.stats.active === false) {
    node.readable.latencyClass = 'danger';
    node.readable.latency = 'offline';
  } else {
    if (node.stats.latency <= 3000) node.readable.latencyClass = 'success';

    if (node.stats.latency > 3000 && node.stats.latency <= 5000)
      node.readable.latencyClass = 'warning';

    if (node.stats.latency > 5000) node.readable.latencyClass = 'danger';

    node.readable.latency = node.stats.latency + ' ms';
  }
  return node;
};

export const propagationTimeClass = (stats, bestBlock) => {
  if (!stats.active) return 'gray';

  if (stats.block.number < bestBlock) return 'gray';

  if (stats.block.propagation === 0) return 'info';

  if (stats.block.propagation < 1000) return 'success';

  if (stats.block.propagation < 3000) return 'warning';

  if (stats.block.propagation < 7000) return 'orange';

  return 'danger';
};

export const propagationNodeAvgTimeClass = (stats, bestBlock) => {
  if (!stats.active) return 'gray';

  if (stats.block.number < bestBlock) return 'gray';

  if (stats.propagationAvg === 0) return 'info';

  if (stats.propagationAvg < 1000) return 'success';

  if (stats.propagationAvg < 3000) return 'warning';

  if (stats.propagationAvg < 7000) return 'orange';

  return 'danger';
};

export const blockTimeFilter = (timestamp) => {
  if (timestamp === 0) return '∞';

  const time = new Date().getTime();
  const diff = Math.floor((time - timestamp) / 1000);

  if (diff < 60) return Math.round(diff) + ' s ago';

  return moment.duration(Math.round(diff), 's').humanize() + ' ago';
};

export const avgTimeFilter = (time) => {
  return `${time} s`;
};

export const gasPriceFilter = (price) => {
  switch (true) {
    case typeof price === 'undefined':
      return '0 wei';

    case price.length < 4:
      return numberFilter(price) + ' wei';

    case price.length < 7:
      return numberFilter(price / 1000) + ' kwei';

    case price.length < 10:
      return numberFilter(price / 1000000) + ' mwei';

    case price.length < 13:
      return numberFilter(price / 1000000000) + ' gwei';

    case price.length < 16:
      return numberFilter(price / 1000000000000) + ' szabo';

    case price.length < 19:
      return numberFilter(price.substr(0, price.length - 15)) + ' finney';

    default:
      return numberFilter(price.substr(0, price.length - 18)) + ' ether';
  }
};

const numberFilter = (number) => number.toString();
