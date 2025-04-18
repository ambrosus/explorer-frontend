import HttpClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const getTotalMetrics = () =>
  HttpClient.get<{
    status: string;
    data: any;
  }>(API_ENDPOINTS.TOTAL_METRICS);
