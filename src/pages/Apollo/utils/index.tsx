import React  from 'react';

export const getApollosNetworkInfo = (data: any) => {
  let total = 0,
    online = 0,
    offline = 0,
    connecting = 0;
  for (const apollo of data) {
    apollo.state !== 'RETIRED' && total++;
    apollo.status === 'ONLINE' && online++;
    apollo.status === 'OFFLINE' && apollo.state !== 'RETIRED' && offline++;
    apollo.status === 'CONNECTING' && connecting++;
  }
  return { total, online, offline, connecting };
};

export default function timeSince(date: any) {
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

export const statusMessage = (node: any, nodeName: string) => {
  if (node.state === 'RETIRED') {
    return 'Retired';
  }

  if (nodeName === 'Apollo') {
    switch (node.status) {
      case 'ONLINE':
        return <><div className='apollo_blocks_body_cell_online'>Uptime</div> {timeSince(
        node && node.statusHistory && node.statusHistory[0]
          ? node.statusHistory[0].timestamp
          : '',
      )}</>;
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return <div className='apollo_blocks_body_cell_offline' >Offline</div>
    }
  } else {
    switch (node.state) {
      case 'ONBOARDED':
        return `Onboarded`;
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return 'Offline';
    }
  }
};
