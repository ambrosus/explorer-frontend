import Loader from '../../components/Loader';
import removeArrayDuplicates from '../../utils/helpers';
import { IApolloInfo } from './apolloBlocks.interface';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import { getApollosNetworkInfo } from './utils';
import { Content } from 'components/Content';
import React, { useEffect, useState } from 'react';

export const Apollo = () => {
  const [sortTerm, setSortTerm] = React.useState<string>('address');
  const [pagination, setPagination] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [apollosStatus, setApollosStatus] = useState<IApolloInfo>({
    total: 0,
    online: 0,
    offline: 0,
    connecting: 0,
  });
  const [loading, setLoading] = useState<any>(false);

  const getDataFromApi = async (sort: string) => {
    if (
      Object.keys(pagination).length === 0 &&
      !pagination?.hasNext &&
      !data.length
    ) {
      const esc = encodeURIComponent;
      const url = 'https://explorer-api.ambrosus.io/apollos?';
      let params: any = { limit: 50, sort };

      const query = Object.keys(params)
        .map((k) => `${esc(k)}=${esc(params[k])}`)
        .join('&');
      await fetch(url + query)
        .then((res) => res.json())
        .then((data) => {
          setPagination(data.pagination);
          setData(data.data);
        });
      return data;
    } else if (pagination?.hasNext === true && data.length > 0) {
      const esc = encodeURIComponent;
      const url = 'https://explorer-api.ambrosus.io/apollos?';
      let params: any = { next: pagination.next, limit: 50, sort };

      const query = Object.keys(params)
        .map((k) => `${esc(k)}=${esc(params[k])}`)
        .join('&');
      await fetch(url + query)
        .then((res) => res.json())
        .then((data) => {
          setPagination(data.pagination);
          setData((prec: any) => [...prec, ...data.data]);
        });
      return data;
    } else {
      const removeDuplicates = removeArrayDuplicates(data);
      return removeDuplicates;
    }
  };

  useEffect(() => {
    setLoading(true);
    (async function () {
      await getDataFromApi(sortTerm).then((data) => {
        if (data && !pagination?.hasNext && pagination?.hasPrevious) {
          setTableData(data);
          const info = getApollosNetworkInfo(data);
          setApollosStatus(info);
          setData(data);
          setLoading(false);
        }
      });
    })();
  }, [pagination]);

  useEffect(() => {
    if (sortTerm) {
      setTableData([]);
      setData([]);
      setPagination({});
    }
  }, [sortTerm]);
  const num = 6;

  return (
    <Content>
      <Content.Header>
        <MainInfoApollo info={apollosStatus} data={tableData} />
      </Content.Header>
      <Content.Body>
        <div className="apollo_main">
          <ApolloBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />

          <div
            className="apollo_main_table"
            style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
          >
            <ApolloBlocksHeader />
            {loading ? (
              <Loader />
            ) : (
              tableData.map((item: any, index: number) => (
                <ApolloBlocksBody key={index} index={index + 1} item={item} />
              ))
            )}
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
