import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import removeArrayDuplicates from 'utils/helpers';

const useSortData = (getData: any) => {
  const [accounts, setAccounts] = React.useState<AccountsData>([]);
  const [sortTerm, setSortTerm] = React.useState<string>('balance');
  const { ref, inView } = useInView();

  useEffect(() => {
    const next = '';
    getData(sortTerm, next).then((res: AccountsData) => {
      setAccounts(res);
    });
  }, []);

  useEffect(() => {
    const next = '';
    getData(sortTerm, next).then((res: AccountsData) => {
      setAccounts(res);
    });
  }, [sortTerm]);

  useEffect(() => {
    if (inView) {
      const next: string = accounts?.pagination.next;
      if (next) {
        getData(sortTerm, next).then((res: AccountsData) => {
          setAccounts((prev: AccountsData) => {
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

  return { ref, sortTerm, setSortTerm, accounts };
};

export default useSortData;
