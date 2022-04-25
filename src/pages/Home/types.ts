import React from 'react';

export type ResultHomePageData = {
	header?: any;
	latestBlocks: LatestBlocksProps[];
	latestTransactions: LatestTransactionsProps[];
}
type LatestBlocksProps= {
	number: React.Key | null | undefined;
	timestamp: number;
	miner: string;
	totalTransactions: number;
	blockRewards: number;
}
export type LatestTransactionsProps= {
	_id: React.Key | null | undefined;
	status: string;
	hash: any;
	timestamp: number;
	from: string;
	to: string;
	value: { ether: number; };
	type: any;
}
