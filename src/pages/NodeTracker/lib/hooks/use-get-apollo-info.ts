import { getInfo } from '../../services/info.service';
import { IApolloInfo } from '../../types';
import { useState, useEffect } from 'react';

const useGetApolloInfo = () => {
  const [apolloInfo, setApolloInfo] = useState<IApolloInfo>({
    connecting: 0,
    offline: 0,
    online: 0,
    total: 0,
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await getInfo();
        if (response?.data && response?.data?.apollos) {
          setApolloInfo(response.data.apollos);
        }
      } catch (e) {
        console.error('Error while getInfo: ', e);
      }
    })();
  }, []);

  return { apolloInfo };
};

export default useGetApolloInfo;
