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

export type PAtlasSort = {
  setSortTerm: (value: string) => void;
  sortTerm: string;
  sortOptions?: any[];
  label?: string;
};

export type TAtlasSortProps = {
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
