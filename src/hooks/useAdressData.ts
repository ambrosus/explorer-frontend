import { TParams } from '../types';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useAdressData = (getData: any) => {
  const { address, type = '' }: TParams = useParams();

  const [renderData, setRenderData] = React.useState<AccountsData | null>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { ref, inView } = useInView();

  const navigate = useNavigate();

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
      navigate(`/notfound`, );
    }
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

export default useAdressData;
