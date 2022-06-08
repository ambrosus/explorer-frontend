import React from 'react';

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
