import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import removeArrayDuplicates, { log } from 'utils/helpers';

const useAsyncStoreData = (funcAction: any) => {
  const { ref, inView } = useInView();
  const { address } = useParams();

  const [renderData, setRenderData] = useState<any>();

  const [loading, setLoading] = useState(true);

  const firstRender = () => {
    funcAction(address).then(
      (res: any) => setRenderData(res),
      setLoading(false),
    );
  };

  useEffect(() => {
    firstRender();
  }, []);

  useEffect(() => {
    const { next } = renderData?.pagination || {};
    const { hasNext } = renderData?.pagination || false;

    if (hasNext && !!renderData) {
      setLoading(true);
      if (address) {
        funcAction(address, { limit: 20, next: next }).then((res: any) => {
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

  return { ref, renderData, loading };
};

export default useAsyncStoreData;
