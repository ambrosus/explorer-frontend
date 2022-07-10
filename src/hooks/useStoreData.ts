import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useStoreData = (firstData: any, funcAction: any, loading: boolean) => {
  const { ref, inView } = useInView();

  const [renderData, setRenderData] = useState<any>();

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    funcAction();
  }, []);

  useEffect(() => {
    if (!loading) {
      setIsLoad(true);
    }
  }, [loading]);

  useEffect(() => {
    if (!!firstData) {
      setRenderData(firstData);
    }
  }, [isLoad]);

  useEffect(() => {
    const { hasNext } = firstData?.pagination || true;
    const { next } = firstData?.pagination || {};

    if (hasNext && !!renderData) {
      funcAction('', { limit: 20, next: next });

      setRenderData((prev: any) => {
        return {
          data: removeArrayDuplicates([...prev.data, ...firstData?.data]),
          pagination: firstData?.pagination,
        };
      });
    }
  }, [inView, firstData]);

  return { ref, renderData };
};

export default useStoreData;
