import { TParams } from '../types';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useParams } from 'react-router-dom';
import removeArrayDuplicates from 'utils/helpers';

const usePaginationData = (getData: any) => {
  const { address }: TParams = useParams();

  const [renderData, setRenderData] = useState<AccountsData | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { ref, inView } = useInView();

  const { pathname } = useLocation();

  const firstRender = () => {
    setLoading(true);

    getData(address).then((res: AccountsData) => {
      if (res?.meta?.message?.includes('No results')) {
        setLoading(false);
        setRenderData(null);
        return;
      }
      setRenderData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    firstRender();
  }, [pathname]);

  const concatData = useCallback(() => {
    if (inView) {
      setLoading(true);
      const next: string = renderData?.pagination?.next;
      if (next) {
        getData(address).then((res: AccountsData) => {
          if (res?.meta?.message?.includes('No results')) {
            setLoading(false);
            setRenderData(null);
            return;
          }
          setRenderData((prev: AccountsData) => {
            setLoading(false);
            return {
              ...prev,
              data: removeArrayDuplicates([...prev.data, ...res?.data]),
              pagination: res.pagination,
            };
          });
        });
      }
    }
  }, [inView]);

  useEffect(concatData, [inView]);

  return { ref, renderData, loading };
};

export default usePaginationData;
