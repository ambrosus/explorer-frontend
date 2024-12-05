import {
  EndpointProp,
  getChartEndpoints,
} from '../../../services/chart.service';
import { transformData, transformDataTVL } from '../../../utils';
import { useQuery } from '@tanstack/react-query';

const useGetChartRange = (endPoint: EndpointProp, dateRange: string) => {
  return useQuery({
    queryKey: ['chart-range-nodes', endPoint, dateRange],
    queryFn: () => getChartEndpoints(endPoint, dateRange),
    select: (data: any) =>
      endPoint === 'tvlApollo' ||
      endPoint === 'tvlStaking' ||
      endPoint === 'totalStakeHarborCombined'
        ? transformDataTVL(data)
        : transformData(data),
  });
};

export default useGetChartRange;
