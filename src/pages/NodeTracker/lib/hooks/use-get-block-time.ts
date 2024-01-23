import { useState, useEffect } from 'react';

const useGetBlockTime = () => {
  const [avgBlockTime, setAvgBlockTime] = useState(0);

  useEffect(() => {
    try {
      fetch('https://explorer-api.ambrosus.io/info/')
        .then((response) => response.json())
        .then((data) => setAvgBlockTime(data.avgBlockTime));
    } catch (e) {
      console.error('Error while getInfoAvgBlockTime: ', e);
    }
  }, []);

  return avgBlockTime;
};

export default useGetBlockTime;
