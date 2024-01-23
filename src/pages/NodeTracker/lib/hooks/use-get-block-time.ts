import { useState, useEffect } from 'react';

const useGetBlockTime = () => {
  const [avgBlockTime, setAvgBlockTime] = useState(0);

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/info/`)
        .then((response) => response.json())
        .then((data) => setAvgBlockTime(data.avgBlockTime));
    } catch (e) {
      console.error('Error while getInfoAvgBlockTime: ', e);
    }
  }, []);

  return avgBlockTime;
};

export default useGetBlockTime;
