import { TParams } from '../types';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useSortData = (
  getData: any,
  address?: string | null,
  firstSortTerm: any = '',
) => {
  const { address: adr, type = '' }: TParams = useParams();

  const [renderData, setRenderData] = React.useState<AccountsData>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sortTerm, setSortTerm] = React.useState<string>(firstSortTerm);
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const firstRender = () => {
    setLoading(true);
    getData(sortTerm, null, address).then((res: AccountsData) => {
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
        type === 'block_rewards' ||
        type === 'transfers' ||
        type === 'sheltering'
      )
    ) {
      log('not found term "', type, '"');
      navigate(`/notfound`, { replace: true });
    }
    firstRender();
  }, []);

  const updateData = useCallback(() => {
    if (sortTerm) {
      setLoading(true);
      getData(sortTerm, null, address).then((res: AccountsData) => {
        if (res?.meta?.message?.includes('No results')) {
          setLoading(false);
          setRenderData(null);
          return;
        }
        setRenderData(res);
        setLoading(false);
      });
    }
  }, [sortTerm]);

  useEffect(updateData, [sortTerm]);

  const concatData = useCallback(() => {
    if (inView) {
      setLoading(true);
      const next: string = renderData?.pagination?.next;
      if (next) {
        getData(sortTerm, next, address).then((res: AccountsData) => {
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

  return { ref, sortTerm, setSortTerm, renderData, loading };
};

export default useSortData;
