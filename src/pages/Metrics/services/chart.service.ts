import HttpClient from './client';
import { ChartsEndpoints } from './endpoints';
import { DataObject } from './types';

export type EndpointProp = keyof typeof ChartsEndpoints;

export const getChartEndpoints = (
  endPoint: EndpointProp,
  dateRange?: string,
) => {
  const url = dateRange
    ? `${ChartsEndpoints[endPoint]}/${dateRange}`
    : `${ChartsEndpoints[endPoint]}`;

  return HttpClient.get<{
    status: string;
    data: DataObject[];
  }>(url);
};
