import { getChartEndpoints } from '../../../services/chart.service';
import { transformData } from '../../../utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useGetChartMonthlyActiveUsers = (): UseQueryResult<number[][], Error> => {
  return useQuery({
    queryKey: ['chart-monthly-active-users'],
    queryFn: () => getChartEndpoints('monthlyActiveAddresses'),
    select: transformData,
  });
};

export default useGetChartMonthlyActiveUsers;
