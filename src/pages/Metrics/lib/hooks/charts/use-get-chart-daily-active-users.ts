import { getChartEndpoints } from '../../../services/chart.service';
import { transformData } from '../../../utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useGetChartDailyActiveUsers = (): UseQueryResult<number[][], Error> => {
  return useQuery({
    queryKey: ['chart-daily-active-users'],
    queryFn: () => getChartEndpoints('activeAddresses'),
    select: transformData,
  });
};

export default useGetChartDailyActiveUsers;
