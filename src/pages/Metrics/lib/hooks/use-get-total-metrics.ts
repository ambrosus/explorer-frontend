import { getTotalMetrics } from '../../services/metrics.service';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalMetrics = () => {
  return useQuery({
    queryKey: ['getOnChainTotalMetrics'],
    queryFn: () => getTotalMetrics(),
    select: ({ data }) => {
      return data;
    },
  });
};
