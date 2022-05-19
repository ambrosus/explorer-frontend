import { AccountsData } from './addresses.interface';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import TableBlocksBody from 'components/TableBlocks/TableBlocksBody';
import TableBlocksHeader from 'components/TableBlocks/TableBlocksHeader';
import TableBlocksSort from 'components/TableBlocks/TableBlocksSort';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getAccountsData } from 'services/accounts.service';
import { getApolloData } from 'services/apollo.service';
import removeArrayDuplicates from 'utils/helpers';

export const Apollo = () => {
  const [apollos, setApollos] = React.useState<AccountsData>([]);
  const [sortTerm, setSortTerm] = React.useState<string>('balance');
  const { ref, inView } = useInView();
  // const { loading } = useTypedSelector((state) => state.app);

  useEffect(() => {
    const next = '';
    getAccountsData(sortTerm, next).then((res: AccountsData) => {
      setApollos(res);
    });
  }, []);

  useEffect(() => {
    const next = '';
    getAccountsData(sortTerm, next).then((res: AccountsData) => {
      setApollos(res);
    });
  }, [sortTerm]);

  useEffect(() => {
    if (inView) {
      const next: string = apollos?.pagination.next;
      if (next) {
        getAccountsData(sortTerm, next).then((res: AccountsData) => {
          setApollos((prev: AccountsData) => {
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

  const num = 6;

  return (
    <Content>
      <Content.Header>
        <h1>Apollo</h1>
      </Content.Header>
      <Content.Body>
        <div
          className="blocks"
          style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
        >
          <TableBlocksHeader />
          <TableBlocksBody />
          <TableBlocksBody />
          <TableBlocksBody />
          <TableBlocksBody />
          <TableBlocksBody />
          <TableBlocksBody />
          <TableBlocksBody />
        </div>
      </Content.Body>
    </Content>
  );
};
