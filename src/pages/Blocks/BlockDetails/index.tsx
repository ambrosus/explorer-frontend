import { Content } from '../../../components/Content';
import Loader from '../../../components/Loader';
import useSortData from '../../../hooks/useSortData';
import {
  getBlockData,
  getBlockTransactionsData,
} from '../../../services/block.service';
import { TParams } from '../../../types';
import DataTitle from '../components/DataTitle';
import BlockBody from './components/BlockBody';
import BlockHeader from './components/BlockHeader';
import BlockHeaderInfo from './components/BlockHeaderInfo';
import HeadingInfo from './components/HeadingInfo';
import { MainInfoBlockTable } from './components/MainInfoBlockTable';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const BlockDetails = () => {
  const { address }: TParams = useParams();
  const [block, setBlock] = useState<any>(null);
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery(
    [`get data for ${address}`, address],
    () => getBlockData(address as string),
  );

  const { ref, renderData, loading } = useSortData(
    getBlockTransactionsData,
    address,
  );

  useEffect(() => {
    if (!isLoading) setBlock(data?.data);
  }, [isLoading]);

  if (isError) navigate(`/notfound`);

  return (
    <Content>
      <Content.Header>
        <HeadingInfo address={address} block={block} />
        <BlockHeaderInfo block={block} />
        <MainInfoBlockTable block={block} />
      </Content.Header>
      <Content.Body>
        <div className="blocks_main">
          <DataTitle title="Transactions" />
          <div className="blocks_main_table">
            <BlockHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) =>
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext ? (
                    <BlockBody lastCardRef={ref} key={index} item={item} />
                  ) : (
                    <BlockBody key={index} item={item} />
                  ),
                )
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
