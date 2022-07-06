import { TParams } from '../types';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useAdressData = (firstData: any, meta: any[]) => {
  const { type = '' }: TParams = useParams();

  const [renderData, setRenderData] = React.useState<AccountsData | null>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { ref, inView } = useInView();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const firstRender = () => {
    setLoading(true);
    const isReal = (message: any) => message.includes('No results');

    if (meta) {
      setLoading(false);
      setRenderData(null);
      return;
    }
    setRenderData(firstData);
    setLoading(false);
  };

  useEffect(() => {
    if (
      type?.length &&
      !(
        type === '' ||
        type === 'transfers' ||
        type === 'block_rewards' ||
        type === 'sheltering' ||
        type === 'assets' ||
        type === 'events'
      )
    ) {
      log('not found term "', type, '"');
      navigate(`/notfound`, { replace: true });
    }
    firstRender();
  }, [pathname]);

  const concatData = useCallback(() => {
    if (inView) {
      setLoading(true);
      const next: string = renderData?.pagination?.next;
      if (next) {
        if (firstData?.meta?.message?.includes('No results')) {
          setLoading(false);
          setRenderData(null);
          return;
        }
        setRenderData((prev: AccountsData) => {
          setLoading(false);
          return {
            ...prev,
            data: removeArrayDuplicates([...prev.data, ...firstData?.data]),
            pagination: firstData.pagination,
          };
        });
      }
    }
  }, [inView]);

  useEffect(concatData, [inView]);

  return { ref, renderData, loading };
};

export default useAdressData;
