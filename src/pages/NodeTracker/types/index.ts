export type BlockListItem = {
  title: string;
  value: string;
  icon?: React.FC<{ className?: string }>;
  className?: string;
  valueClassName?: string;
};

export interface ISearch {
  handler: (value: string) => any;
}

export interface IApolloInfo {
  connecting: number;
  offline: number;
  online: number;
  total: number;
}

export interface IApolloNode {
  account: {
    [key: string]: any;
  };
  address: string;
  balance: {
    [key: string]: any;
  };
  lastBlock: {
    [key: string]: any;
  };
  onboardingBlock: {
    [key: string]: any;
  };
  onboardingDate: number;
  stake: {
    [key: string]: any;
  };
  state: string;
  stateHistory: [];
  status: string;
  statusHistory: [];
  totalBlocks: number;
  totalTransactions: number;
  version: string;
}

export interface INode {
  geo: {
    country: string;
    area: number;
    city: string;
    eu: string;
    ll: number[];
    metro: number;
    range: number[];
    region: string;
    timezone: string;
  };
  history: number[];
  id: string;
  info: {
    [key: string]: any;
  };
  pinned?: boolean;
  readable: {
    [key: string]: any;
  };
  spark: string;
  stake: {
    ether: number;
  };
  stats: {
    [key: string]: any;
  };
  trusted: boolean;
  uptime: {
    [key: string]: any;
  };
}

export interface IGeoNode {
  color: string;
  lat: number;
  lon: number;
  stake: number;
  count: number;
}

export interface ICountryNode {
  key: string;
  stake: number;
  value: number;
}

export interface IContinentItem {
  continent: string;
  stakeSizes: number;
}
