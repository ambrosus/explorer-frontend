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

export type PAddressesSort = {
  setSortTerm: (value: string) => void;
  sortTerm: string;
};

export type TAddressesSortProps = {
  label: string;
  value: string;
};

export type ApolloBodyProps = {
  isOnline: boolean;
};
