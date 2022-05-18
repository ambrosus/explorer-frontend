import React from 'react';

export interface IRoute {
  path: string;
  key: string;
  exact: boolean;
  component: React.FC;
  isClick: boolean;
}

export type TParams = {
  address?: string;
  type?: string;
  filtered?: string;
  tokenToSorted?: string;
};
