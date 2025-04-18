import { IApolloInfo } from '../types';
import { HttpClient } from './client';

export const getInfo = () =>
  HttpClient.get<{
    data: {
      apollos: IApolloInfo;
    };
  }>('info');
