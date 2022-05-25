import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import removeArrayDuplicates from 'utils/helpers';

const useSortData = (getData: any) => {
  const [renderData, setRenderData] = React.useState<AccountsData>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sortTerm, setSortTerm] = React.useState<string>('balance');
  const { ref, inView } = useInView();

  const loadingMock = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const next = '';
    getData(sortTerm, next).then((res: AccountsData) => {
      setRenderData(res);
    });
  }, []);

  useEffect(() => {
    const next = '';
    getData(sortTerm, next).then((res: AccountsData) => {
      setRenderData(res);
    });
  }, [sortTerm]);

  useEffect(() => {
    if (inView) {
      const next: string = renderData?.pagination.next;
      if (next) {
        loadingMock();
        getData(sortTerm, next).then((res: AccountsData) => {
          setRenderData((prev: AccountsData) => {
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

  return { ref, sortTerm, setSortTerm, renderData, loading };
};

export default useSortData;
