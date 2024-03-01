import { IApolloInfo, INode } from '../../types';

export type DataValues = {
  nodes: INode[];
  bestBlock: number;
  lastBlock: number;
  avgBlockTime: number;
  apolloInfo: IApolloInfo;
  bestStats: {
    [key: string]: any;
  };
  latency: number;
};
