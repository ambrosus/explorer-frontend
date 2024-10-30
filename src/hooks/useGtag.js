import { useEffect } from 'react';
import { useAccount } from 'wagmi';

let isFirstRender = true;

const useGtag = () => {
  const { address } = useAccount();

  useEffect(() => {
    if (isFirstRender && address) {
      window.dataLayer.push({
        event: 'ga4event',
        event_category: 'connect_wallet',
      });
      isFirstRender = false;
    }
  }, [address]);
};

export default useGtag;
