import { AccountsData } from './11addresses.interface';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
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
        <MainInfoApollo />
      </Content.Header>
      <Content.Body>
        <div className="apollo_main">
          <ApolloBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />

          <div
            className="apollo_main_table"
            style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
          >
            <ApolloBlocksHeader />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
