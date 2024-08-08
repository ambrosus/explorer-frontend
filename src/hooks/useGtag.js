import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

let isFirstRender = true;

const useGtag = () => {
  const { account } = useWeb3React();

  useEffect(() => {
    if (isFirstRender && account) {
      window.dataLayer.push({ 'event': 'ga4event', 'event_category': 'connect_wallet' });
      isFirstRender = false;
    }
  }, [account]);
};

export default useGtag;
