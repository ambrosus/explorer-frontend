import React from 'react';

export type ResultHomePageData = {
  header?: HeaderProps[] | [];
  latestBlocks: LatestBlocksProps[];
  latestTransactions: LatestTransactionsProps[];
};

export type HeaderProps = {
  name: string;
  value: any;
};

export interface FindWideMobileProps {
  searchRef?: React.Ref<HTMLFormElement>;
  setIsShow: Function;
}

export type LatestBlocksProps = {
  number?: number;
  timestamp?: number;
  miner?: string;
  totalTransactions?: number;
  blockRewards?: number;
  key?: number;
  index?: any;
  validator?: string;
  blockReward?: number;
  name?: string;
};

export type LatestTransactionsProps = {
  _id?: React.Key | null | undefined;
  status: string;
  hash: any;
  amount?: number;
  timestamp: number;
  from: string;
  to: string;
  value?: { ether?: number };
  type: any;
};

export interface FindWideProps {
  searchRef?: React.Ref<HTMLFormElement>;
}

export type MainInfoProps = {
  name: string;
  value: any;
};

export type CustomTooltipProps = {
  payload?: any;
  label?: string;
  active?: boolean;
};

export type BlocksContentProps = {
  data: ResultHomePageData;
};

export type ViewMoreBtnProps = {
  nameBtn: string;
  onclick: any;
};
