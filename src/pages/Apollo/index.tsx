import API from '../../API/api';
import { AccountsData } from './11addresses.interface';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import { Content } from 'components/Content';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getAccountsData } from 'services/accounts.service';
import removeArrayDuplicates from 'utils/helpers';

export const Apollo = () => {
  const [apollos, setApollos] = React.useState<AccountsData>([]);
  const [sortTerm, setSortTerm] = React.useState<string>('balance');
  const [chartData, setChartData] = useState([]);
  const [apollosStats, setApollosStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    connecting: 0,
  });
  const getApollosNetworkInfo = async (apollosArr: any) => {
    let { total, online, offline, connecting } = apollosStats;
    for await (const apollo of apollosArr) {
      apollo.state !== 'RETIRED' && total++;
      apollo.status === 'ONLINE' && online++;
      apollo.status === 'OFFLINE' && apollo.state !== 'RETIRED' && offline++;
      apollo.status === 'CONNECTING' && connecting++;
    }
    setApollosStats({ total, online, offline, connecting });
  };

  const getRecursionData: any = async () => {
    const { data: data }: any = await API.getApollos({
      limit: 55,
      page: '',
    });
    const { data: data1 }: any = await API.getApollos({
      limit: 55,
      page: 'WzcyMzE3LHsiJG9pZCI6IjYxZmNmMDVhNTIzMTYyYjhiOGJkZmQyNyJ9XQ',
    });
    const { data: data2 }: any = await API.getApollos({
      limit: 55,
      page: 'WzMwNTgxLHsiJG9pZCI6IjYyMDAwOGU2NTIzMTYyYjhiOGM1OWY3YiJ9XQ',
    });
    const { data: data3 }: any = await API.getApollos({
      limit: 55,
      page: 'WzE1NDE3LHsiJG9pZCI6IjYyMDA2NDQyNTIzMTYyYjhiOGE1MGEyOSJ9XQ',
    });
    const { data: data4 }: any = await API.getApollos({
      limit: 55,
      page: 'WzcyMzE4LHsiJG9pZCI6IjYxZmNmMDVhNTIzMTYyYjhiOGJkZmQyNyJ9XQ',
    });

    return [...data, ...data1, ...data2, ...data3, ...data4];
  };
  // @ts-ignore
  useEffect(async () => {
    const allDataApollo = await getRecursionData();
    const last30Days: any = [];
    const today = new Date();
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30,
    );
    for (let i = 0; i < 30; i++) {
      const date = new Date(
        lastDay.getFullYear(),
        lastDay.getMonth(),
        lastDay.getDate() + i,
      );
      const dateInFormat = moment(date).format('MMM Do ');
      const transactionsCountPerDay = allDataApollo
        .map((a: any) => a.statusHistory)
        .flat();

      console.log('transactionsCountPerDay', transactionsCountPerDay);
      const map: any = new Map(
        transactionsCountPerDay.map((item: any) => [item.timestamp, item]),
      ).values();
      const sorted = [...map];
      console.log('sorted', sorted);
      await getApollosNetworkInfo(sorted);

      const aDayApollos: any = sorted.filter(
        (transaction: any) =>
          moment(transaction.timestamp * 1000).format('MMM Do ') ===
          dateInFormat,
      ).length;
      last30Days.push({ date: dateInFormat, count: aDayApollos });
    }
    setChartData(last30Days);
  }, []);
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
        <MainInfoApollo apollosStats={apollosStats} chartData={chartData} />
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
