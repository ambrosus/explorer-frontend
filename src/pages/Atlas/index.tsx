import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import removeArrayDuplicates from 'utils/helpers';
import Loader from 'components/Loader';

export const Atlas = () => {
  const [sortTerm, setSortTerm] = React.useState<string>('address');
  const [pagination, setPagination] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  const getDataFromApi = async (sort: string) => {
    if (
      Object.keys(pagination).length === 0 &&
      !pagination?.hasNext &&
      !data.length
    ) {
      const esc = encodeURIComponent;
      const url = 'https://explorer-api.ambrosus.io/atlases?';
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
      const url = 'https://explorer-api.ambrosus.io/atlases?';
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
          console.log(data);
          setTableData(data);
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

  return (
    <Content>
      <Content.Header>
        <MainInfoAtlas />
      </Content.Header>
      <Content.Body>
        <div className="atlas_main">
          <AtlasBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />

          <div className="atlas_main_table">
            <AtlasBlocksHeader />
            {loading ? (
              <Loader />
            ) : (
              tableData.map((item: any, index: number) => (
                <AtlasBlocksBody key={index} index={index + 1} item={item} />
              ))
            )}
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
