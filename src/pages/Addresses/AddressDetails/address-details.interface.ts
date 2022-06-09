import { ethers } from 'ethers';
import React from 'react';

export type TokenType = {
  address: string;
  balance: string;
  decimals: number;
  symbol: string;
  token?: string;
  contract: string;
  name: string;
  idx: number;
  index: number;
  totalSupply: number;
};
export type OverallBalanceProps = {
  addressBalance: string | number;
};

export interface TabsProps {
  lastCardRef?: any;
  pageNum?: any;
  selectedToken: TokenType | null;
  transactionType?: string;
  data: any;
  onClick: any;
  setTransactionType: any;
  isIcon: boolean;
  loading?: boolean;
  sortOptions?: any;
}

export type TransactionProps = {
  txHash: string;
  method: string;
  from: string;
  to: string;
  date: number;
  block: number;
  amount: any;
  token: string | undefined;
  txFee: any;
  symbol?: string;
};

export interface ExplorerTxType {
  hash: any;
  type: any;
  from: string | any[];
  to: string | any[];
  timestamp: number;
  blockNumber: any;
  value: { wei: ethers.BigNumberish };
  gasCost: { wei: any };
}

export interface AddressBlockProps {
  txhash: string | number;
  method: string;
  from: string | number;
  symbol?: string | null;
  lastCardRef?: any;
  to: string | number;
  date: string | number;
  block: string | any;
  amount: any;
  txfee: any;
  token: any;
  methodFilters?: any;
  setTransactionType?: any;
  onClick?: any;
  isLatest?: boolean;
  isTableColumn?: string;
  isIcon?: boolean;
}

export interface TokenProps {
  selectedToken: TokenType | null;
  onClick: Function;
  loading: boolean;
  addressData: object;
}

export interface TokenFilterProps {
  loading: boolean;
  addressData: any;
  onClick: React.Dispatch<React.SetStateAction<TokenType>> | any;
  selectedToken: TokenType | null;
}

export interface TokenModalProps {
  selectedToken: TokenType | null;
  setToken: (token: TokenType) => void;
  addressData: any;
}

export interface ITokenItemProps {
  token: any;
  selectedToken: any;
  setToken: any;
}
