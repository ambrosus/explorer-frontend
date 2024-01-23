import { IApolloNode } from '../types';
import { HttpClient } from './client';

export const getApollos = (params: any) =>
  HttpClient.get<{
    data: IApolloNode[];
  }>('apollos', { params });
