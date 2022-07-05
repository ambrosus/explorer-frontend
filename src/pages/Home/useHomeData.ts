import { LatestTransactionsProps, ResultHomePageData } from './home.interfaces';
import API from 'API/api';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useEffect, useState } from 'react';

//TODO зачем выносить в отдельный файл
const useHomeData = () => {
  const [data, setData] = useState<ResultHomePageData>();

  const getHomePageData: () => Promise<ResultHomePageData> = async () => {
    const result: ResultHomePageData = {
      latestBlocks: (await API.getBlocks({ limit: 8 })).data,
      latestTransactions: (await API.getTransactions({ limit: 3000 })).data
        .filter((item: LatestTransactionsProps) => item.type !== 'BlockReward')
        .slice(0, 8),
    };

    return result;
  };
  useEffect(() => {
    getHomePageData().then((result: ResultHomePageData) => setData(result));
  }, [data]);

  return data;
};

export default useHomeData;
