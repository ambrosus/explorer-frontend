// import { Range } from 'react-date-range';
import { getTotalMetrics } from '../../services/metrics.service';
import { useQuery } from '@tanstack/react-query';

// import {
//   parseRangeToString,
//   transformGeneralData,
//   transformStakingData,
//   transformBridgeData,
//   getYesterdayDate,
// } from '@/utils';

export const useGetTotalMetrics = () => {
  return useQuery({
    queryKey: ['getOnChainTotalMetrics'],
    queryFn: () => getTotalMetrics(),
    select: ({ data }) => {
      return data;
    },
  });
};
