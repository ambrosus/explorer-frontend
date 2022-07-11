import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useAsyncStoreData = (funcAction: any) => {
  const { ref, inView } = useInView();
  const { address } = useParams();

  const [renderData, setRenderData] = useState<any>();

  const [loading, setLoading] = useState(true);

  const firstRender = () => {
    funcAction(address, null).then(
      (res: any) => setRenderData(res),
      setLoading(false),
    );

    // funcAction(null).then((res: any) => setRenderData(res), setLoading(false));
  };

  useEffect(() => {
    firstRender();
  }, []);

  useEffect(() => {
    const { hasNext } = renderData?.pagination || false;
    const { next } = renderData?.pagination || {};

    if (hasNext && !!renderData) {
      setLoading(true);
      if (address) {
        funcAction(address, next).then((res: any) => {
          setRenderData((prev: any) => {
            return {
              data: removeArrayDuplicates([...prev.data, ...res?.data]),
              pagination: res?.pagination,
            };
          });
        });
      }
      funcAction(next).then((res: any) => {
        setRenderData((prev: any) => {
          return {
            data: removeArrayDuplicates([...prev.data, ...res?.data]),
            pagination: res?.pagination,
          };
        });
      });
      setLoading(false);
    }
  }, [inView]);

  console.log(inView);

  return { ref, renderData, loading };
};

export default useAsyncStoreData;
