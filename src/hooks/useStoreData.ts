import { TParams } from '../types';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useAdressData = (firstData: any) => {
  const { type = '' }: TParams = useParams();

  const [renderData, setRenderData] = React.useState<AccountsData | null>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { ref, inView } = useInView();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const firstRender = () => {
    setLoading(true);

    if (firstData?.meta?.message?.includes('No results')) {
      setLoading(false);
      setRenderData(null);
      return;
    }
    setRenderData(firstData || null);
    setLoading(false);
  };

  useEffect(() => {
    firstRender();
  }, [firstData]);

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
            data: removeArrayDuplicates([...prev.data, ...renderData?.data]),
            pagination: renderData?.pagination,
          };
        });
      }
    }
  }, [inView]);

  useEffect(concatData, [inView]);

  return { ref, renderData, loading };
};

export default useAdressData;
