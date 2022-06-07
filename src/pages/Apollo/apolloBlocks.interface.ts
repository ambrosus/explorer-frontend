export type Account = {
  _id: string;
  address: string;
  balance: {
    wei: string;
    ether: number;
  };
  byteCode: string;
  isContract: boolean;
  power: number;
  role: number;
  timestamp: number;
  totalTx: number;
};
export type AccountsData =
  | {
      data: Account[];
      meta: {
        code: number;
        count: number;
      };
      pagination: {
        hasNext: boolean;
        next: string;
        hasPrevious: boolean;
        previous: string;
      };
    }
  | any;

export type PApolloSort = {
  setSortTerm: (value: string) => void;
  sortTerm: string;
};

export type TApolloSortProps = {
  label: string;
  value: string;
};

export type AddressesBodyProps = {
  address: string;
  balance: any;
  rank: number;
  isContract: boolean;
  txCount: number;
  lastCardRef?: any;
};

export interface IApolloInfo {
  total: number;
  online: number;
  offline: number;
  connecting: number;
}

export interface IMainInfoApollo {
  info: IApolloInfo;
  data: any;
}
