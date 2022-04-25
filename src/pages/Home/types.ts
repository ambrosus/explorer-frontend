import React from 'react';

export type ResultHomePageData = {
	header?: any;
	latestBlocks: LatestBlocksProps[];
	latestTransactions: LatestTransactionsProps[];
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
}

export type LatestTransactionsProps = {
	_id?: React.Key | null | undefined;
	status: string;
	hash: any;
	amount?: number;
	timestamp: number;
	from: string;
	to: string;
	value?: { ether?: number; };
	type: any;
}
