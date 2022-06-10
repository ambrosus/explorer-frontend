import { LatestTransactionsProps, ResultHomePageData } from './home.interfaces';
import API from 'API/api';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useEffect, useState } from 'react';

//TODO зачем выносить в отдельный файл
const useHomeData = () => {
  const [data, setData] = useState<ResultHomePageData>();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const getHomePageData: () => Promise<ResultHomePageData> = async () => {
    const result: ResultHomePageData = {
      header: [],
      latestBlocks: (await API.getBlocks({ limit: 8 })).data,
      latestTransactions: (await API.getTransactions({ limit: 3000 })).data
        .filter((item: LatestTransactionsProps) => item.type !== 'BlockReward')
        .slice(0, 8),
    };

    //TODO ?
    result.header = (await appData) && [
      { name: 'AMB PRICE', value: appData.tokenInfo.price_usd },
      { name: 'TOTAL SUPPLY', value: appData.netInfo.totalSupply },
      {
        name: 'TOTAL TRANSACTIONS',
        value: appData.netInfo.transactions.total,
      },
      { name: 'MARKET CAP', value: appData.tokenInfo.market_cap_usd },

      {
        name: 'NODES',
        value:
          appData.netInfo.apollos.online +
          appData.netInfo.atlases.total +
          appData.netInfo.hermeses.total,
      },
      { name: 'HOLDERS', value: appData.netInfo.accounts.withBalance },
    ];
    return result;
  };
  useEffect(() => {
    getHomePageData().then((result: ResultHomePageData) => setData(result));
  }, [data]);

  return data;
};

export default useHomeData;
