import { Content } from '../../../components/Content';
import Loader from '../../../components/Loader';
import useSortData from '../../../hooks/useSortData';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
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

export interface IBlock {
  miner: string;
  number: number;
  blockRewards: any[];
  totalTransactions: number;
  size: number;
  timestamp: number;
  parentHash: string;
  hash: string;
  stateRoot: string;
  extraData: string;
}

interface IBlocksData<T> {
  data: { data: T[] | undefined } | null;
  isError: boolean;
  isLoading: boolean;
}

export const BlockDetails = () => {
  const { address }: TParams = useParams();
  const [block, setBlock] = useState<IBlock[] | null | undefined>(null);
  const navigate = useNavigate();
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { lastBlock } = appData?.netInfo ?? {
    lastBlock: {
      number: 0,
    },
  };

  const { data, isError, isLoading } = useQuery(
    [`get data for ${address}`, address],
    () => getBlockData(address as string),
    {
      onSuccess: (data: any) => {
        console.log(data);
        if (!data) {
          navigate(`/notfound`);
        }
      },
    },
  ) as IBlocksData<IBlock>;

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
        <HeadingInfo block={block} />
        {lastBlock.number !== 0 && (
          <BlockHeaderInfo lastBlock={lastBlock} block={block} />
        )}
        <MainInfoBlockTable block={block} />
      </Content.Header>

      <Content.Body>
        <div className="blocks_main">
          <DataTitle title="Transactions" />
          <div className="blocks_main_table">
            <BlockHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) => (
                  <BlockBody
                    lastCardRef={
                      renderData?.data?.length - 1 === index &&
                      renderData?.pagination?.hasNext
                        ? ref
                        : undefined
                    }
                    key={index}
                    item={item}
                  />
                ))
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
